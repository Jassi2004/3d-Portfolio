import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HelperButtonSelect = ({ position }) => {
    const { setCurrentPerspective, state } = useAppContext(); // Get state and setCurrentPerspective
    const navigate = useNavigate(); // Hook to navigate between pages

    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const textGlowRef = useRef(null);
    const [glowIntensity, setGlowIntensity] = useState(1);

    // Define the channels array
    const channels = [
        { number: 1, name: "About Me", color: "#4ca6ff" },
        { number: 2, name: "Education", color: "#4ca6ff" },
        { number: 3, name: "Experience", color: "#4ca6ff" },
        { number: 4, name: "Skills", color: "#4ca6ff" },
        { number: 5, name: "Projects", color: "#4ca6ff" },
        { number: 6, name: "Contact", color: "#4ca6ff" },
    ];

    // Handle button click, use current channel to navigate
    const handleSelectClick = (event) => {
        event.stopPropagation();

        // Get the current channel index
        const currentChannelIndex = state.currentChannel;

        // Get the corresponding channel object
        const currentChannel = channels[currentChannelIndex];

        if (currentChannel) {
            // Navigate to the page based on the current channel
            setCurrentPerspective("intoTheTvPerspective");

            setTimeout(() => {
                navigate(`/${currentChannel.name.toLowerCase().replace(/\s+/g, '-')}`); // Convert the channel name to URL-friendly format
                setCurrentPerspective("defaultPerspective");
            }, 1000);
        }
    };

    // Match the same glow animation timing from CircularTouchPad
    useFrame(() => {
        const intensity = (Math.sin(Date.now() * 0.005) + 1) * 0.8 + 0.2;
        setGlowIntensity(intensity);

        if (textRef.current) {
            textRef.current.material.emissiveIntensity = intensity;
        }
        if (textGlowRef.current) {
            textGlowRef.current.material.opacity = intensity;
        }
    });

    return (
        <group position={position} scale={[1, 1, 0.52]}>
            {/* Main button */}
            <mesh
                ref={buttonRef}
                onPointerDown={handleSelectClick}
            >
                <sphereGeometry args={[0.035, 32, 32]} />
                <meshStandardMaterial
                    color="#333333"
                    roughness={0.7}
                    metalness={0.1}
                    emissive="black"
                    emissiveIntensity={0}
                />
            </mesh>

            {/* OK Text */}
            <group position={[0, -0.002, 0.035]}>
                {/* Main text */}
                <mesh ref={textRef}>
                    <planeGeometry args={[0.03, 0.015]} />
                    <meshStandardMaterial
                        color="#e24a4a"
                        roughness={0.5}
                        metalness={0.1}
                        emissive="#e24a4a"
                        emissiveIntensity={glowIntensity}
                        transparent
                        side={THREE.DoubleSide}
                    >
                        <canvasTexture
                            attach="map"
                            image={(() => {
                                const canvas = document.createElement('canvas');
                                const ctx = canvas.getContext('2d');
                                canvas.width = 64;
                                canvas.height = 32;
                                ctx.fillStyle = '#e24a4a';
                                ctx.font = 'bold 24px Arial';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('OK', canvas.width / 2, canvas.height / 2);
                                return canvas;
                            })()}
                        />
                    </meshStandardMaterial>
                </mesh>

                {/* Glow layer */}
                <mesh
                    ref={textGlowRef}
                    position={[0, 0, -0.001]}
                    scale={[1.2, 1.2, 1]}
                >
                    <planeGeometry args={[0.03, 0.015]} />
                    <meshBasicMaterial
                        color="#e24a4a"
                        transparent
                        opacity={glowIntensity}
                        blending={THREE.AdditiveBlending}
                        side={THREE.DoubleSide}
                    >
                        <canvasTexture
                            attach="map"
                            image={(() => {
                                const canvas = document.createElement('canvas');
                                const ctx = canvas.getContext('2d');
                                canvas.width = 64;
                                canvas.height = 32;
                                ctx.fillStyle = '#e24a4a';
                                ctx.font = 'bold 24px Arial';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('OK', canvas.width / 2, canvas.height / 2);
                                return canvas;
                            })()}
                        />
                    </meshBasicMaterial>
                </mesh>
            </group>
        </group>
    );
};

export default HelperButtonSelect;
