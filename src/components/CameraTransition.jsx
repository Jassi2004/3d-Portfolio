// First, create a new component called CameraTransition.jsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { useAppContext } from "../AppContext";
import { DEFAULT_CAMERA } from "../constants";

const CameraTransition = () => {
    const { camera } = useThree();
    const { state } = useAppContext();

    useEffect(() => {
        const targetPosition = new THREE.Vector3(...DEFAULT_CAMERA.position);
        const startPosition = new THREE.Vector3();

        startPosition.copy(camera.position);

        const duration = 1000;
        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easing = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            camera.position.lerpVectors(startPosition, targetPosition, easing);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        if (
            state.camera.position[0] === DEFAULT_CAMERA.position[0] &&
            state.camera.position[1] === DEFAULT_CAMERA.position[1] &&
            state.camera.position[2] === DEFAULT_CAMERA.position[2]
        ) {
            animate();
        }
    }, [camera, state.camera]);


    return null;
};

export default CameraTransition;