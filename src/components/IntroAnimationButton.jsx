import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../AppContext';

const IntroAnimationButton = ({ setCurrentPerspective }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setActiveCharacter, setIsTvOn } = useAppContext();
    const activeStepRef = useRef(null);
    const [currentState, setCurrentState] = useState({
        actualCharacter: "walking",
        camera: "walkingPerspective",
        elapsedTime: 0,
    });

    const setStateAndAnimation = (character, perspective, startTime) => {
        // Set both character and perspective simultaneously
        Promise.all([
            setActiveCharacter(character),
            setCurrentPerspective(perspective)
        ]).then(() => {
            const elapsedTime = Date.now() - startTime;
            setCurrentState({
                actualCharacter: character,
                camera: perspective,
                elapsedTime
            });
        });
    };

    const playIntroAnimation = async () => {
        if (isPlaying || isLoading) return;

        setIsPlaying(true);
        setIsLoading(true);
        const startTime = Date.now();

        try {
            // Walking sequence
            setStateAndAnimation("walking", "walkingPerspective", startTime);
            await new Promise(resolve => setTimeout(resolve, 100));
            setStateAndAnimation("walking", "walkingPerspective", startTime);
            await new Promise(resolve => setTimeout(resolve, 2200));

            // Immediate transition to standToSit with TV perspective
            setStateAndAnimation("standToSit", "tvPerspective", startTime);
            await new Promise(resolve => setTimeout(resolve, 0));
            setStateAndAnimation("standToSit", "tvPerspective", startTime);
            await new Promise(resolve => setTimeout(resolve, 800));

            // Relax sequence
            setStateAndAnimation("relax", "tvPerspective", startTime);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Final change channel perspective
            setStateAndAnimation("relax", "changeChannelPerspective", startTime);

            // Turn TV on after all animations are completed
            setTimeout(() => {
                setIsTvOn();
            }, 1000);

        } catch (error) {
            console.error('Animation sequence failed:', error);
        } finally {
            setIsLoading(false);
            activeStepRef.current = null;
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        return () => {
            setIsPlaying(false);
            setIsLoading(false);
            activeStepRef.current = null;
        };
    }, []);

    return (
        <div>
            <button
                onClick={playIntroAnimation}
                disabled={isPlaying || isLoading}
                className={`fixed top-28 right-4 px-4 py-2 rounded-md z-20 
                    ${(isPlaying || isLoading) ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'} 
                    text-white`}
            >
                {isLoading ? 'Loading...' : isPlaying ? 'Playing...' : 'Start Intro Animation'}
            </button>

            {/* <div className="fixed top-10 left-4 bg-gray-700 text-white p-4 rounded-md z-20">
                <p>Character: {currentState.actualCharacter}</p>
                <p>Camera: {currentState.camera}</p>
                <p>Elapsed Time: {currentState.elapsedTime} ms</p>
                <p>Status: {isLoading ? 'Loading' : isPlaying ? 'Playing' : 'Ready'}</p>
            </div> */}
        </div>
    );
};

export default IntroAnimationButton;