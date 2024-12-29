/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { useAppContext } from '../AppContext';

function Remote() {
    const { scene } = useGLTF('/assets/models/tv_remote.glb');
    const [scale] = useState({ x: .2, y: 0.2, z: .2 });
    const [position] = useState({ x: 1.5, y: 1, z: 0 });
    const [rotation] = useState({ x: .5, y: 0, z: .5 });

    return (
        <group
            position={[position.x, position.y, position.z]}
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={[scale.x, scale.y, scale.z]}
        >
            <primitive object={scene} />

        </group>
    );
}

export default Remote;