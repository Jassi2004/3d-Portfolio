/* eslint-disable react/no-unknown-property */

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import LivingRoom from "./components/LivingRoom";
import Tv from "./components/Tv";
import Lamp from "./components/Lamp";
import TreeLamp from "./components/TreeLamp";
import AnimatedOrbitControls from "./components/AnimatedOrbitControls";
import Character from "./components/Character";
import Developer from "./components/Developer";
import { useAppContext } from "./AppContext";
import RelaxCharacter from "./components/RelaxCharacter";
import LightHelpers from "./components/LightHelpers";
import { RotateCcw } from "lucide-react";
import { CameraController } from './CameraController';
import { useState } from 'react';
import { Vector3 } from 'three';
import WalkingCharacter from "./components/WalkingCharacter";
import StandToSitCharacter from "./components/StandToSitCharacter";

// Dark mode toggle button component
const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => (
  <button
    onClick={() => setIsDarkMode(!isDarkMode)}
    className="fixed top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-md z-10 hover:bg-gray-700"
  >
    {isDarkMode ? "Light Mode" : "Dark Mode"}
  </button>
);

// Tv on
const TvOnOff = ({ isTvOn, setIsTvOn }) => (
  <button
    onClick={() => setIsTvOn(!isTvOn)}
    className="fixed top-16 right-4 px-4 py-2 bg-gray-800 text-white rounded-md z-20 hover:bg-gray-700"
  >
    {isTvOn ? "Tv On" : "Tv Off"}
  </button>
);

// Animation control button
const AnimationControl = ({ animationState, setAnimationState }) => (
  <button
    onClick={() => setAnimationState("walking")}
    className="fixed top-28 right-4 px-4 py-2 bg-gray-800 text-white rounded-md z-20 hover:bg-gray-700"
    disabled={animationState !== "idle"}
  >
    Start Animation
  </button>
);






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
    position: new Vector3(-4.5, 3.5, 4.5),
    target: new Vector3(0, 0, 0),
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
  const [currentPerspective, setCurrentPerspective] = useState('walkingPerspective');
  const [activeCharacter, setActiveCharacter] = useState("relax");  // Step 1: Create state
  const { state, setState } = useAppContext();
  const controlsRef = useRef();

  // In App.jsx
  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };


  const StartWalkingControl = ({ setCurrentPerspective, setState, isTvOn, setIsTvOn }) => {
    const startWalkingAnimation = () => {
      // Step 1: Change to walking perspective
      setCurrentPerspective('walkingPerspective');
      setActiveCharacter("walking");
      // setIsTvOn(true)

      // Step 2: After 1 second, change to TV perspective
      setTimeout(() => {
        setCurrentPerspective('tvPerspective');
        setActiveCharacter("standToSit");

      }, 2000); // 1 second for walking perspective

      // Step 3: Turn on the TV after switching to TV perspective
      setTimeout(() => {
        setIsTvOn(true)
      }, 3000); // Adjust delay as needed

      setTimeout(() => {
        setCurrentPerspective('changeChannelPerspective');
        setActiveCharacter("relax");
      }, 4000);
    };

    return (
      <button
        onClick={startWalkingAnimation}
        className="fixed top-52 right-4 px-4 py-2 bg-gray-800 text-white rounded-md z-20 hover:bg-gray-700"
      >
        Start Walking
      </button>
    );
  };

  return (
    <>

      {/* perspective  */}
      <div className="absolute top-4 left-4 z-10 space-x-4">
        <button
          className={`px-4 py-2 rounded-md ${currentPerspective === 'defaultPerspective'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => setCurrentPerspective('defaultPerspective')}
        >
          defaultPerspective
        </button>
        <button
          className={`px-4 py-2 rounded-md ${currentPerspective === 'tvPerspective'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => setCurrentPerspective('tvPerspective')}
        >
          Tv Perspective
        </button>
        <button
          className={`px-4 py-2 rounded-md ${currentPerspective === 'walkingPerspective'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => setCurrentPerspective('walkingPerspective')}
        >
          walking Perspective
        </button>
        <button
          className={`px-4 py-2 rounded-md ${currentPerspective === 'changeChannelPerspective'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => setCurrentPerspective('changeChannelPerspective')}
        >
          channel Perspective
        </button>
        <button
          className={`px-4 py-2 rounded-md ${currentPerspective === 'perspective1'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => setCurrentPerspective('perspective1')}
        >
          Perspective 1
        </button>
        <button
          className={`px-4 py-2 rounded-md ${currentPerspective === 'perspective2'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => setCurrentPerspective('perspective2')}
        >
          Perspective 2
        </button>
      </div>

      <DarkModeToggle
        isDarkMode={state.isDarkMode}
        setIsDarkMode={(newMode) =>
          setState(prev => ({ ...prev, isDarkMode: newMode }))
        }
      />
      <TvOnOff
        isTvOn={state.isTvOn}
        setIsTvOn={(newState) =>
          setState(prev => ({ ...prev, isTvOn: newState }))
        }
      />
      <AnimationControl
        animationState={state.animationState}
        setAnimationState={(newState) =>
          setState(prev => ({ ...prev, animationState: newState }))
        }
      />
      <StartWalkingControl
        setCurrentPerspective={setCurrentPerspective}
        setState={(newState) =>
          setState(prev => ({ ...prev, ...newState }))
        }
        isTvOn={state.isTvOn}
        setIsTvOn={(newState) =>
          setState(prev => ({ ...prev, isTvOn: newState }))
        }
      // startWalkingAnimation={startWalkingAnimation}  // Pass the function here

      />
      <button
        onClick={handleResetCamera}
        className="fixed top-40 right-4 px-4 py-2 bg-gray-800 text-white rounded-md z-20 hover:bg-gray-700"
      >
        <RotateCcw className="w-4 h-4 inline mr-2" />
        Reset Camera
      </button>

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
        {/* <OrbitControls makeDefault /> */}
        <LivingRoom />
        <Tv />
        <Lamp />
        <TreeLamp />
        {/* <RelaxCharacter /> */}
        {/* <WalkingCharacter /> */}
        {/* <StandToSitCharacter />/ */}
        {/* {activeCharacter === "relax" && <RelaxCharacter />} */}
        {activeCharacter === "walking" && <WalkingCharacter />}
        {activeCharacter === "standToSit" && <StandToSitCharacter />}
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