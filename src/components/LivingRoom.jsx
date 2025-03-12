import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";

// Preload the model
useGLTF.preload("/assets/models/livingRoom.glb");

function LivingRoomModel() {
    const model = useGLTF("/assets/models/livingRoom.glb", true, true);

    useEffect(() => {
        // Cleanup function
        return () => {
            if (model) {
                Object.values(model).forEach(value => {
                    if (value?.dispose) {
                        value.dispose();
                    }
                });
            }
        };
    }, [model]);

    // Error handling
    if (!model) {
        console.error("Failed to load living room model");
        return null;
    }

    return (
        <primitive
            object={model.scene}
            scale={[0.4, 0.4, 0.4]}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            dispose={null}
        />
    );
}

// Fallback component while loading
function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="gray" wireframe />
        </mesh>
    );
}

// Main component with error boundary
function LivingRoom() {
    return (
        // <Suspense fallback={<LoadingFallback />}>
            <LivingRoomModel />
        // </Suspense>
    );
}

export default LivingRoom;