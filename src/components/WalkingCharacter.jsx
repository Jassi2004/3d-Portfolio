import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useAppContext } from "../AppContext";
import { useFrame } from "@react-three/fiber";

export default function WalkingCharacter(props) {
    const { nodes, materials } = useGLTF("/assets/models/Character.glb");
    const group = useRef();
    const positionRef = useRef({ x: 7, y: .2, z: -1 });

    // Load animations
    const { animations: animationsWalk } = useFBX("/assets/animations/Walking.fbx");
    const walkAnimation = animationsWalk[0];

    // Rename animation for clarity
    walkAnimation.name = "walk";

    useEffect(() => {
        // Rename bones to match animation
        if (nodes.Hips) {
            const armature = nodes.Hips;
            armature.traverse((obj) => {
                if (obj.isBone) {
                    obj.name = 'mixamorig' + obj.name;
                }
            });
        }
    }, [nodes]);

    const { actions } = useAnimations([walkAnimation], group);
    const { state, setState } = useAppContext();

    useEffect(() => {
        // Stop all other animations and play relax
        const stopAllAnimations = () => {
            Object.values(actions).forEach(action => action?.stop());
        };

        stopAllAnimations();
        actions.walk?.reset().play(); // Play the relax animation
    }, [actions]);

    const scale = { x: 1.7, y: 1.7, z: 1.7 };

    return (
        <group
            {...props}
            dispose={null}
            ref={group}
            position={[positionRef.current.x, positionRef.current.y, positionRef.current.z]} // Adjust position
            scale={[scale.x, scale.y, scale.z]} // Scale the model
            rotation={[0, 5, 0]} // Adjust rotation if needed
        >
            <primitive object={nodes.Hips} />
            <skinnedMesh
                name="EyeLeft"
                geometry={nodes.EyeLeft.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeLeft.skeleton}
                morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            />
            <skinnedMesh
                name="EyeRight"
                geometry={nodes.EyeRight.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeRight.skeleton}
                morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Head"
                geometry={nodes.Wolf3D_Head.geometry}
                material={materials.Wolf3D_Skin}
                skeleton={nodes.Wolf3D_Head.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Teeth"
                geometry={nodes.Wolf3D_Teeth.geometry}
                material={materials.Wolf3D_Teeth}
                skeleton={nodes.Wolf3D_Teeth.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Hair.geometry}
                material={materials.Wolf3D_Hair}
                skeleton={nodes.Wolf3D_Hair.skeleton}
            />
            <skinnedMesh
                name="Wolf3D_Beard"
                geometry={nodes.Wolf3D_Beard.geometry}
                material={materials.Wolf3D_Beard}
                skeleton={nodes.Wolf3D_Beard.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Beard.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Beard.morphTargetInfluences}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Body.geometry}
                material={materials.Wolf3D_Body}
                skeleton={nodes.Wolf3D_Body.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                material={materials.Wolf3D_Outfit_Bottom}
                skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                material={materials.Wolf3D_Outfit_Footwear}
                skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Top.geometry}
                material={materials.Wolf3D_Outfit_Top}
                skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            />
        </group>
    );
}

useGLTF.preload('/assets/models/Character.glb');
