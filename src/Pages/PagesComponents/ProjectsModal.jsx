import React, { useEffect, useRef } from 'react';
import { X, Github, Award, ExternalLink, Rocket, Package, Star } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { resumeData } from '../../resumeInfo';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsModal = () => {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const overlayRef = useRef(null);
    const headerRef = useRef(null);
    const projectsRef = useRef(null);

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: () => navigate('/')
        });

        tl.to(projectsRef.current.children, {
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

        gsap.set(projectsRef.current.children, {
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
            .to(projectsRef.current.children, {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 0.4
            });

        // Project cards scroll animations
        const projects = projectsRef.current.children;
        Array.from(projects).forEach((project) => {
            ScrollTrigger.create({
                trigger: project,
                start: "top center+=100",
                end: "bottom center-=100",
                toggleActions: "play reverse play reverse",
                onEnter: () => {
                    gsap.to(project, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power3.out"
                    });
                },
                onLeave: () => {
                    gsap.to(project, {
                        scale: 0.95,
                        opacity: 0.7,
                        duration: 0.5
                    });
                }
            });
        });

        // Technology tags floating animation
        gsap.to(".tech-tag", {
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

        // Rocket icon animation
        gsap.to(".rocket-icon", {
            y: -10,
            rotation: 5,
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });

        // Award icon spin animation
        gsap.to(".award-icon", {
            rotation: 360,
            duration: 8,
            ease: "none",
            repeat: -1
        });

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
                                <Rocket className="h-8 w-8 text-purple-500 rocket-icon" />
                                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                                    Featured Projects
                                </h2>
                            </div>

                            <div ref={projectsRef} className="space-y-8">
                                {resumeData.projects.map((project, index) => (
                                    <div
                                        key={index}
                                        className="group bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Package className="h-5 w-5 text-purple-400" />
                                                    <h3 className="text-2xl font-bold text-white">
                                                        {project.name}
                                                    </h3>
                                                </div>
                                                <p className="text-gray-300 text-lg">
                                                    {project.description}
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-gray-700/50 hover:bg-purple-500/30 transition-colors"
                                                >
                                                    <Github className="h-5 w-5 text-gray-300 hover:text-white" />
                                                </a>
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-gray-700/50 hover:bg-purple-500/30 transition-colors"
                                                >
                                                    <ExternalLink className="h-5 w-5 text-gray-300 hover:text-white" />
                                                </a>
                                            </div>
                                        </div>

                                        {project.achievements && (
                                            <div className="space-y-2 mb-6">
                                                {project.achievements.map((achievement, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-green-400">
                                                        <Award className="h-5 w-5 award-icon" />
                                                        <span className="text-green-300">{achievement}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="tech-tag px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600 hover:border-purple-500/50 transition-colors flex items-center gap-1"
                                                >
                                                    <Star className="h-3 w-3 text-purple-400" />
                                                    {tech}
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

export default ProjectsModal;