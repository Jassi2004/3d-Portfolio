import { GUI } from 'lil-gui';
import { useGLTF, useHelper } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { AxesHelper, GridHelper, DirectionalLightHelper } from 'three';

function FairyLight({ isDarkMode = false }) {
    const { scene } = useGLTF('/assets/models/FairyLight1.glb');
    const [scale, setScale] = useState({ x: 2, y: 2, z: 2 });
    const [position, setPosition] = useState({ x: -2, y: 4.8, z: 0 });
    const [rotation, setRotation] = useState({ x: Math.PI / 4, y: Math.PI / 4, z: 0 });
    const spotlightRef = useRef();

    // FairyLight screen glow effect
    const screenLightColor = isDarkMode ? "#4ca6ff" : "#ffffff";
    const screenLightIntensity = isDarkMode ? 2 : 0;

    useEffect(() => {
        // GUI controls
        const gui = new GUI();
        const folder = gui.addFolder('FairyLight Controls');
        folder.add(position, 'x', -20, 20).onChange(() => setPosition({ ...position }));
        folder.add(position, 'y', -20, 20).onChange(() => setPosition({ ...position }));
        folder.add(position, 'z', -20, 20).onChange(() => setPosition({ ...position }));
        folder.add(rotation, 'x', 0, Math.PI * 2).onChange(() => setRotation({ ...rotation }));
        folder.add(rotation, 'y', 0, Math.PI * 2).onChange(() => setRotation({ ...rotation }));
        folder.add(rotation, 'z', 0, Math.PI * 2).onChange(() => setRotation({ ...rotation }));
        folder.add(scale, 'x', 0.1, 5).onChange(() => setScale({ ...scale }));
        folder.add(scale, 'y', 0.1, 5).onChange(() => setScale({ ...scale }));
        folder.add(scale, 'z', 0.1, 5).onChange(() => setScale({ ...scale }));
        folder.open();

        return () => gui.destroy();
    }, [position, rotation, scale]);

    return (
        <>
            {/* Model */}
            <primitive
                object={scene}
                scale={[scale.x, scale.y, scale.z]}
                position={[position.x, position.y, position.z]}
                rotation={[rotation.x, rotation.y, rotation.z]}
            />

            {/* Axes Helper */}
            <axesHelper args={[5]} />

            {/* Grid Helper */}
            <gridHelper args={[20, 20]} />
        </>
    );
}

export default FairyLight;
