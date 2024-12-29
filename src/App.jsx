import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Vector3 } from 'three';
import { RotateCcw } from "lucide-react";
import LivingRoom from "./components/LivingRoom";
import Tv from "./components/Tv";
import Lamp from "./components/Lamp";
import TreeLamp from "./components/TreeLamp";
import Character from "./components/Character";
import LightHelpers from "./components/LightHelpers";
import { CameraController } from './CameraController';
import { useAppContext } from "./AppContext";
import IntroAnimationButton from "./components/IntroAnimationButton";

// Animation states configuration
const characterStates = {
  relax: {
    animationPath: "/assets/animations/relax.fbx",
    position: { x: 0, y: 0.2, z: 2.4 },
    rotation: [0, 3, 0], // Default rotation for relax state
  },
  walking: {
    animationPath: "/assets/animations/Walking.fbx",
    position: { x: 7, y: 0.2, z: -1 },
    rotation: [0, 5, 0], // Rotate 90 degrees for walking
  },
  standToSit: {
    animationPath: "/assets/animations/StandToSit.fbx",
    position: { x: 0, y: 0.2, z: 1.5 },
    rotation: [0, 3, 0], // Rotate 180 degrees for sitting
  },
  idle: {
    animationPath: "/assets/animations/Idle.fbx",
    position: { x: 7, y: 0.2, z: -1 },
    rotation: [0, 5, 5], // Rotate 45 degrees for idle
  },
};



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
  perspective1: {
    position: new Vector3(8, 8, 15),
    target: new Vector3(0, 0, 0),
  },
  perspective2: {
    position: new Vector3(-4, 2, -4),
    target: new Vector3(0, 0, 0),
  },
};


export default function App() {
  const [currentPerspective, setCurrentPerspective] = useState('defaultPerspective');
  // const [activeCharacter, setActiveCharacter] = useState("idle");
  const { state, setState } = useAppContext();
  const { activeCharacter } = useAppContext();
  const controlsRef = useRef();

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <>
      {/* Camera perspective buttons */}
      <div className="absolute top-4 left-4 z-10 space-x-4">
        {Object.keys(CAMERA_POSITIONS).map((perspective) => (
          <button
            key={perspective}
            className={`px-4 py-2 rounded-md ${currentPerspective === perspective
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
              }`}
            onClick={() => setCurrentPerspective(perspective)}
          >
            {perspective}
          </button>
        ))}
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={() => setState(prev => ({ ...prev, isDarkMode: !state.isDarkMode }))}
        className="fixed top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-md z-10 hover:bg-gray-700"
      >
        {state.isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* TV toggle */}
      <button
        onClick={() => setState(prev => ({ ...prev, isTvOn: !state.isTvOn }))}
        className="fixed top-16 right-4 px-4 py-2 bg-gray-800 text-white rounded-md z-20 hover:bg-gray-700"
      >
        {state.isTvOn ? "TV On" : "TV Off"}
      </button>

      {/* Reset camera button */}
      <button
        onClick={handleResetCamera}
        className="fixed top-40 right-4 px-4 py-2 bg-gray-800 text-white rounded-md z-20 hover:bg-gray-700"
      >
        <RotateCcw className="w-4 h-4 inline mr-2" />
        Reset Camera
      </button>

      {/* Animation control buttons */}
      {/* <AnimationButtons
        setActiveCharacter={setActiveCharacter}
        setCurrentPerspective={setCurrentPerspective}
      /> */}

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
        <CameraController
          position={CAMERA_POSITIONS[currentPerspective].position}
          target={CAMERA_POSITIONS[currentPerspective].target}
        />

        <LivingRoom />
        <Tv />
        <Lamp />
        <TreeLamp />

        {/* <Character
          animationPath={characterStates[activeCharacter].animationPath}
          position={characterStates[activeCharacter].position}
          rotation={characterStates[activeCharacter].rotation}
        /> */}

        <Character />


        <LightHelpers isDarkMode={state.isDarkMode} />

        <OrbitControls
          ref={controlsRef}
          minDistance={1}
          maxDistance={40}
          enableDamping
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
      </Canvas>
    </>
  );
}