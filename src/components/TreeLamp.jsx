import { GUI } from 'lil-gui';
import { useGLTF } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';

function TreeLamp({ isDarkMode = false }) {
    const { scene } = useGLTF('/assets/models/TreeLamp.glb');
    const [scale, setScale] = useState({ x: .12, y: .12, z: .12 });
    const [position, setPosition] = useState({ x: 0, y: .87, z: -1 });
    const spotlightRef = useRef();

    // TreeLamp screen glow effect
    const screenLightColor = isDarkMode ? "#4ca6ff" : "#ffffff";
    const screenLightIntensity = isDarkMode ? 2 : 0;

    return (
        <>
            <primitive
                object={scene}
                scale={[scale.x, scale.y, scale.z]}
                position={[position.x, position.y, position.z]}
            />
            <spotLight
                ref={spotlightRef}
                color={screenLightColor}
                intensity={screenLightIntensity}
                position={[position.x, position.y + 1, position.z]} // Positioned above the lamp
                angle={Math.PI / 6}
                penumbra={0.5}
                castShadow
            />
        </>
    );
}

export default TreeLamp;