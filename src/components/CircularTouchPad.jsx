/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppContext } from '../AppContext';

const CircularTouchPad = ({ position }) => {
    const { camera, gl } = useThree();
    const rightRingRef = useRef(null);
    const leftRingRef = useRef(null);
    const upArrowRef = useRef(null);
    const downArrowRef = useRef(null);
    const upArrowGlowRef = useRef(null);
    const downArrowGlowRef = useRef(null);
    const [glowIntensity, setGlowIntensity] = useState(1);

    const { state, setCurrentChannel } = useAppContext();

    const { isTvOn } = state;

    const handleNextClick = () => {
        if (!isTvOn) return;
        setCurrentChannel(state.currentChannel < 6 ? state.currentChannel + 1 : 1);
        // setState(prev => ({
        //     ...prev,
        //     currentChannel: prev.currentChannel < 6 ? prev.currentChannel + 1 : 1
        // }));
        console.log("next click currentChannel", state.currentChannel);
    };

    const handlePrevClick = () => {
        if (!isTvOn) return;
        setCurrentChannel(state.currentChannel > 1 ? state.currentChannel - 1 : 6);

        // setState(prev => ({
        //     ...prev,
        //     currentChannel: prev.currentChannel > 1 ? prev.currentChannel - 1 : 6
        // }));
        console.log("prev clicked currentChannel", state.currentChannel);
    };

    // Match power button's glow animation timing
    useFrame(() => {
        // Use exact same formula as power button
        const intensity = (Math.sin(Date.now() * 0.005) + 1) * 0.8 + 0.2;
        setGlowIntensity(intensity);

        if (upArrowRef.current) {
            upArrowRef.current.material.emissiveIntensity = intensity;
        }
        if (downArrowRef.current) {
            downArrowRef.current.material.emissiveIntensity = intensity;
        }
        if (upArrowGlowRef.current) {
            upArrowGlowRef.current.material.opacity = intensity;
        }
        if (downArrowGlowRef.current) {
            downArrowGlowRef.current.material.opacity = intensity;
        }
    });

    // Create arrow shape geometry
    const createArrowShape = () => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0.015);
        shape.lineTo(-0.01, -0.005);
        shape.lineTo(0.01, -0.005);
        shape.lineTo(0, 0.015);
        return shape;
    };



    return (
        <group position={position}>
            {/* Touch pad rings */}
            <group position={[0, 0, -0.002]}>
                <mesh
                    ref={rightRingRef}
                    onPointerDown={handleNextClick}
                >
                    <torusGeometry args={[0.05, 0.02, 16, 32, Math.PI]} />
                    <meshStandardMaterial
                        color="#333333"
                        roughness={0.7}
                        metalness={0.1}
                        emissive="black"
                        emissiveIntensity={0}
                    />
                </mesh>
            </group>

            <group position={[0, 0, -0.002]} rotation={[0, 0, Math.PI]}>
                <mesh
                    ref={leftRingRef}
                    onPointerDown={handlePrevClick}
                >
                    <torusGeometry args={[0.05, 0.02, 16, 32, Math.PI]} />
                    <meshStandardMaterial
                        color="#333333"
                        roughness={0.7}
                        metalness={0.1}
                        emissive="black"
                        emissiveIntensity={0}
                    />
                </mesh>
            </group>

            {/* Up Arrow with glow */}
            <group position={[-0.009, 0.015, 0.05]}>
                {/* Main arrow */}
                <mesh ref={upArrowRef}>
                    <shapeGeometry args={[createArrowShape()]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        roughness={0.5}
                        metalness={0.1}
                        emissive="#4a90e2"
                        emissiveIntensity={glowIntensity}
                    />
                </mesh>
                {/* Glow layer */}
                <mesh
                    ref={upArrowGlowRef}
                    scale={[1.2, 1.2, 1.2]}
                    position={[0, 0, -0.001]}
                >
                    <shapeGeometry args={[createArrowShape()]} />
                    <meshBasicMaterial
                        color="#4a90e2"
                        transparent
                        opacity={glowIntensity}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </group>

            {/* Down Arrow with glow */}
            <group position={[-0.005, -0.075, 0.05]} rotation={[0, 0, Math.PI]}>
                {/* Main arrow */}
                <mesh ref={downArrowRef}>
                    <shapeGeometry args={[createArrowShape()]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        roughness={0.5}
                        metalness={0.1}
                        emissive="#e24a4a"
                        emissiveIntensity={glowIntensity}
                    />
                </mesh>
                {/* Glow layer */}
                <mesh
                    ref={downArrowGlowRef}
                    scale={[1.2, 1.2, 1.2]}
                    position={[0, 0, -0.001]}
                >
                    <shapeGeometry args={[createArrowShape()]} />
                    <meshBasicMaterial
                        color="#e24a4a"
                        transparent
                        opacity={glowIntensity}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </group>
        </group>
    );
};

export default CircularTouchPad;