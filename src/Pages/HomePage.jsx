import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Vector3 } from 'three';
import LivingRoom from "../components/LivingRoom";
import Tv from "../components/Tv";
import Lamp from "../components/Lamp";
import TreeLamp from "../components/TreeLamp";
import Character from "../components/Character";
import LightHelpers from "../components/LightHelpers";
import { CameraController } from '../CameraController';
import { useAppContext } from "../AppContext";
import IntroAnimationButton from "../components/IntroAnimationButton";
import Remote from "../components/Remote";
import CameraDropdown from "../components/CameraDropdown";
import TvToggleButton from "../components/TvToggleButton";
import LonelyComponent from "../components/LonelyComponent";
import QuickContactButton from "../components/QuickContantButton";
import { Suspense, useState, useEffect } from 'react';
import ThreeDErrorBoundary from "./PagesComponents/ThreeDErrorBoundary";
import ControlButtons from "../components/RightControlButton";




const CAMERA_POSITIONS = {
    defaultPerspective: {
        position: new Vector3(0, 3.8, 10.7),
        target: new Vector3(0, 0, 0),
    },
    tvPerspective: {
        position: new Vector3(0, 3, 7.5),
        target: new Vector3(0, 0, 0),
    },
    walkingPerspective: {
        position: new Vector3(-4.5, 3.5, 5),
        target: new Vector3(0, 2, 0),
    },
    changeChannelPerspective: {
        position: new Vector3(0, 2, 2),
        target: new Vector3(0, 1, -5),
    },
    intoTheTvPerspective: {
        position: new Vector3(0, 2, -4.5),
        target: new Vector3(0, 5, -12),
    },
    perspective1: {
        position: new Vector3(8, 8, 15),
        target: new Vector3(0, 0, 0),
    },
    perspective2: {
        position: new Vector3(-4, 2, -4),
        target: new Vector3(0, 0, 0),
    },
};


// Custom Loading component
const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + Math.random() * 15;
                return newProgress > 100 ? 100 : newProgress;
            });
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-8">
                <div className="space-y-6">
                    {/* Loading animation */}
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>

                    {/* Progress bar */}
                    <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Loading text */}
                    <div className="text-center">
                        <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                            Loading Experience
                        </p>
                        <p className="text-gray-400 mt-2">
                            {progress < 100 ? 'Preparing the scene...' : 'Almost ready!'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Modified HomePage component with loading state
const HomePage = () => {
    const { state, setState, setCurrentPerspective } = useAppContext();
    const controlsRef = useRef();

    return (
        <Suspense fallback={<LoadingScreen />}>
            <div className="relative w-full h-screen">
                {/* Camera perspective buttons */}
                <CameraDropdown />

                {/* Dark mode toggle */}
                {/* TV toggle */}
                {/* <button
                    onClick={() => setState(prev => ({ ...prev, isDarkMode: !state.isDarkMode }))}
                    className="fixed top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-md z-10 hover:bg-gray-700"
                >
                    {state.isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>

                <TvToggleButton />

                <QuickContactButton /> */}

                <ControlButtons />

                {/* Intro Animation Button */}
                <IntroAnimationButton
                    setCurrentPerspective={setCurrentPerspective}
                />

                <Canvas
                    className={`w-full h-screen ${state.isDarkMode ? 'bg-gray-900' : 'bg-gray-700'}`}
                    camera={{
                        position: state.camera.position,
                        fov: state.camera.fov,
                    }}
                    shadows
                >
                    {!state.freeCameraMovement && (
                        <CameraController
                            position={CAMERA_POSITIONS[state.currentPerspective].position}
                            target={CAMERA_POSITIONS[state.currentPerspective].target}
                        />
                    )}

                    {/* <Suspense fallback={null}> */}
                    <ThreeDErrorBoundary>
                        <Suspense fallback={<LoadingScreen />}>
                            <LivingRoom />
                            <Tv />
                            <Lamp />
                            <TreeLamp />
                        </Suspense>
                    </ThreeDErrorBoundary>
                    <Character />

                    {state.currentPerspective === 'changeChannelPerspective' && (
                        <Remote />
                    )}

                    <LightHelpers isDarkMode={state.isDarkMode} />

                    <LonelyComponent
                        message="Yes, I am lonely"
                        position={[-20, 8, -20]}
                    />

                    <EffectComposer>
                        <Bloom
                            intensity={state.isDarkMode ? 3 : 1}
                            luminanceThreshold={state.isDarkMode ? 0.1 : 0.9}
                            luminanceSmoothing={state.isDarkMode ? 0.1 : 0.9}
                            height={300}
                            mipmapBlur={true}
                            radius={0.8}
                        />
                    </EffectComposer>
                    {/* </Suspense> */}

                    <OrbitControls
                        ref={controlsRef}
                        minDistance={1}
                        maxDistance={40}
                        enableDamping
                    />
                </Canvas>
            </div>
        </Suspense>
    );
};

export default HomePage;