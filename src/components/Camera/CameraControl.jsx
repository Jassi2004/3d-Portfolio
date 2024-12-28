
// // CameraControls.jsx
// import { useThree, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { useRef, useEffect } from 'react';
// import { useCamera } from './CameraContext';
// import { Vector3 } from 'three';

// export const CameraTransitionControls = () => {
//     const { defaultPosition, _setResetFunction } = useCamera();
//     const controls = useRef(null);
//     const { camera } = useThree();

//     const targetPosition = useRef(new Vector3());
//     const startPosition = useRef(new Vector3());
//     const isTransitioning = useRef(false);
//     const transitionStartTime = useRef(0);
//     const TRANSITION_DURATION = 1.5; // Duration in seconds

//     useEffect(() => {
//         if (camera) {
//             camera.position.copy(defaultPosition);
//             camera.lookAt(0, 0, 0);
//         }
//     }, [camera, defaultPosition]);

//     useFrame((state) => {
//         if (isTransitioning.current && controls.current) {
//             const elapsed = state.clock.getElapsedTime() - transitionStartTime.current;
//             const progress = Math.min(elapsed / TRANSITION_DURATION, 1);

//             // Smooth easing function
//             const eased = 1 - Math.pow(1 - progress, 3);

//             if (progress >= 1) {
//                 isTransitioning.current = false;
//                 camera.position.copy(targetPosition.current);
//             } else {
//                 // Interpolate position
//                 camera.position.lerpVectors(
//                     startPosition.current,
//                     targetPosition.current,
//                     eased
//                 );
//             }

//             camera.lookAt(0, 0, 0);
//             controls.current.update();
//         }
//     });

//     useEffect(() => {
//         const handleReset = (state) => {
//             if (controls.current) {
//                 isTransitioning.current = true;
//                 transitionStartTime.current = state.clock.getElapsedTime();
//                 startPosition.current.copy(camera.position);
//                 targetPosition.current.copy(defaultPosition);
//             }
//         };

//         _setResetFunction(() => handleReset);

//         return () => {
//             _setResetFunction(() => { });
//         };
//     }, [_setResetFunction, defaultPosition, camera]);

//     return (
//         <OrbitControls
//             ref={controls}
//             minDistance={1}
//             maxDistance={40}
//             enableDamping
//             dampingFactor={0.05}
//         />
//     );
// };



import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useCamera } from './CameraContext';
import { Vector3 } from 'three';

export const CameraTransitionControls = () => {
    const { defaultPosition, targetPosition, _setResetFunction } = useCamera();
    const controls = useRef(null);
    const { camera } = useThree();

    const startPosition = useRef(new Vector3());
    const isTransitioning = useRef(false);
    const transitionStartTime = useRef(0);
    const TRANSITION_DURATION = 1.5; // Duration in seconds

    useEffect(() => {
        if (camera) {
            camera.position.copy(defaultPosition);
            camera.lookAt(0, 0, 0);
        }
    }, [camera, defaultPosition]);

    useEffect(() => {
        // Trigger camera transition when `targetPosition` changes
        if (camera && targetPosition) {
            isTransitioning.current = true;
            transitionStartTime.current = performance.now() / 1000; // Current time in seconds
            startPosition.current.copy(camera.position);
        }
    }, [targetPosition, camera]);

    useFrame((state) => {
        if (isTransitioning.current && controls.current) {
            const elapsed = state.clock.getElapsedTime() - transitionStartTime.current;
            const progress = Math.min(elapsed / TRANSITION_DURATION, 1);

            // Smooth easing function
            const eased = 1 - Math.pow(1 - progress, 3);

            if (progress >= 1) {
                isTransitioning.current = false;
                camera.position.copy(targetPosition);
            } else {
                // Interpolate position
                camera.position.lerpVectors(
                    startPosition.current,
                    targetPosition,
                    eased
                );
            }

            camera.lookAt(0, 0, 0);
            controls.current.update();
        }
    });

    useEffect(() => {
        const handleReset = () => {
            if (controls.current) {
                isTransitioning.current = true;
                transitionStartTime.current = performance.now() / 1000;
                startPosition.current.copy(camera.position);
            }
        };

        _setResetFunction(() => handleReset);

        return () => {
            _setResetFunction(() => { });
        };
    }, [_setResetFunction, defaultPosition, camera]);

    return (
        <OrbitControls
            ref={controls}
            minDistance={1}
            maxDistance={40}
            enableDamping
            dampingFactor={0.05}
        />
    );
};
