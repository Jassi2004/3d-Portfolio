import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/three';

export function CameraController({ position, target }) {
    const cameraRef = useRef();

    // Use spring to interpolate position and target
    const [{ animatedPosition, animatedTarget }, api] = useSpring(() => ({
        animatedPosition: position.toArray(),
        animatedTarget: target.toArray(),
        config: { mass: 1, tension: 120, friction: 40 },
    }));

    useEffect(() => {
        api.start({
            animatedPosition: position.toArray(),
            animatedTarget: target.toArray(),
        });
    }, [position, target, api]);

    useFrame(({ camera }) => {
        if (!cameraRef.current) {
            cameraRef.current = camera;
        }

        // Update camera position smoothly
        const [x, y, z] = animatedPosition.get();
        camera.position.set(x, y, z);

        // Update camera target smoothly
        const [tx, ty, tz] = animatedTarget.get();
        camera.lookAt(tx, ty, tz);
    });

    return null;
}