import React, { useEffect, useRef } from 'react';
import { X, Trophy, Medal, Star, Crown, Award } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { resumeData } from '../../resumeInfo';

export const AccomplishmentsModal = () => {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const overlayRef = useRef(null);
    const headerRef = useRef(null);
    const accomplishmentsRef = useRef(null);

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: () => navigate('/')
        });

        tl.to(accomplishmentsRef.current.children, {
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

    const getIcon = (index) => {
        const icons = [Trophy, Medal, Star, Crown, Award];
        const IconComponent = icons[index % icons.length];
        return <IconComponent className="h-6 w-6 achievement-icon" />;
    };

    useEffect(() => {
        const tl = gsap.timeline();

        // Initial setup
        gsap.set([contentRef.current, headerRef.current], {
            y: 100,
            opacity: 0,
            scale: 0.9
        });

        gsap.set(accomplishmentsRef.current.children, {
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
            .to(accomplishmentsRef.current.children, {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 0.4
            });

        // Floating animation for achievement cards
        const cards = document.querySelectorAll('.achievement-card');
        cards.forEach((card, index) => {
            gsap.to(card, {
                y: -5,
                duration: 2,
                delay: index * 0.2,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
        });

        // Shine effect animation
        gsap.to(".shine-effect", {
            x: "100%",
            duration: 1.5,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 3
        });

        // Icon rotation animation
        gsap.to(".achievement-icon", {
            rotation: 360,
            duration: "random(4, 6)",
            ease: "none",
            repeat: -1,
            stagger: {
                amount: 2,
                from: "random"
            }
        });

        // Trophy bounce animation
        gsap.to(".trophy-header", {
            y: -10,
            duration: 1.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });

        // Cleanup
        return () => {
            gsap.killTweensOf(".achievement-card");
            gsap.killTweensOf(".shine-effect");
            gsap.killTweensOf(".achievement-icon");
            gsap.killTweensOf(".trophy-header");
        };
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
                                <Trophy className="h-8 w-8 text-yellow-500 trophy-header" />
                                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-500">
                                    Accomplishments
                                </h2>
                            </div>

                            <div
                                ref={accomplishmentsRef}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {resumeData.accomplishments.map((accomplishment, index) => (
                                    <div
                                        key={index}
                                        className="achievement-card relative bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden group"
                                    >
                                        <div className="shine-effect absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent transform -translate-x-full" />

                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-400">
                                                {getIcon(index)}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg text-gray-200 group-hover:text-yellow-200 transition-colors">
                                                    {accomplishment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50">
                                <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                                    <Star className="h-5 w-5" />
                                    Core Strengths
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {resumeData.softSkills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-gray-300 p-3 rounded-lg bg-gray-700/30 border border-gray-600/50 hover:border-yellow-500/30 transition-colors"
                                        >
                                            <Crown className="h-4 w-4 text-yellow-500" />
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccomplishmentsModal;