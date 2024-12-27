/* eslint-disable react/no-unknown-property */

import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree, extend } from "@react-three/fiber";
import { DirectionalLightHelper, SpotLight } from "three";
import { useRef, useEffect, useState } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import LivingRoom from "./components/LivingRoom";
import Tv from "./components/Tv";
import Lamp from "./components/Lamp";
import FairyLight from "./components/FairyLights";
import TreeLamp from "./components/TreeLamp";
import AnimatedOrbitControls from "./components/AnimatedOrbitControls";
import Character from "./components/Character";
import Developer from "./components/Developer";

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


function LightHelpers({ isDarkMode }) {
  const lightRef1 = useRef();
  const lightRef2 = useRef();
  const lightRef3 = useRef();
  const sunlightRef = useRef();
  const moonlightRef = useRef();
  const helperRef1 = useRef();
  const helperRef2 = useRef();
  const helperRef3 = useRef();
  const sunHelperRef = useRef();
  const moonHelperRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (lightRef1.current && lightRef2.current && lightRef3.current && sunlightRef.current && moonlightRef.current) {
      helperRef1.current = new DirectionalLightHelper(lightRef1.current, 1, "red");
      helperRef2.current = new DirectionalLightHelper(lightRef2.current, 1, "blue");
      helperRef3.current = new DirectionalLightHelper(lightRef3.current, 1, "green");
      sunHelperRef.current = new DirectionalLightHelper(sunlightRef.current, 1, "yellow");
      moonHelperRef.current = new DirectionalLightHelper(moonlightRef.current, 1, "white");

      // Show helpers in both modes
      scene.add(helperRef1.current);
      scene.add(helperRef2.current);
      scene.add(helperRef3.current);

      // Add appropriate helper based on mode
      if (isDarkMode) {
        scene.add(moonHelperRef.current);
      } else {
        scene.add(sunHelperRef.current);
      }
    }

    return () => {
      [helperRef1.current, helperRef2.current, helperRef3.current, sunHelperRef.current, moonHelperRef.current].forEach(helper => {
        if (helper) scene.remove(helper);
      });
    };
  }, [scene, isDarkMode]);

  return (
    <>
      {/* Sunlight - only active in light mode */}
      {!isDarkMode && (
        <directionalLight
          ref={sunlightRef}
          position={[-20, 10, 0]}
          color="#ffd700"
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
      )}

      {/* Moonlight - only active in dark mode */}
      {isDarkMode && (
        <directionalLight
          ref={sunlightRef}
          position={[-20, 10, 0]}
          color="#262B89"
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
      )}

      {/* Mood lighting for dark mode */}
      {isDarkMode && (
        <>
          {/* TV backlight glow */}
          <spotLight
            position={[-10.5, 4.8, -6]}
            color="#4ca6ff"
            intensity={1.5}
            distance={4}
            angle={Math.PI / 4}
            penumbra={1}
            decay={2}
          />

          {/* Subtle room lighting */}
          <pointLight
            position={[0, 8, 0]}
            color="#2c3e50"
            intensity={0.3}
            distance={20}
          />
        </>
      )}

      {/* Regular lights - adjusted for dark mode */}
      <directionalLight
        ref={lightRef1}
        position={[10, 2, 0]}
        color={isDarkMode ? "#2c3e50" : "#fff"}
        intensity={isDarkMode ? 0.1 : 0.3}
      />
      <directionalLight
        ref={lightRef2}
        position={[-8, 2, 0]}
        color={isDarkMode ? "#2c3e50" : "#fff"}
        intensity={isDarkMode ? 0.2 : 1}
      />
      <directionalLight
        ref={lightRef3}
        position={[0, 5, 5]}
        color={isDarkMode ? "#2c3e50" : "#fff"}
        intensity={isDarkMode ? 0.1 : 0.3}
      />
    </>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTvOn, setIsTvOn] = useState(false);

  return (
    <>
      <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <TvOnOff isTvOn={isTvOn} setIsTvOn={setIsTvOn} />

      <Canvas
        className={`w-full h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-700'}`}
        camera={{ position: [0, 4, 10], fov: 55 }}
        shadows
      >

        <LivingRoom />
        <Tv isDarkMode={isDarkMode} isTvOn={isTvOn} />
        <Lamp isDarkMode={isDarkMode} />
        <TreeLamp isDarkMode={isDarkMode} />

        <Character />
        {/* <Developer /> */}
        {/* <AnimatedOrbitControls /> */}
        {/* <FairyLight /> */}
        <LightHelpers isDarkMode={isDarkMode} />
        <ambientLight intensity={isDarkMode ? 0.05 : 0.1} />


        <OrbitControls
          minDistance={1}
          maxDistance={40}
          enableDamping
        />

        <EffectComposer>
          <Bloom
            intensity={isDarkMode ? 3 : 1}
            luminanceThreshold={isDarkMode ? 0.1 : 0.9}
            luminanceSmoothing={isDarkMode ? 0.9 : 0.9}
            height={300}
            mipmapBlur={true}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </>
  );
}