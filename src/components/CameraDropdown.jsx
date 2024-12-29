import { Camera, CameraOff } from 'lucide-react';
import { useAppContext } from '../AppContext';
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
        label: 'TV View'
    },
    walkingPerspective: {
        position: new Vector3(-4.5, 3.5, 5),
        target: new Vector3(0, 2, 0),
        label: 'Walking View'
    },
    changeChannelPerspective: {
        position: new Vector3(0, 2, 2),
        target: new Vector3(0, 1, -5),
        label: 'Select Channel'
    },
    intoTheTvPerspective: {
        position: new Vector3(0, 2, -4),
        target: new Vector3(0, 2.5, -5.2),
        label: 'Enter TV View'
    },
    perspective2: {
        position: new Vector3(-4, 2, -4),
        target: new Vector3(0, 0, 0),
        label: 'Relaxation View'
    },
    perspective1: {
        position: new Vector3(8, 8, 15),
        target: new Vector3(0, 0, 0),
        label: 'Wide View'
    },
};

const CameraDropdown = () => {
    const { state, setState } = useAppContext();

    // Toggle camera state
    const toggleCamera = () => {
        state.currentPerspective = 'defaultPerspective'
        setState(prev => ({
            ...prev,
            freeCameraMovement: !prev.freeCameraMovement
        }));
    };

    // Handle perspective change
    const handlePerspectiveChange = (perspectiveKey) => {
        setState(prev => ({
            ...prev,
            currentPerspective: perspectiveKey
        }));
    };

    return (
        <div className="absolute top-4 left-4 z-10">
            <div className="relative">
                {/* Camera Icon Button */}
                <button
                    className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 border border-white/20"
                    onClick={toggleCamera}
                >
                    {state.freeCameraMovement ? (
                        <CameraOff className="w-6 h-6 text-black" />
                    ) : (
                        <Camera className="w-6 h-6 text-black" />
                    )}
                </button>

                {/* Camera Perspective List - Only visible when freeCameraMovement is true */}
                {!state.freeCameraMovement && (
                    <div className="absolute left-0 mt-2 w-36 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                        <div className="p-1">
                            {Object.entries(CAMERA_PERSPECTIVES).map(([key, perspective]) => (
                                <button
                                    key={key}
                                    className={`
                                        w-full px-4 py-2 text-sm rounded-md text-left 
                                        transition-all duration-200
                                        ${state.currentPerspective === key
                                            ? 'bg-blue-600 text-black'
                                            : 'text-black hover:bg-white/10'
                                        }
                                        ${key === 'changeChannelPerspective'
                                            ? 'bg-yellow-100 border-2 border-yellow-200 text-black hover:bg-yellow-600'
                                            : ''
                                        }
                                    `}
                                    onClick={() => handlePerspectiveChange(key)}
                                >
                                    {perspective.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CameraDropdown;