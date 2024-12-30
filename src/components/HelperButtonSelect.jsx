import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

const HelperButtonSelect = ({ position }) => {
    const { setCurrentPerspective, state } = useAppContext();
    const navigate = useNavigate();

    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const textGlowRef = useRef(null);
    const [glowIntensity, setGlowIntensity] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);

    const channels = [
        { number: 1, name: "About", path: "/about", color: "#4ca6ff" },
        { number: 2, name: "Education", path: "/education", color: "#4ca6ff" },
        { number: 3, name: "Experience", path: "/experience", color: "#4ca6ff" },
        { number: 4, name: "Skills", path: "/skills", color: "#4ca6ff" },
        { number: 5, name: "Projects", path: "/projects", color: "#4ca6ff" },
        { number: 6, name: "Contact", path: "/contact", color: "#4ca6ff" },
    ];

    const handleSelectClick = (event) => {
        event.stopPropagation();

        if (isAnimating) return;

        const currentChannel = channels[state.currentChannel];

        if (currentChannel) {
            setIsAnimating(true);

            // Start TV zoom animation
            setCurrentPerspective("intoTheTvPerspective");

            // Navigate after animation
            setTimeout(() => {
                navigate(currentChannel.path);
                setCurrentPerspective("defaultPerspective");
                setIsAnimating(false);
            }, 1000);
        }
    };

    useFrame(() => {
        const intensity = (Math.sin(Date.now() * 0.005) + 1) * 0.8 + 0.2;
        setGlowIntensity(intensity);

        if (textRef.current) {
            textRef.current.material.emissiveIntensity = intensity;
        }
        if (textGlowRef.current) {
            textGlowRef.current.material.opacity = intensity * 0.7;
        }
        if (buttonRef.current && !isAnimating) {
            buttonRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.05);
        }
    });

    return (
        <group position={position} scale={[1, 1, 0.52]}>
            <mesh
                ref={buttonRef}
                onPointerDown={handleSelectClick}
            >
                <sphereGeometry args={[0.035, 32, 32]} />
                <meshStandardMaterial
                    color={isAnimating ? "#ff4a4a" : "#333333"}
                    roughness={0.7}
                    metalness={0.3}
                    emissive={isAnimating ? "#ff4a4a" : "black"}
                    emissiveIntensity={isAnimating ? 0.5 : 0}
                />
            </mesh>

            <group position={[0, -0.002, 0.035]}>
                <mesh ref={textRef}>
                    <planeGeometry args={[0.03, 0.015]} />
                    <meshStandardMaterial
                        color="#e24a4a"
                        roughness={0.5}
                        metalness={0.3}
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

                <mesh
                    ref={textGlowRef}
                    position={[0, 0, -0.001]}
                    scale={[1.2, 1.2, 1]}
                >
                    <planeGeometry args={[0.03, 0.015]} />
                    <meshBasicMaterial
                        color="#ff4a4a"
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
                                ctx.fillStyle = '#ff4a4a';
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