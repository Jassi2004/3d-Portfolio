import React, { useEffect, useRef } from 'react';
import { X, User, Mail, Phone, Linkedin, Github, Code, Target, LinkedinIcon } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { resumeData } from '../../resumeInfo';

export const AboutModal = () => {
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

        // Floating animation for icons
        gsap.to(".float-icon", {
            y: -5,
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
    }, []);

    const { personalInfo, objective } = resumeData;

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
                                <User className="h-8 w-8 text-purple-500 float-icon" />
                                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                                    About Me
                                </h2>
                            </div>

                            <div ref={cardsRef} className="space-y-6">
                                <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                                    <h3 className="text-2xl font-bold text-white mb-4">{personalInfo.name}</h3>
                                    <h4 className="text-xl text-purple-400 mb-6">{personalInfo.profileTitle}</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Mail className="h-5 w-5 text-purple-400" />
                                            <span>{personalInfo.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Phone className="h-5 w-5 text-purple-400" />
                                            <span>{personalInfo.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <LinkedinIcon className="h-5 w-5 text-purple-400" />
                                            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">LinkedIn Profile</a>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Github className="h-5 w-5 text-purple-400" />
                                            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">GitHub Profile</a>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Code className="h-5 w-5 text-purple-400" />
                                            <a href={personalInfo.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">LeetCode Profile</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Target className="h-6 w-6 text-purple-400" />
                                        <h3 className="text-xl font-bold text-white">Career Objective</h3>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{objective}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};