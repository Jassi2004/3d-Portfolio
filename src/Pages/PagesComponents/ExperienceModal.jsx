import React, { useEffect, useRef } from 'react';
import { X, Briefcase, Building2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { resumeData } from '../../resumeInfo';

export const ExperienceModal = () => {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const overlayRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef(null);

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: () => navigate('/')
        });

        tl.to(cardsRef.current.children, {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.3
        })
            .to(headerRef.current, {
                y: -30,
                opacity: 0,
                duration: 0.3
            }, "-=0.2")
            .to(contentRef.current, {
                scale: 0.9,
                y: 50,
                opacity: 0,
                duration: 0.3
            }, "-=0.2")
            .to(overlayRef.current, {
                opacity: 0,
                duration: 0.3
            }, "-=0.2");
    };

    useEffect(() => {
        const tl = gsap.timeline();

        gsap.set([contentRef.current, headerRef.current], {
            y: 100,
            opacity: 0,
            scale: 0.9
        });

        gsap.set(cardsRef.current.children, {
            y: 50,
            opacity: 0
        });

        tl.to(overlayRef.current, {
            opacity: 1,
            duration: 0.3
        })
            .to(contentRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power3.out"
            })
            .to(headerRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.4
            })
            .to(cardsRef.current.children, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.4
            });

        // Timeline animation for responsibilities
        gsap.to(".responsibility-item", {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.5,
            scrollTrigger: {
                trigger: ".responsibility-list",
                start: "top center+=100",
                toggleActions: "play none none reverse"
            }
        });

        // Floating animation for icons
        gsap.to(".float-icon", {
            y: -5,
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
    }, []);

    return (
        <div className="min-h-screen w-full bg-[#CFFFFF] p-8 flex items-center justify-center">
            <div ref={modalRef} className="fixed inset-8 z-50 flex items-center justify-center">
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-3xl"
                    onClick={handleClose}
                />
                <div
                    ref={contentRef}
                    className="relative w-full h-full bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
                >
                    <button
                        onClick={handleClose}
                        className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-800/50 transition-colors group z-10"
                    >
                        <X className="h-6 w-6 text-gray-400 group-hover:text-white" />
                    </button>

                    <div className="h-full overflow-y-auto custom-scrollbar">
                        <div className="p-8">
                            <div ref={headerRef} className="flex items-center gap-4 mb-8  z-10 py-4">
                                <Briefcase className="h-8 w-8 text-green-500 float-icon" />
                                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">
                                    Experience
                                </h2>
                            </div>

                            <div ref={cardsRef} className="space-y-8">
                                {resumeData.experience.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-green-500/50 transition-colors"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                                <div className="flex items-center gap-2 text-green-400 mt-2">
                                                    <Building2 className="h-4 w-4" />
                                                    <span>{exp.company}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-start md:items-end gap-2">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{exp.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{exp.duration}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="responsibility-list space-y-3">
                                            {exp.responsibilities.map((responsibility, idx) => (
                                                <div
                                                    key={idx}
                                                    className="responsibility-item flex items-start gap-3 text-gray-300"
                                                    style={{ opacity: 0, transform: 'translateX(-20px)' }}
                                                >
                                                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                                                    <span>{responsibility}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};