/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { useAppContext } from '../AppContext';

function Tv() {
    const { state, setState } = useAppContext();
    const { isDarkMode, isTvOn } = state;
    const { scene } = useGLTF('/assets/models/tv1.glb');
    const [scale] = useState({ x: 4.8, y: 3.5, z: 4 });
    const [position] = useState({ x: -12.3, y: 4.8, z: -5 });

    const backlightWidth = 5.4;
    const backlightHeight = 2.2;

    // Intensity values based on mode
    const getIntensities = () => {
        if (!isTvOn) return {
            emissive: 0,
            opacity: 0,
            glowOpacity: 0,
            pointLight: 0,
            spotLight: 0
        };

        return isDarkMode ? {
            emissive: 3,         // Increased for light mode
            opacity: .8,
            glowOpacity: 1,
            pointLight: 8,
            spotLight: 2      // Reduced from 3
        } : {
            emissive: 5,         // Increased for light mode
            opacity: 1,
            glowOpacity: 1,
            pointLight: 8,
            spotLight: 3
        };
    };

    const intensities = getIntensities();

    return (
        <>
            <primitive
                object={scene}
                scale={[scale.x, scale.y, scale.z]}
                position={[position.x, position.y, position.z]}
            />

            <mesh position={[-0.05, 2.4, position.z + 0.2]}>
                <planeGeometry args={[backlightWidth, backlightHeight]} />
                <meshStandardMaterial
                    color="#4ca6ff"
                    emissive="#4ca6ff"
                    emissiveIntensity={intensities.emissive}
                    transparent={true}
                    opacity={intensities.opacity}
                />
            </mesh>

            {isTvOn && (
                <mesh position={[-0.05, 2.4, position.z - 0.19]}>
                    <planeGeometry
                        args={[backlightWidth * 1.1, backlightHeight * 1.1]}
                    />
                    <meshBasicMaterial
                        color="#4ca6ff"
                        transparent={true}
                        opacity={intensities.glowOpacity}
                    />
                </mesh>
            )}

            {isTvOn && (
                <>
                    <pointLight
                        position={[position.x, position.y, position.z - 0.3]}
                        color="#4ca6ff"
                        intensity={intensities.pointLight}
                        distance={6}
                        decay={2}
                    />
                    <pointLight
                        position={[position.x - 2, position.y, position.z - 0.2]}
                        color="#4ca6ff"
                        intensity={intensities.pointLight * 0.5}
                        distance={4}
                        decay={2}
                    />
                    <pointLight
                        position={[position.x + 2, position.y, position.z - 0.2]}
                        color="#4ca6ff"
                        intensity={intensities.pointLight * 0.5}
                        distance={4}
                        decay={2}
                    />
                    <spotLight
                        position={[position.x, position.y, position.z - 1]}
                        color="#4ca6ff"
                        intensity={intensities.spotLight}
                        angle={Math.PI / 3}
                        penumbra={1}
                        distance={8}
                        decay={2}
                    />
                </>
            )}
        </>
    );
}

export default Tv;