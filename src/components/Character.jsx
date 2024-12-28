import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useAppContext } from "../AppContext";
import { useFrame } from "@react-three/fiber";

export default function Character(props) {
    const { nodes, materials } = useGLTF("/assets/models/Character.glb");
    const group = useRef();
    const startPosition = { x: 6, y: 0.3, z: -0.5 };
    const targetPosition = { x: 2, y: 0.3, z: -0.5 }; // Final position after walking
    const positionRef = useRef({ ...startPosition });
    const walkingRef = useRef(false);

    // Load animations
    const { animations } = useFBX("/assets/animations/Walking.fbx");
    const { animations: animationsSitting } = useFBX("/assets/animations/StandToSit.fbx");
    const { animations: animationsIdle } = useFBX("/assets/animations/Idle.fbx");
    const { animations: animationAim } = useFBX("/assets/animations/Aim.fbx");
    const { animations: animationRelax } = useFBX("/assets/animations/relax.fbx");

    const idleAnimation = animationsIdle[0];
    const walkingAnimation = animations[0];
    const sittingAnimation = animationsSitting[0];
    const aimAnimation = animationAim[0];
    const relaxAnimation = animationRelax[0];

    // Rename the animations for clarity
    idleAnimation.name = "idle";
    walkingAnimation.name = "walking";
    sittingAnimation.name = "sitting";
    aimAnimation.name = "aim";
    relaxAnimation.name = "relax";

    useEffect(() => {
        // Rename the bones to match animation
        if (nodes.Hips) {
            const armature = nodes.Hips;
            armature.traverse((obj) => {
                if (obj.isBone) {
                    obj.name = 'mixamorig' + obj.name;
                }
            });
        }
    }, [nodes]);

    const { actions } = useAnimations([idleAnimation, walkingAnimation, sittingAnimation, aimAnimation], group);
    const { state, setState } = useAppContext();

    // Handle movement during walking animation
    useFrame((state, delta) => {
        if (walkingRef.current) {
            // Calculate total distance to move
            const totalDistance = startPosition.x - targetPosition.x;
            // Calculate how much to move this frame based on remaining time
            const moveSpeed = totalDistance / 1.5; // 1.5 seconds duration
            const movement = moveSpeed * delta;

            // Update position
            if (positionRef.current.x > targetPosition.x) {
                positionRef.current.x -= movement;
                // Prevent overshooting
                if (positionRef.current.x < targetPosition.x) {
                    positionRef.current.x = targetPosition.x;
                }
            }

            // Update group position
            if (group.current) {
                group.current.position.x = positionRef.current.x;
                group.current.position.y = positionRef.current.y;
                group.current.position.z = positionRef.current.z;
            }
        }
    });

    useEffect(() => {
        // Stop all animations first
        const stopAllAnimations = () => {
            Object.values(actions).forEach(action => action?.stop());
        };

        // if (state.animationState === "relax") {
        //     stopAllAnimations();
        //     actions.idle?.reset().play();
        //     walkingRef.current = false;
        // }

        if (state.animationState === "idle") {
            stopAllAnimations();
            actions.idle?.reset().play();
            walkingRef.current = false;
        }
        else if (state.animationState === "walking") {
            stopAllAnimations();
            actions.walking?.reset().play();
            walkingRef.current = true;

            // After walking for 1.5 seconds, transition to sitting
            setTimeout(() => {
                walkingRef.current = false;
                setState(prev => ({ ...prev, animationState: "sitting" }));
            }, 1500);
        }
        else if (state.animationState === "sitting") {
            stopAllAnimations();
            actions.sitting?.reset().play();
            walkingRef.current = false;

            // After sitting animation completes
            setTimeout(() => {
                setState(prev => ({ ...prev, animationState: "aiming" }));
            }, 2000);
        }
        else if (state.animationState === "aiming") {
            stopAllAnimations();
            actions.aim?.reset().play();
            walkingRef.current = false;
        }
    }, [state.animationState, actions, setState]);

    const scale = { x: 1.7, y: 1.7, z: 1.7 };

    return (
        <group {...props} dispose={null} ref={group}
            position={[positionRef.current.x, positionRef.current.y, positionRef.current.z]}
            scale={[scale.x, scale.y, scale.z]}
            rotation={[0, -Math.PI / 2, 0]}>
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