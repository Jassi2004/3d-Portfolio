import { useGLTF } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three'; // Import THREE.js
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
    const glowRef = useRef(null); // Reference for glow mesh

    const [glowIntensity, setGlowIntensity] = useState(1); // Initial glow intensity

    // Animate the glow effect
    useFrame(() => {
        // Oscillate the glow intensity to make it pulse dramatically
        setGlowIntensity((Math.sin(Date.now() * 0.005) + 1) * 0.8 + 0.2); // Smooth oscillation between 0.2 and 1.0
        if (powerButtonRef.current) {
            powerButtonRef.current.material.emissiveIntensity = glowIntensity; // Apply to power button
        }
    });

    useEffect(() => {
        // Traverse the model and set up glow
        scene.traverse((child) => {
            if (child.isMesh) {
                if (child.name === "Power_button_Frame_logo_0") {
                    powerButtonRef.current = child; // Assign power button mesh to the ref

                    // Set the emissive property to make the button glow
                    child.material.emissive = new THREE.Color('red'); // Glow color
                    child.material.emissiveIntensity = glowIntensity; // Set initial glow intensity
                    child.material.emissiveDepthTest = false; // Prevent emissive from being occluded by other objects

                    // Create a glowing outline effect by duplicating the mesh and scaling it up
                    const glowMaterial = new THREE.MeshBasicMaterial({
                        color: new THREE.Color('red'),
                        emissive: new THREE.Color('red'),
                        emissiveIntensity: 1,
                        side: THREE.BackSide, // Hollow effect (glow on the outside)
                        transparent: true,
                        opacity: 1, // Increased opacity for a stronger glow effect
                    });

                    const glowMesh = new THREE.Mesh(child.geometry, glowMaterial);
                    glowMesh.scale.set(4, 4, 4); // Make the glow mesh much larger for a dramatic effect
                    glowMesh.position.copy(child.position);
                    glowMesh.rotation.copy(child.rotation);
                    glowRef.current = glowMesh; // Store the glow mesh in the reference
                    scene.add(glowMesh); // Add the glow mesh to the scene
                }
            }
        });

        return () => {
            if (glowRef.current) {
                scene.remove(glowRef.current); // Clean up the glow mesh when the component is unmounted
            }
        };
    }, [scene]);

    // Handle click interaction using raycasting
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

    // Raycasting helper function to get intersected objects
    const getIntersections = (event) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const { offsetX, offsetY } = event.nativeEvent;

        mouse.x = (offsetX / gl.domElement.clientWidth) * 2 - 1;
        mouse.y = -(offsetY / gl.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera); // Set the raycaster based on the camera and mouse

        const intersects = raycaster.intersectObjects(scene.children, true); // Use true to traverse the entire hierarchy
        return intersects;
    };

    return (
        <group
            position={[position.x, position.y, position.z]}
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={[scale.x, scale.y, scale.z]}
            onPointerDown={handlePointerDown} // Handle pointer down event on the whole group
        >
            <primitive object={scene} />
            <CircularTouchPad position={[-0.019, 0.205, 0.1]} />
            <HelperButtonSelect position={[-0.019, 0.205, 0.1]} />
        </group>
    );
}

export default Remote;
