import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function AnimatedOrbitControls({ minDistance, maxDistance }) {
    const controlsRef = useRef();
    const { camera } = useThree();
    const [isAnimating, setIsAnimating] = useState(false);

    // Default camera position and target
    const defaultPosition = new THREE.Vector3(0, 4, 10);
    const defaultTarget = new THREE.Vector3(0, 0, 0);

    // Animation settings
    const animationDuration = 0.5; // Reduced from 1 to 0.5 seconds
    const animationDelay = 1; // seconds of inactivity before returning
    const lerpFactor = 0.08; // Increased from 0.02 to 0.08 for faster movement
    let lastInteractionTime = Date.now();

    // Handle user interaction
    const handleChange = () => {
        lastInteractionTime = Date.now();
        if (isAnimating) {
            setIsAnimating(false);
        }
    };

    // Animation frame loop
    useFrame(() => {
        if (!controlsRef.current) return;

        const timeSinceLastInteraction = (Date.now() - lastInteractionTime) / 1000;

        if (timeSinceLastInteraction > animationDelay && !isAnimating) {
            setIsAnimating(true);
        }

        if (isAnimating) {
            const currentPosition = camera.position;
            const currentTarget = controlsRef.current.target;

            // Calculate progress with improved easing
            const progress = Math.min(
                (timeSinceLastInteraction - animationDelay) / animationDuration,
                1
            );

            // Enhanced easing function for smoother acceleration and deceleration
            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
            const eased = easeOutQuart(progress);

            // Apply eased interpolation
            camera.position.lerp(defaultPosition, lerpFactor * eased);
            controlsRef.current.target.lerp(defaultTarget, lerpFactor * eased);
            controlsRef.current.update();

            // More generous threshold for completion
            if (
                currentPosition.distanceTo(defaultPosition) < 0.05 &&
                currentTarget.distanceTo(defaultTarget) < 0.05
            ) {
                camera.position.copy(defaultPosition);
                controlsRef.current.target.copy(defaultTarget);
                setIsAnimating(false);
                lastInteractionTime = Date.now();
            }
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            minDistance={minDistance}
            maxDistance={maxDistance}
            enableDamping
            dampingFactor={0.05} // Added damping factor for smoother movement
            onChange={handleChange}
            onStart={handleChange}
        />
    );
}

export default AnimatedOrbitControls;