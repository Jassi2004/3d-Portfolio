import { GUI } from 'lil-gui';
import { useGLTF } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';

function Lamp({ isDarkMode = false }) {
    const { scene } = useGLTF('/assets/models/lamp1.glb');
    const [scale, setScale] = useState({ x: .02, y: .02, z: .02 });
    const [position, setPosition] = useState({ x: 0, y: 6, z: -3 });


    return (
        <>
            <primitive
                object={scene}
                scale={[scale.x, scale.y, scale.z]}
                position={[position.x, position.y, position.z]}
            />
        </>
    );
}

export default Lamp;