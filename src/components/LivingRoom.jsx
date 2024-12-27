/* eslint-disable react/no-unknown-property */

import { useGLTF } from "@react-three/drei";

function LivingRoom() {
    // Replace this URL with your actual model URL
    const { scene: modelScene } = useGLTF("/assets/models/livingRoom.glb");

    return (
        <primitive
            object={modelScene}
            scale={[.4, .4, .4]}  // Adjust scale if needed
            position={[0, 0, 0]}  // Adjust position if needed
            rotation={[0, 0, 0]}  // Adjust rotation if needed
        />
    );
}

export default LivingRoom;