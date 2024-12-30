/* eslint-disable react/no-unknown-property */
import { useGLTF, Text, GradientTexture } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Tv() {
    const { state } = useAppContext();
    const { isDarkMode, isTvOn, currentChannel } = state;
    const { scene } = useGLTF('/assets/models/tv1.glb');
    const [scale] = useState({ x: 4.8, y: 3.5, z: 4 });
    const [position] = useState({ x: -12.3, y: 4.8, z: -5 });
    const [showChannelInfo, setShowChannelInfo] = useState(false);
    const [hoverChannel, setHoverChannel] = useState(null);
    const [animationProgress, setAnimationProgress] = useState(0);

    const backlightWidth = 5.4;
    const backlightHeight = 2.2;

    // Updated channel box dimensions for a more cinematic feel
    const channelBoxWidth = 2.2;
    const channelBoxHeight = 0.4;
    const gridSpacing = 0.3;
    const gridColumns = 2;

    // Enhanced channel data with more visual properties
    const channels = [
        { number: 1, name: "Resume", color: "#4ca6ff", hoverColor: "#7dbeff" },
        { number: 2, name: "Education", color: "#4ca6ff", hoverColor: "#7dbeff" },
        { number: 3, name: "Projects", color: "#4ca6ff", hoverColor: "#7dbeff" },
        { number: 4, name: "Experience", color: "#4ca6ff", hoverColor: "#7dbeff" },
        { number: 5, name: "Accomplishments", color: "#4ca6ff", hoverColor: "#7dbeff" },
        { number: 6, name: "Skills", color: "#4ca6ff", hoverColor: "#7dbeff" }
    ];

    const getCurrentChannelInfo = () => {
        return channels.find(channel => channel.number === currentChannel) || channels[0];
    };

    useEffect(() => {
        if (isTvOn) {
            console.log("Current Channel in TV component:", currentChannel);
        }
    }, [currentChannel, isTvOn]);  // Dependency array ensures it's logged whenever currentChannel changes


    useEffect(() => {
        if (isTvOn) {
            setShowChannelInfo(true);
            setAnimationProgress(0);
        }
    }, [isTvOn]);

    // Animation frame for smooth transitions
    useFrame((state, delta) => {
        if (isTvOn && animationProgress < 1) {
            setAnimationProgress(prev => Math.min(prev + delta * 2, 1));
        }
    });

    const getIntensities = () => {
        if (!isTvOn) return {
            emissive: 0,
            opacity: 0,
            glowOpacity: 0,
            pointLight: 0,
            spotLight: 0
        };

        const isChangeChannelPerspective = state.currentPerspective === 'changeChannelPerspective';

        if (isDarkMode) {
            return isChangeChannelPerspective ? {
                emissive: state.tvEmissiveIntensity - 0.5, // Adjust as needed
                opacity: 0.6, // Lower opacity for this perspective in dark mode
                glowOpacity: 0.8,
                pointLight: 6,
                spotLight: 1.5
            } : {
                emissive: state.tvEmissiveIntensity + 0.5,
                opacity: 0.8,
                glowOpacity: 1,
                pointLight: 8,
                spotLight: 2
            };
        } else {
            return isChangeChannelPerspective ? {
                emissive: state.tvEmissiveIntensity + 2, // Adjust as needed
                opacity: 0.9, // Higher opacity for this perspective in light mode
                glowOpacity: 1,
                pointLight: 7,
                spotLight: 2.5
            } : {
                emissive: state.tvEmissiveIntensity + 3,
                opacity: 1,
                glowOpacity: 1,
                pointLight: 8,
                spotLight: 3
            };
        }
    };

    const darkenColor = (colorHex, factor) => {
        const color = new THREE.Color(colorHex);
        color.multiplyScalar(factor);  // This will reduce the RGB values by the factor
        return color;
    };

    const intensities = getIntensities();
    const currentChannelInfo = getCurrentChannelInfo();

    // Enhanced Channel Grid Component with animations and hover effects
    const ChannelGrid = () => {
        return (
            <group position={[1.1, 3.2, position.z + 0.3]}>
                {channels.map((channel, index) => {
                    const row = Math.floor(index / gridColumns);
                    const col = index % gridColumns;
                    const xOffset = (col - 1) * (channelBoxWidth + gridSpacing);
                    const yOffset = -row * (channelBoxHeight + gridSpacing);
                    const isSelected = channel.number === currentChannel;
                    const isHovered = channel.number === hoverChannel;

                    // Calculate animation offsets
                    const entranceDelay = index * 0.1;
                    const animationOffset = Math.max(0, Math.min(1, (animationProgress - entranceDelay) * 2));
                    const yAnimation = (1 - animationOffset) * 0.5;
                    const opacityAnimation = animationOffset;

                    return (
                        <group
                            key={channel.number}
                            position={[xOffset, yOffset - yAnimation, 0]}
                            onPointerOver={() => setHoverChannel(channel.number)}
                            onPointerOut={() => setHoverChannel(null)}
                        >
                            {/* Glow effect for selected channel */}

                            {isSelected && (
                                <>
                                    {/* Outer glow border */}
                                    <mesh position={[0, 0, -0.15]}>
                                        <planeGeometry args={[channelBoxWidth + 0.1, channelBoxHeight + 0.1]} />
                                        <meshBasicMaterial
                                            color={
                                                state.currentPerspective === 'changeChannelPerspective' && !isDarkMode
                                                    ? darkenColor(currentChannelInfo.color, 5) // Darken color for light mode in changeChannelPerspective
                                                    : currentChannelInfo.color
                                            }
                                            transparent={true}
                                            opacity={
                                                state.currentPerspective === 'changeChannelPerspective'
                                                    ? (isDarkMode ? 0.5 : 1) // Dark mode and light mode adjustments
                                                    : 0.4 // Default opacity for other views
                                            }
                                            blending={THREE.AdditiveBlending}
                                        />
                                    </mesh>

                                    {/* Inner glow */}
                                    <mesh position={[0, 0, -0.1]}>
                                        <planeGeometry args={[channelBoxWidth + 0.1, channelBoxHeight + 0.1]} />
                                        <meshBasicMaterial
                                            color={
                                                state.currentPerspective === 'changeChannelPerspective' && !isDarkMode
                                                    ? darkenColor(currentChannelInfo.color, 5) // Darken color for light mode in changeChannelPerspective
                                                    : currentChannelInfo.color
                                            }
                                            transparent={true}
                                            opacity={
                                                state.currentPerspective === 'changeChannelPerspective'
                                                    ? (isDarkMode ? 0.7 : 0.9) // Dark mode and light mode adjustments
                                                    : 0.6 // Default opacity for other views
                                            }
                                            blending={THREE.AdditiveBlending}
                                        />
                                    </mesh>
                                </>
                            )}

                            {/* Channel box background */}
                            <mesh position={[0, 0, -0.05]}>
                                <planeGeometry args={[channelBoxWidth, channelBoxHeight]} />
                                <meshBasicMaterial
                                    color={isSelected ? currentChannelInfo.color : "#1a1a1a"}
                                    transparent={true}
                                    opacity={isSelected ? 0.95 : 0.7 * opacityAnimation}
                                />
                            </mesh>

                            {/* Text elements with enhanced visibility */}
                            <Text
                                position={[-0.9, 0, 0]}
                                fontSize={0.18}
                                color={isSelected ? '#ffffff' : (isHovered ? channel.hoverColor : '#666666')}
                                anchorX="center"
                                anchorY="middle"
                                opacity={opacityAnimation}
                                style={{ fontFamily: 'Inter' }}
                                outlineWidth={isSelected ? 0.005 : 0}
                                outlineColor="#000000"
                            >
                                {channel.number}
                            </Text>

                            <Text
                                position={[-0.5, 0, 0]}
                                fontSize={0.16}
                                color={isSelected ? '#ffffff' : (isHovered ? '#ffffff' : '#ffffff')}
                                anchorX="left"
                                anchorY="middle"
                                opacity={opacityAnimation}
                                style={{ fontFamily: 'Inter' }}
                                outlineWidth={isSelected ? 0.005 : 0}
                                outlineColor="#000000"
                            >
                                {channel.name}
                            </Text>

                            {/* Enhanced selection indicator (circle) */}
                            {isSelected && (
                                <>
                                    {/* Outer glow for circle */}
                                    <mesh position={[-0.9, 0, -0.02]}>
                                        <circleGeometry args={[0.18, 32]} />
                                        <meshBasicMaterial
                                            color={currentChannelInfo.color}
                                            transparent={true}
                                            opacity={0.4}
                                            blending={THREE.AdditiveBlending}
                                        />
                                    </mesh>
                                    {/* Main circle */}
                                    <mesh position={[-0.9, 0, 0]}>
                                        <circleGeometry args={[0.15, 32]} />
                                        <meshBasicMaterial
                                            color={currentChannelInfo.color}
                                            transparent={true}
                                            opacity={0.9}
                                        />
                                    </mesh>
                                </>
                            )}
                        </group>
                    );
                })}
            </group>
        );
    };

    return (
        <>
            <primitive
                object={scene}
                scale={[scale.x, scale.y, scale.z]}
                position={[position.x, position.y, position.z]}
            />

            {/* Enhanced TV Screen with subtle gradient */}
            <mesh position={[-0.05, 2.4, position.z + 0.2]}>
                <planeGeometry args={[backlightWidth, backlightHeight]} />
                <meshStandardMaterial
                    color={currentChannelInfo.color}
                    emissive={currentChannelInfo.color}
                    emissiveIntensity={intensities.emissive}
                    transparent={true}
                    opacity={intensities.opacity}
                >
                    <GradientTexture
                        attach="gradientMap"
                        stops={[0, 1]}
                        colors={['#000000', currentChannelInfo.color]}
                    />
                </meshStandardMaterial>
            </mesh>

            {/* Channel Grid with enhanced visibility */}
            {isTvOn && showChannelInfo && <ChannelGrid />}

            {/* Enhanced TV Lighting */}
            {isTvOn && (
                <>
                    <pointLight
                        position={[position.x, position.y, position.z - 0.3]}
                        color={currentChannelInfo.color}
                        intensity={intensities.pointLight}
                        distance={6}
                        decay={2}
                    />
                    <pointLight
                        position={[position.x - 2, position.y, position.z - 0.2]}
                        color={currentChannelInfo.color}
                        intensity={intensities.pointLight * 0.5}
                        distance={4}
                        decay={2}
                    />
                    <pointLight
                        position={[position.x + 2, position.y, position.z - 0.2]}
                        color={currentChannelInfo.color}
                        intensity={intensities.pointLight * 0.5}
                        distance={4}
                        decay={2}
                    />
                    <spotLight
                        position={[position.x, position.y, position.z - 1]}
                        color={currentChannelInfo.color}
                        intensity={intensities.spotLight}
                        angle={Math.PI / 3}
                        penumbra={1}
                        distance={8}
                        decay={2}
                    />
                </>
            )}
        </>
    );
}

export default Tv;