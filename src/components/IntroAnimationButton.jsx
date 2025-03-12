import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { Play, RefreshCw, Power } from 'lucide-react';

const PremiumIntroButton = ({ setCurrentPerspective }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasBeenClicked, setHasBeenClicked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { setActiveCharacter, setIsTvOn, state, setState } = useAppContext();
    
    useEffect(() => {
        const hasPlayed = localStorage.getItem('introAnimationPlayed');
        if (hasPlayed === 'true') {
            setHasBeenClicked(true);
        }

        // Set a timeout to remove the introAnimationPlayed item after 5 minutes
        const timeoutId = setTimeout(() => {
            localStorage.removeItem('introAnimationPlayed');
            setHasBeenClicked(false);
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
        return () => clearTimeout(timeoutId);
    }, []);

    const setStateAndAnimation = (character, perspective) => {
        Promise.all([
            setActiveCharacter(character),
            setCurrentPerspective(perspective)
        ]);
    };

    const playIntroAnimation = async () => {
        if (isPlaying) return;

        setIsPlaying(true);
        setHasBeenClicked(true);
        localStorage.setItem('introAnimationPlayed', 'true');

        try {
            // Add screen flash effect
            const flashElement = document.createElement('div');
            flashElement.className = 'fixed inset-0 bg-white z-50 opacity-0';
            document.body.appendChild(flashElement);
            
            // Flash animation
            setTimeout(() => {
                flashElement.style.transition = 'opacity 150ms ease-in-out';
                flashElement.style.opacity = '0.7';
                
                setTimeout(() => {
                    flashElement.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(flashElement);
                    }, 300);
                }, 150);
            }, 100);
            
            // Animation sequence
            setStateAndAnimation("walking", "walkingPerspective");
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Add camera shake effect
            const gameContainer = document.querySelector('#game-container');
            if (gameContainer) {
                gameContainer.classList.add('camera-shake');
                setTimeout(() => {
                    gameContainer.classList.remove('camera-shake');
                }, 2200);
            }
            
            setStateAndAnimation("walking", "walkingPerspective");
            await new Promise(resolve => setTimeout(resolve, 2200));

            setStateAndAnimation("standToSit", "tvPerspective");
            await new Promise(resolve => setTimeout(resolve, 0));
            setStateAndAnimation("standToSit", "tvPerspective");
            await new Promise(resolve => setTimeout(resolve, 800));

            // Add a subtle zoom effect
            if (gameContainer) {
                gameContainer.classList.add('zoom-in-effect');
                setTimeout(() => {
                    gameContainer.classList.remove('zoom-in-effect');
                }, 1500);
            }
            
            setStateAndAnimation("relax", "tvPerspective");
            await new Promise(resolve => setTimeout(resolve, 1500));

            setStateAndAnimation("relax", "changeChannelPerspective");

            setTimeout(() => {
                // Add TV static effect
                const staticEffect = document.createElement('div');
                staticEffect.className = 'fixed inset-0 bg-tv-static z-40 opacity-70';
                document.body.appendChild(staticEffect);
                
                setTimeout(() => {
                    setIsTvOn();
                    if (!state.isDarkMode) {
                        setState(prev => ({
                            ...prev,
                            isDarkMode: true
                        }));
                    }
                    
                    // Fade out static
                    staticEffect.style.transition = 'opacity 1.2s ease-out';
                    staticEffect.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(staticEffect);
                    }, 1200);
                }, 800);
            }, 1000);

        } catch (error) {
            console.error('Animation sequence failed:', error);
        } finally {
            setIsPlaying(false);
        }
    };

    return (
        <div className={`
            fixed z-50 transition-all duration-500 ease-out
            ${hasBeenClicked
                ? 'top-6 right-6 transform-none'
                : 'inset-0 flex items-center justify-center'
            }
        `}>
            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Ambient glow effect */}
                {!hasBeenClicked && (
                    <div className={`
                        absolute -inset-6 
                        bg-gradient-radial from-cyan-500/20 to-transparent 
                        rounded-full blur-md
                        transition-opacity duration-300
                        ${isHovered ? 'opacity-100' : 'opacity-70'}
                    `} />
                )}
                
                {/* Button container with striking styling */}
                <div className={`
                    relative overflow-hidden
                    transition-all duration-300 ease-out
                    ${hasBeenClicked ? 'w-40 h-12 rounded-md' : 'w-72 h-72 rounded-full'}
                    bg-gradient-to-b from-zinc-900 via-zinc-800 to-black
                    border border-cyan-800/30
                    ${isHovered ? 'shadow-xl shadow-cyan-500/30' : 'shadow-lg shadow-cyan-600/10'}
                `}>
                    {/* Luminous outer ring */}
                    {!hasBeenClicked && (
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20" />
                    )}
                    
                    {/* Interior accent ring */}
                    {!hasBeenClicked && (
                        <div className="absolute inset-4 rounded-full border border-cyan-500/10" />
                    )}
                    
                    {/* Modern highlight effect */}
                    <div className={`
                        absolute inset-0 rounded-full
                        bg-gradient-to-b from-white/5 via-transparent to-transparent
                        h-1/2
                    `} />
                    
                    {/* Dynamic accent line */}
                    <div className={`
                        absolute top-0 left-0 right-0 h-0.5 
                        bg-gradient-to-r from-cyan-400/0 via-cyan-400/80 to-cyan-400/0
                        transition-all duration-500
                        ${isHovered ? 'opacity-100' : 'opacity-60'}
                    `} />
                    
                    {/* Button with refined interactions */}
                    <button
                        onClick={playIntroAnimation}
                        disabled={isPlaying}
                        className={`
                            absolute inset-0 flex items-center justify-center
                            focus:outline-none focus:ring-1 focus:ring-cyan-500/50
                            ${isPlaying ? 'cursor-not-allowed' : 'cursor-pointer'}
                            transition-all duration-300
                        `}
                    >
                        {hasBeenClicked ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-zinc-800">
                                    <RefreshCw className="w-4 h-4 text-cyan-400" />
                                </div>
                                <span className="text-sm font-medium text-white tracking-wide">
                                    {isPlaying ? 'INITIALIZING' : 'RESTART'}
                                </span>
                            </div>
                        ) : (
                            <div className={`
                                flex flex-col items-center
                                transition-transform duration-300
                                ${isHovered ? 'scale-110' : 'scale-100'}
                            `}>
                                {/* Central icon with prominent styling */}
                                <div className="relative mb-4">
                                    <div className="absolute -inset-3 rounded-full bg-gradient-radial from-cyan-500/20 to-transparent blur-sm" />
                                    <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900 border border-cyan-500/30">
                                        <Power className="w-10 h-10 text-cyan-400" />
                                    </div>
                                </div>
                                
                                {/* Stylized text */}
                                <div className="text-center">
                                    <span className="block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white tracking-widest">
                                        {isPlaying ? 'INITIALIZING' : 'BEGIN'}
                                    </span>
                                    <span className="block text-sm text-cyan-300/80 mt-1 tracking-wider">
                                        THE EXPERIENCE
                                    </span>
                                </div>
                            </div>
                        )}
                    </button>

                    {/* Minimal loading indicator during play */}
                    {isPlaying && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5">
                            <div className="h-full bg-cyan-500 animate-progress" />
                        </div>
                    )}
                    
                    {/* Subtle accents around the circular button */}
                    {!hasBeenClicked && (
                        <>
                            <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-cyan-400/40" />
                            <div className="absolute bottom-10 right-10 w-1 h-1 rounded-full bg-cyan-400/70" />
                            <div className="absolute top-1/2 right-8 w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                        </>
                    )}
                </div>
            </div>
            
            {/* Add CSS for minimal required animations */}
            <style jsx>{`
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                
                .animate-progress {
                    animation: progress 2.2s linear infinite;
                }
                
                .camera-shake {
                    animation: camera-shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                
                @keyframes camera-shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
                    40%, 60% { transform: translate3d(3px, 0, 0); }
                }
                
                .zoom-in-effect {
                    animation: zoom-in 1.5s ease-out forwards;
                }
                
                @keyframes zoom-in {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                    100% { transform: scale(1); }
                }
                
                .bg-tv-static {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                }
            `}</style>
        </div>
    );
};

export default PremiumIntroButton;