import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../AppContext';
import { Play } from 'lucide-react';

const IntroAnimationButton = ({ setCurrentPerspective }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasBeenClicked, setHasBeenClicked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { setActiveCharacter, setIsTvOn } = useAppContext();
    const activeStepRef = useRef(null);

    useEffect(() => {
        const hasPlayed = localStorage.getItem('introAnimationPlayed');
        const timestamp = localStorage.getItem('introAnimationTimestamp');

        // Check if the animation was played and if the timestamp is within 10 minutes
        if (hasPlayed && timestamp) {
            const currentTime = Date.now();
            const expireTime = 10 * 60 * 1000; // 10 minutes in milliseconds
            if (currentTime - parseInt(timestamp) < expireTime) {
                setHasBeenClicked(true); // Animation was played recently, no need to show intro
            } else {
                // If the timestamp has expired, remove the flag from localStorage
                localStorage.removeItem('introAnimationPlayed');
                localStorage.removeItem('introAnimationTimestamp');
            }
        }
    }, []);

    const setStateAndAnimation = (character, perspective, startTime) => {
        Promise.all([
            setActiveCharacter(character),
            setCurrentPerspective(perspective)
        ]).then(() => {
            const elapsedTime = Date.now() - startTime;
        });
    };

    const playIntroAnimation = async () => {
        if (isPlaying) return;

        setIsPlaying(true);
        setHasBeenClicked(true);

        // Store in localStorage that animation has been played and set the timestamp
        localStorage.setItem('introAnimationPlayed', 'true');
        localStorage.setItem('introAnimationTimestamp', Date.now().toString()); // Save current timestamp

        const startTime = Date.now();

        try {
            setStateAndAnimation("walking", "walkingPerspective", startTime);
            await new Promise(resolve => setTimeout(resolve, 100));
            setStateAndAnimation("walking", "walkingPerspective", startTime);
            await new Promise(resolve => setTimeout(resolve, 2200));

            setStateAndAnimation("standToSit", "tvPerspective", startTime);
            await new Promise(resolve => setTimeout(resolve, 0));
            setStateAndAnimation("standToSit", "tvPerspective", startTime);
            await new Promise(resolve => setTimeout(resolve, 800));

            setStateAndAnimation("relax", "tvPerspective", startTime);
            await new Promise(resolve => setTimeout(resolve, 1500));

            setStateAndAnimation("relax", "changeChannelPerspective", startTime);

            setTimeout(() => {
                setIsTvOn();
            }, 1000);

        } catch (error) {
            console.error('Animation sequence failed:', error);
        } finally {
            activeStepRef.current = null;
            setIsPlaying(false);
        }
    };

    return (
        <div className={`
            fixed z-50 transition-all duration-700 ease-in-out
            ${hasBeenClicked
                ? 'top-1 right-4 transform-none'
                : 'inset-0 flex items-center justify-center'
            }
        `}>
            <div
                className={`
                    relative
                    transition-all duration-500 ease-out
                    ${isHovered ? 'scale-105' : 'scale-100'}
                    ${hasBeenClicked ? 'scale-75' : ''}
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Glowing ring animation - only shown when centered */}
                {!hasBeenClicked && (
                    <div className={`
                        absolute inset-0
                        rounded-full
                        bg-gradient-to-r from-blue-500 to-purple-500
                        blur-lg opacity-50
                        animate-pulse
                        transition-all duration-500
                        ${isHovered ? 'scale-125' : 'scale-110'}
                    `} />
                )}

                {/* Main button */}
                <button
                    onClick={playIntroAnimation}
                    disabled={isPlaying}
                    className={`
                        relative
                        ${hasBeenClicked ? 'w-32 h-12' : 'w-48 h-48'}
                        rounded-full
                        bg-gradient-to-br from-slate-900 to-slate-800
                        border border-slate-700
                        shadow-xl
                        overflow-hidden
                        transition-all duration-700
                        transform
                        ${isPlaying ? 'opacity-75 cursor-not-allowed' : 'hover:border-blue-500'}
                        ${hasBeenClicked ? 'px-4 py-2' : ''}
                    `}
                >
                    {/* Inner glow effect - only shown when centered */}
                    {!hasBeenClicked && (
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
                    )}

                    {/* Content container */}
                    <div className={`
                        relative flex items-center justify-center h-full gap-3
                        ${hasBeenClicked ? 'flex-row' : 'flex-col p-4'}
                    `}>
                        <Play className={`
                            text-blue-400 transition-all duration-700
                            ${hasBeenClicked ? 'w-4 h-4' : 'w-12 h-12'}
                        `} />

                        <span className={`
                            font-medium text-white transition-all duration-700
                            ${hasBeenClicked ? 'text-sm' : 'text-lg'}
                        `}>
                            {isPlaying ? 'Playing...' : hasBeenClicked ? 'Replay' : 'Start Experience'}
                        </span>

                        {!hasBeenClicked && !isPlaying && (
                            <span className="text-xs text-blue-400/80">Click to begin</span>
                        )}
                    </div>

                    {/* Futuristic circular border effect - only shown when centered */}
                    {!hasBeenClicked && (
                        <div className={`
                            absolute inset-0 border-4 border-transparent
                            rounded-full
                            transition-all duration-500
                            ${isHovered ? 'rotate-180' : 'rotate-0'}
                        `}>
                            <div className="absolute top-0 left-1/2 w-4 h-4 -ml-2 -mt-2 bg-blue-500 rounded-full blur-sm" />
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};

export default IntroAnimationButton;
