import React, { useState } from 'react';
import { Camera, CameraOff, Mail, TvMinimal, TvMinimalPlay, Sun, Moon } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import { Vector3 } from 'three';

const CAMERA_PERSPECTIVES = {
    defaultPerspective: {
        position: new Vector3(0, 3.8, 10.7),
        target: new Vector3(0, 0, 0),
        label: 'Default View'
    },
    tvPerspective: {
        position: new Vector3(0, 3, 7.5),
        target: new Vector3(0, 0, 0),
        label: 'Close up'
    },
    walkingPerspective: {
        position: new Vector3(-4.5, 3.5, 5),
        target: new Vector3(0, 2, 0),
        label: 'Walking View'
    },
    changeChannelPerspective: {
        position: new Vector3(0, 2, 2),
        target: new Vector3(0, 1, -5),
        label: 'TV Channel'
    },
    perspective2: {
        position: new Vector3(-4, 2, -4),
        target: new Vector3(0, 0, 0),
        label: 'Relax View'
    },
    perspective1: {
        position: new Vector3(8, 8, 15),
        target: new Vector3(0, 0, 0),
        label: 'Wide View'
    },
};

const ControlPanel = () => {
    const { state, setState } = useAppContext();
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null);

    // Toggle free camera movement
    const toggleCamera = () => {
        state.currentPerspective = 'defaultPerspective';
        setState(prev => ({
            ...prev,
            freeCameraMovement: !prev.freeCameraMovement
        }));
    };

    // Change camera perspective
    const handlePerspectiveChange = (perspectiveKey) => {
        setState(prev => ({
            ...prev,
            currentPerspective: perspectiveKey
        }));
    };

    // Navigation for contact
    const handleContactNavigation = () => {
        navigate('/contact');
    };

    return (
        <div className="fixed text-xs top-[250px] left-4 -translate-y-1/2 z-20 ">
            <div className="flex flex-col gap-2 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg w-36">

                {/* CAMERA TOGGLE */}
                <button
                    onClick={toggleCamera}
                    className="flex items-center gap-3 p-3 rounded-md bg-white/20 hover:bg-white/30 transition-all duration-200 border border-white/20 "
                >
                    {state.freeCameraMovement ? (
                        <CameraOff className="w-5 h-5 text-black" />
                    ) : (
                        <Camera className="w-5 h-5 text-black" />
                    )}
                    <span className="text-xs text-black">
                        {state.freeCameraMovement ? 'Stop Explore' : 'Explore'}
                    </span>
                </button>

                {/* CAMERA PERSPECTIVES */}
                {!state.freeCameraMovement && (
                    <div className="flex flex-col gap-2">
                        {Object.entries(CAMERA_PERSPECTIVES).map(([key, perspective]) => (
                            <button
                                key={key}
                                onClick={() => handlePerspectiveChange(key)}
                                className={`
                                    px-3 py-2 rounded-md text-left text-xs
                                    transition-all duration-200
                                    ${state.currentPerspective === key
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white/20 hover:bg-white/30 text-black'
                                    }
                                `}
                            >
                                {perspective.label}
                            </button>
                        ))}
                    </div>
                )}

                <hr className="border-white/20 my-2" />

                {/* CONTACT BUTTON */}
                <button
                    onClick={handleContactNavigation}
                    onMouseEnter={() => setHoveredButton('contact')}
                    onMouseLeave={() => setHoveredButton(null)}
                    className={`flex items-center gap-3 p-2 rounded-md bg-white/20 hover:bg-white/30 transition-all duration-200 border border-white/20
                        ${hoveredButton === 'contact' ? 'scale-105' : 'scale-100'}`}
                >
                    <Mail className="w-4 h-4 text-black" />
                    <span className="text-xs text-black">Contact</span>
                </button>

                {/* TV TOGGLE BUTTON */}
                <button
                    onClick={() => setState(prev => ({ ...prev, isTvOn: !state.isTvOn }))}
                    onMouseEnter={() => setHoveredButton('tv')}
                    onMouseLeave={() => setHoveredButton(null)}
                    className={`flex items-center gap-3 p-2 rounded-md bg-white/20 hover:bg-white/30 transition-all duration-200 border border-white/20
                        ${hoveredButton === 'tv' ? 'scale-105' : 'scale-100'}`}
                >
                    {state.isTvOn ? (
                        <TvMinimalPlay className="w-4 h-4 text-black" />
                    ) : (
                        <TvMinimal className="w-4 h-4 text-black" />
                    )}
                    <span className="text-xs text-black">{state.isTvOn ? 'TV On' : 'TV Off'}</span>
                </button>

                {/* THEME TOGGLE BUTTON */}
                <button
                    onClick={() => setState(prev => ({ ...prev, isDarkMode: !state.isDarkMode }))}
                    onMouseEnter={() => setHoveredButton('theme')}
                    onMouseLeave={() => setHoveredButton(null)}
                    className={`flex items-center gap-3 p-2 rounded-md bg-white/20 hover:bg-white/30 transition-all duration-200 border border-white/20
                        ${hoveredButton === 'theme' ? 'scale-105' : 'scale-100'}`}
                >
                    {state.isDarkMode ? (
                        <Sun className="w-4 h-4 text-black" />
                    ) : (
                        <Moon className="w-4 h-4 text-black" />
                    )}
                    <span className="text-xs text-black">
                        {state.isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;
