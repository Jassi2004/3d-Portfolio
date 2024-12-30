import React, { useEffect, useRef } from 'react';
import { X, Code2, Layers, Database, Wrench, Cloud, Star } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { resumeData } from '../../resumeInfo';

export const SkillsModal = () => {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const overlayRef = useRef(null);
    const headerRef = useRef(null);
    const sectionsRef = useRef(null);

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: () => navigate('/')
        });

        tl.to(sectionsRef.current.children, {
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

        // Initial setup
        gsap.set([contentRef.current, headerRef.current], {
            y: 100,
            opacity: 0,
            scale: 0.9
        });

        gsap.set(sectionsRef.current.children, {
            y: 50,
            opacity: 0
        });

        // Entrance animations
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
            .to(sectionsRef.current.children, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.4
            });

        // Skill items floating animation
        gsap.to(".skill-item", {
            y: -5,
            duration: "random(1.5, 2.5)",
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            stagger: {
                amount: 1,
                from: "random"
            }
        });

        // Icon rotation animation
        gsap.to(".rotating-icon", {
            rotation: 360,
            duration: 8,
            ease: "none",
            repeat: -1
        });

        // Hover effect for skill categories
        const skillCards = document.querySelectorAll('.skill-category');
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.in"
                });
            });
        });
    }, []);

    const getIcon = (category) => {
        switch (category) {
            case 'programmingLanguages': return <Code2 />;
            case 'frontend': return <Layers />;
            case 'backend': return <Database />;
            case 'WrenchsAndFrameworks': return <Wrench />;
            case 'cloudTechnologies': return <Cloud />;
            default: return <Star />;
        }
    };

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
                                <Code2 className="h-8 w-8 text-blue-500 rotating-icon" />
                                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                                    Skills & Expertise
                                </h2>
                            </div>

                            <div ref={sectionsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(resumeData.skills).map(([category, skills], index) => (
                                    <div
                                        key={category}
                                        className="skill-category bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-blue-400 rotating-icon">
                                                {getIcon(category)}
                                            </div>
                                            <h3 className="text-xl font-semibold text-white capitalize">
                                                {category.replace(/([A-Z])/g, ' $1').trim()}
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {skills.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="skill-item px-4 py-2 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600 hover:border-blue-500/50 transition-colors"
                                                >
                                                    {skill}
                                                </span>
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