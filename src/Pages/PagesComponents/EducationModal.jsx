import React, { useEffect, useRef } from 'react';
import { X, GraduationCap, School, Calendar, Award } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { resumeData } from '../../resumeInfo';

export const EducationModal = () => {
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

        gsap.set(contentRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.9
        });
        gsap.set(headerRef.current, {
            y: -30,
            opacity: 0
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
            }, "-=0.2")
            .to(cardsRef.current.children, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.4
            }, "-=0.2");

        // Add subtle float animation to icons
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
                            <div ref={headerRef} className="flex items-center gap-4 mb-8 z-10 py-4">
                                <GraduationCap className="h-8 w-8 text-blue-500 float-icon" />
                                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                                    Education
                                </h2>
                            </div>

                            <div ref={cardsRef} className="space-y-6">
                                {resumeData.education.map((edu, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                                                <div className="flex items-center gap-2 text-blue-400 mt-1">
                                                    <School className="h-4 w-4" />
                                                    <span>{edu.university || edu.school}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                {edu.cgpa && (
                                                    <div className="flex items-center gap-2 text-green-400">
                                                        <Award className="h-4 w-4" />
                                                        <span>CGPA: {edu.cgpa}</span>
                                                    </div>
                                                )}
                                                {edu.score && (
                                                    <div className="flex items-center gap-2 text-green-400">
                                                        <Award className="h-4 w-4" />
                                                        <span>Score: {edu.score}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-400 mb-4">
                                            <Calendar className="h-4 w-4" />
                                            <span>{edu.startDate} - {edu.endDate}</span>
                                        </div>

                                        <p className="text-gray-300">{edu.description}</p>
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