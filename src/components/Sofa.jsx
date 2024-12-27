import { GUI } from 'lil-gui';
import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';


function Sofa() {
    const { scene } = useGLTF('/assets/models/sofa2.glb'); // Correct path
    const [scale, setScale] = useState({ x: 1, y: 1, z: 1 });
    const [position, setPosition] = useState({ x: 0, y: -.8, z: 5 });
    const sofaRef = useRef();


    useEffect(() => {
        const gui = new GUI();
        if (sofaRef.current) {
            sofaRef.current.rotation.y = Math.PI; // Rotate 180 degrees (to face the back)
        }

        // Add scale controls
        const scaleFolder = gui.addFolder('Sofa Scale');
        scaleFolder.add(scale, 'x', 0.1, 3).onChange(value => {
            setScale(prev => ({ ...prev, x: value }));
        });
        scaleFolder.add(scale, 'y', 0.1, 3).onChange(value => {
            setScale(prev => ({ ...prev, y: value }));
        });
        scaleFolder.add(scale, 'z', 0.1, 3).onChange(value => {
            setScale(prev => ({ ...prev, z: value }));
        });

        // Add position controls
        const positionFolder = gui.addFolder('Sofa Position');
        positionFolder.add(position, 'x', -10, 10).onChange(value => {
            setPosition(prev => ({ ...prev, x: value }));
        });
        positionFolder.add(position, 'y', 0, 10).onChange(value => {
            setPosition(prev => ({ ...prev, y: value }));
        });
        positionFolder.add(position, 'z', -10, -1).onChange(value => {
            setPosition(prev => ({ ...prev, z: value }));
        });

        return () => gui.destroy();
    }, [scale, position]);

    return (
        <>

            < primitive
                ref={sofaRef}
                object={scene}
                scale={[scale.x, scale.y, scale.z]}
                position={[position.x, position.y, position.z]}
            />
        </>
    );
}

export default Sofa;
