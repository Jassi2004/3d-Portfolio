import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import { useAppContext } from "../AppContext";

useGLTF.preload('/assets/models/Character.glb');

const renameBones = (armature) => {
    if (!armature) return;
    armature.traverse((obj) => {
        if (obj.isBone && !obj.name.startsWith('mixamorig')) {
            obj.name = 'mixamorig' + obj.name;
        }
    });
};

const characterStates = {
    relax: {
        animationPath: "/assets/animations/relax.fbx",
        position: { x: 0, y: 0.2, z: 2.4 },
        rotation: [0, 3, 0],
    },
    walking: {
        animationPath: "/assets/animations/Walking.fbx",
        position: { x: 7, y: 0.2, z: -1 },
        rotation: [0, 5, 0],
    },
    standToSit: {
        animationPath: "/assets/animations/StandToSit.fbx",
        position: { x: 0, y: 0.2, z: 1.5 },
        rotation: [0, 3, 0],
    },
    idle: {
        animationPath: "/assets/animations/Idle.fbx",
        position: { x: 7, y: 0.2, z: -1 },
        rotation: [0, 5.5, 5],
    },
};

export default function Character({ scale = { x: 1.7, y: 1.7, z: 1.7 } }) {
    const group = useRef();
    const bonesRenamed = useRef(false);
    const { state } = useAppContext();
    const lastRotation = useRef(null);

    // Get current character state with fallback to idle
    const currentState = characterStates[state.activeCharacter] || characterStates.idle;

    // Load character model
    const { nodes, materials } = useGLTF("/assets/models/Character.glb");

    // Load animation based on current state
    const { animations } = useFBX(currentState.animationPath);
    const animation = animations[0];
    animation.name = "animation";

    // Setup animations
    const { actions } = useAnimations([animation], group);

    // Handle bone renaming
    useEffect(() => {
        if (!bonesRenamed.current && nodes.Hips) {
            renameBones(nodes.Hips);
            bonesRenamed.current = true;
        }
    }, [nodes]);

    // Handle animation changes
    useEffect(() => {
        if (!bonesRenamed.current) return;

        Object.values(actions).forEach((action) => action?.stop());
        actions.animation?.reset().play();

        return () => {
            Object.values(actions).forEach((action) => action?.stop());
        };
    }, [actions, state.activeCharacter]);

    // Handle rotation updates with persistence
    useEffect(() => {
        if (group.current) {
            // Store the last rotation when changing states
            lastRotation.current = currentState.rotation;

            // Apply rotation
            group.current.rotation.set(...lastRotation.current);
        }
    }, [currentState]);

    // Ensure rotation is maintained after component remounts
    useEffect(() => {
        if (group.current && lastRotation.current) {
            group.current.rotation.set(...lastRotation.current);
        }
    }, []);

    if (!bonesRenamed.current) return null;

    return (
        <group
            ref={group}
            position={[currentState.position.x, currentState.position.y, currentState.position.z]}
            scale={[scale.x, scale.y, scale.z]}
            rotation={currentState.rotation}
        >
            <primitive object={nodes.Hips} />
            {/* Rest of the mesh components remain the same */}
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


// Update PropTypes to only include scale since that's the only prop we're using now
Character.propTypes = {
    scale: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        z: PropTypes.number,
    }),
};