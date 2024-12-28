// Scene.jsx
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import LivingRoom from "./LivingRoom";
import { Lamp, Tv } from "lucide-react";
import TreeLamp from "./TreeLamp";
import RelaxCharacter from "./RelaxCharacter";
import LightHelpers from "./LightHelpers";

export function Scene({ isDarkMode }) {
    const controlsRef = useRef();
    const { camera } = useThree();

    useEffect(() => {
        if (camera) {
            camera.position.set(5, 5, 5);
            camera.lookAt(0, 0, 0);
        }
    }, [camera]);

    return (
        <>
            <LivingRoom />
            <Tv />
            <Lamp />
            <TreeLamp />
            <RelaxCharacter />
            <LightHelpers isDarkMode={isDarkMode} />

            <CameraControls
                ref={controlsRef}
                minDistance={1}
                maxDistance={40}
                enableDamping
                dampingFactor={0.05}
            />

            <EffectComposer>
                <Bloom
                    intensity={isDarkMode ? 3 : 1}
                    luminanceThreshold={isDarkMode ? 0.1 : 0.9}
                    luminanceSmoothing={isDarkMode ? 0.1 : 0.9}
                    height={300}
                    mipmapBlur={true}
                    radius={0.8}
                />
            </EffectComposer>
        </>
    );
}