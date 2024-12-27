/* eslint-disable react/no-unknown-property */
import { GUI } from 'lil-gui';
import { useGLTF } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

function Tv({ isDarkMode = false }) {
    const { scene } = useGLTF('/assets/models/tv1.glb');
    const [scale, setScale] = useState({ x: 4.8, y: 3.5, z: 4 });
    const [position, setPosition] = useState({ x: -12.3, y: 4.8, z: -5 });

    // Calculate backlight plane dimensions
    const backlightWidth = 5.4;
    const backlightHeight = 2.2;

    return (
        <>
            <primitive
                object={scene}
                scale={[scale.x, scale.y, scale.z]}
                position={[position.x, position.y, position.z]}
            />

            {/* Main LED Backlight Plane */}
            <mesh
                position={[-0.05, 2.4, position.z + 0.2]}
                rotation={[0, 0, 0]}
            >
                <planeGeometry args={[backlightWidth, backlightHeight]} />
                <meshStandardMaterial
                    color={isDarkMode ? "#4ca6ff" : "#ffffff"}
                    emissive={isDarkMode ? "#4ca6ff" : "#000000"}
                    emissiveIntensity={isDarkMode ? 5 : 0} // Increased from 2 to 5
                    transparent={true}
                    opacity={isDarkMode ? 1 : 0}
                />
            </mesh>

            {/* Additional glow plane for extra bloom */}
            {isDarkMode && (
                <mesh
                    position={[-0.05, 2.4, position.z - 0.19]} // Slightly in front of main plane
                    rotation={[0, 0, 0]}
                >
                    <planeGeometry args={[backlightWidth * 1.1, backlightHeight * 1.1]} />
                    <meshBasicMaterial
                        color="#4ca6ff"
                        transparent={true}
                        opacity={0.6}
                    />
                </mesh>
            )}

            {/* Multiple point lights for enhanced glow */}
            {isDarkMode && (
                <>
                    {/* Central bright light */}
                    <pointLight
                        position={[position.x, position.y, position.z - 0.3]}
                        color="#4ca6ff"
                        intensity={8}
                        distance={6}
                        decay={2}
                    />

                    {/* Additional accent lights */}
                    <pointLight
                        position={[position.x - 2, position.y, position.z - 0.2]}
                        color="#4ca6ff"
                        intensity={4}
                        distance={4}
                        decay={2}
                    />
                    <pointLight
                        position={[position.x + 2, position.y, position.z - 0.2]}
                        color="#4ca6ff"
                        intensity={4}
                        distance={4}
                        decay={2}
                    />

                    {/* Ambient glow */}
                    <spotLight
                        position={[position.x, position.y, position.z - 1]}
                        color="#4ca6ff"
                        intensity={3}
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