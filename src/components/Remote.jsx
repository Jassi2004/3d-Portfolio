import { useGLTF, Text, Html } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppContext } from '../AppContext';
import HelperButtonSelect from './HelperButtonSelect';
import CircularTouchPad from './CircularTouchPad';

function Remote() {
    const { scene } = useGLTF('/assets/models/remote2.glb');
    const [scale] = useState({ x: 4, y: 4, z: 4 });
    const [position] = useState({ x: 1.5, y: 1, z: 0 });
    const [rotation] = useState({ x: 5.5, y: -.4, z: 0 });
    const { camera, gl } = useThree();
    const { state, setState } = useAppContext();
    const powerButtonRef = useRef(null);
    const glowRef = useRef(null);
    const [glowIntensity, setGlowIntensity] = useState(1);
    
    const [showLabel, setShowLabel] = useState(true); // New state to control label visibility

    useFrame(() => {
        setGlowIntensity((Math.sin(Date.now() * 0.005) + 1) * 0.8 + 0.2);
        if (powerButtonRef.current) {
            powerButtonRef.current.material.emissiveIntensity = glowIntensity;
        }
    });

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                if (child.name === "Power_button_Frame_logo_0") {
                    powerButtonRef.current = child;
                    child.material.emissive = new THREE.Color('red');
                    child.material.emissiveIntensity = glowIntensity;
                    child.material.emissiveDepthTest = false;

                    const glowMaterial = new THREE.MeshBasicMaterial({
                        color: new THREE.Color('red'),
                        emissive: new THREE.Color('red'),
                        emissiveIntensity: 1,
                        side: THREE.BackSide,
                        transparent: true,
                        opacity: 1,
                    });

                    const glowMesh = new THREE.Mesh(child.geometry, glowMaterial);
                    glowMesh.scale.set(4, 4, 4);
                    glowMesh.position.copy(child.position);
                    glowMesh.rotation.copy(child.rotation);
                    glowRef.current = glowMesh;
                    scene.add(glowMesh);
                }
            }
        });

        // Automatically hide label after a delay (optional)
        const labelTimeout = setTimeout(() => {
            setShowLabel(false);
        }, 5000); // Hide after 5 seconds

        return () => {
            if (glowRef.current) {
                scene.remove(glowRef.current);
            }
            clearTimeout(labelTimeout);
        };
    }, [scene]);

    const handlePointerDown = (event) => {
        const intersects = getIntersections(event);
        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            if (clickedObject.name === "Power_button_Frame_logo_0") {
                console.log('Power Button clicked!');
                setState(prev => ({ ...prev, isTvOn: !state.isTvOn }));
            }
        }
    };

    const getIntersections = (event) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const { offsetX, offsetY } = event.nativeEvent;

        mouse.x = (offsetX / gl.domElement.clientWidth) * 2 - 1;
        mouse.y = -(offsetY / gl.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);
        return intersects;
    };

    return (
        <group
            position={[position.x, position.y, position.z]}
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={[scale.x, scale.y, scale.z]}
            onPointerDown={handlePointerDown}
        >
            <primitive object={scene} />
            <CircularTouchPad position={[-0.019, 0.205, 0.1]} />
            <HelperButtonSelect position={[-0.019, 0.205, 0.1]} />

            {/* Floating label above remote */}
            {showLabel && (
                <Text
                    position={[0, .5, 0]} // Adjust height above remote
                    fontSize={0.05}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineColor="black"
                    outlineWidth={0.005}
                >
                    Click Buttons on the remote
                </Text>
            )}

            {/* Optional Html label for more styled UI */}
            {/* {showLabel && (
                <Html position={[0, 1.2, 0]} center>
                    <div style={{
                        background: 'rgba(0,0,0,0.7)',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '14px',
                        animation: 'pulse 1s infinite'
                    }}>
                        Click Buttons to Interact
                    </div>
                </Html>
            )} */}
        </group>
    );
}

export default Remote;
