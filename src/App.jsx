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


export default function App() {
  const { state, setState } = useAppContext();
  const controlsRef = useRef();

  // In App.jsx
  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };
  const setCameraPosition = (position) => {
    setState((prev) => ({ ...prev, cameraPosition: position }));
  };



  return (
    <>
      <button
        onClick={() => setCameraPosition([10, 10, 10])}
        className="fixed top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded-md z-10 hover:bg-gray-700"
      >
        Perspective 1
      </button>
      <button
        onClick={() => setCameraPosition([0, 5, 15])}
        className="fixed top-16 left-4 px-4 py-2 bg-gray-800 text-white rounded-md z-10 hover:bg-gray-700"
      >
        Perspective 2
      </button>
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
        <LivingRoom />
        <Tv />
        <Lamp />
        <TreeLamp />
        <RelaxCharacter />
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