import { GUI } from 'lil-gui';
import { useGLTF } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';

function Character({ isDarkMode = false }) {
    const { scene } = useGLTF('/assets/models/Character.glb');
    const [scale, setScale] = useState({ x: 1.7, y: 1.7, z: 1.7 });
    // dont change the y position 
    const [position, setPosition] = useState({ x: 7, y: .3, z: -1 });
    const spotlightRef = useRef();
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
                position={[position.x, position.y + 1, position.z]}
                angle={Math.PI / 6}
                penumbra={0.5}
                castShadow
            />
        </>
    );
}

export default Character;