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


export default function HomePage() {
    const { state, setState, setCurrentPerspective } = useAppContext();
    const controlsRef = useRef();

    return (
        <>
            {/* Camera perspective buttons */}
            <CameraDropdown />

            {/* Dark mode toggle */}
            <button
                onClick={() => setState(prev => ({ ...prev, isDarkMode: !state.isDarkMode }))}
                className="fixed top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-md z-10 hover:bg-gray-700"
            >
                {state.isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {/* TV toggle */}
            <TvToggleButton />

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

                <LivingRoom />
                <Tv />
                <Lamp />
                <TreeLamp />
                <Character />

                {state.currentPerspective === 'changeChannelPerspective' && (
                    <Remote />
                )}

                <LightHelpers isDarkMode={state.isDarkMode} />


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
                <OrbitControls
                    ref={controlsRef}
                    minDistance={1}
                    maxDistance={40}
                    enableDamping
                />
            </Canvas>
        </>
    );
}