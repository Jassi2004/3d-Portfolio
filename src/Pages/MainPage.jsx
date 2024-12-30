import { X, User, Mail, Phone, Linkedin, Github, Code, Target, Calendar, Award, GraduationCap, School, CheckCircle2, MapPin, Building2, Briefcase, Code2, Layers, Database, Wrench, Cloud, Star, ExternalLink, Package, Rocket, Crown, Trophy, Medal } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { resumeData } from '../resumeInfo';
import { useEffect, useRef } from 'react';

function MainPage() {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const overlayRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef(null);
    const sectionsRef = useRef(null);
    const projectsRef = useRef(null);
    const accomplishmentsRef = useRef(null);



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

    const getIconAccomplishment = (index) => {
        const icons = [Trophy, Medal, Star, Crown, Award];
        const IconComponent = icons[index % icons.length];
        return <IconComponent className="h-6 w-6 achievement-icon" />;
    };



    const { personalInfo, objective, education } = resumeData;
    return (
        <>
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
                            {/* About Me Section */}
                            <div ref={headerRef} className="flex items-center gap-4 mb-8  top-0  z-10 py-4">
                                <User className="h-8 w-8 text-purple-500 float-icon" />
                                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                                    About Me
                                </h2>
                            </div>

                            <div ref={cardsRef} className="space-y-6">
                                <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                                    <div className="flex">
                                        <div className='w-3/4'>

                                            <div>

                                                <h3 className="text-2xl font-bold text-white mb-4">{personalInfo.name}</h3>
                                                <h4 className="text-xl text-purple-400 mb-6">{personalInfo.profileTitle}</h4>
                                            </div>
                                            {/* <div className="flex items-center gap-3 text-gray-300 col-span-1 md:col-span-2">
                                        <img
                                            src={personalInfo.photo}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full border-2 border-purple-400 object-cover"
                                        />
                                    </div> */}

                                            <div className="grid grid-cols-1 w-3/4 md:grid-cols-2 gap-4 mb-6">
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <Mail className="h-5 w-5 text-purple-400" />
                                                    <span>{personalInfo.email}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <Phone className="h-5 w-5 text-purple-400" />
                                                    <span>{personalInfo.phone}</span>
                                                </div>

                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <Linkedin className="h-5 w-5 text-purple-400" />
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

                                        <div className=' w-44 rounded-sm'>
                                            <img
                                                src='../../public/assets/photos/photo.jpeg'
                                                alt="Profile"
                                                className="w-full h-full rounded-sm border-2 border-purple-400 object-cover"
                                            />
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
                                <div className='h-10 w-full'></div>
                                {/* Education Section */}
                                <div ref={headerRef} className="flex items-center gap-4 mb-16  top-0  z-10 py-4">
                                    <GraduationCap className="h-8 w-8 text-blue-500 float-icon" />
                                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                                        Education
                                    </h2>
                                </div>

                                {education.map((edu, index) => (
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
                                <div className='h-10 w-full'></div>
                                {/* Experience Section */}
                                <div ref={headerRef} className="flex items-center gap-4 mb-8  top-0  z-10 py-8 mt-20">
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
                                <div className='h-10 w-full'></div>
                                {/* SKILL SECTIONS  */}

                                <div ref={headerRef} className="flex items-center gap-4 mb-8  top-0  z-10 py-4">
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
                                <div className='h-10 w-full'></div>
                                {/* PROJECT SECTIONS  */}
                                <div ref={headerRef} className="flex items-center gap-4 mb-8  top-0  z-10 py-4">
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
                                <div className='h-10 w-full'></div>
                                {/* ACCOMPLISHMENTS  */}
                                <div ref={headerRef} className="flex items-center gap-4 mb-8  top-0  z-10 py-4">
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
                                                    {getIconAccomplishment(index)}
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
        </>
    )
}
export default MainPage;
