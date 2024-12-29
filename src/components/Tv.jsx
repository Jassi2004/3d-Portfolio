/* eslint-disable react/no-unknown-property */
import { useGLTF, Text } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';

function Tv() {
    const { state } = useAppContext();
    const { isDarkMode, isTvOn, currentChannel } = state;
    const { scene } = useGLTF('/assets/models/tv1.glb');
    const [scale] = useState({ x: 4.8, y: 3.5, z: 4 });
    const [position] = useState({ x: -12.3, y: 4.8, z: -5 });
    const [showChannelInfo, setShowChannelInfo] = useState(false);

    const backlightWidth = 5.4;
    const backlightHeight = 2.2;

    // Grid layout constants
    const channelBoxWidth = 2;  // Reduced width for grid layout
    const channelBoxHeight = 0.5; // Slightly increased height
    const gridSpacing = 0.2;      // Space between grid items
    const gridColumns = 2;

    // Channel data array
    const channels = [
        { number: 1, name: "About Me", color: "#4ca6ff" },
        { number: 2, name: "Education", color: "#4ca6ff" },
        { number: 3, name: "Experience", color: "#4ca6ff" },
        { number: 4, name: "Skills", color: "#4ca6ff" },
        { number: 5, name: "Projects", color: "#4ca6ff" },
        { number: 6, name: "Contact", color: "#4ca6ff" },
    ];

    // Get current channel info
    const getCurrentChannelInfo = () => {
        return channels.find(channel => channel.number === currentChannel) || channels[0];
    };

    const showChannelInfoTemporarily = () => {
        setShowChannelInfo(true);
    };

    // Effect to show channel info when TV is turned on
    useEffect(() => {
        if (isTvOn) {
            showChannelInfoTemporarily();
        }
    }, [isTvOn]);

    // Intensity values based on mode
    const getIntensities = () => {
        if (!isTvOn) return {
            emissive: 0,
            opacity: 0,
            glowOpacity: 0,
            pointLight: 0,
            spotLight: 0
        };

        return isDarkMode ? {
            emissive: state.tvEmissiveIntensity + 0.5,
            opacity: 0.8,
            glowOpacity: 1,
            pointLight: 8,
            spotLight: 2
        } : {
            emissive: state.tvEmissiveIntensity + 3,
            opacity: 1,
            glowOpacity: 1,
            pointLight: 8,
            spotLight: 3
        };
    };

    const intensities = getIntensities();
    const currentChannelInfo = getCurrentChannelInfo();

    // Channel Grid Component
    const ChannelGrid = () => {
        return (
            <group position={[1, 3.2, position.z + 0.3]}>
                {channels.map((channel, index) => {
                    const row = Math.floor(index / gridColumns);
                    const col = index % gridColumns;
                    const xOffset = (col - 1) * (channelBoxWidth + gridSpacing);
                    const yOffset = -row * (channelBoxHeight + gridSpacing);
                    const isSelected = channel.number === currentChannel;

                    return (
                        <group key={channel.number} position={[xOffset, yOffset, 0]}>
                            <mesh position={[0, -0.05, -0.05]}>
                                <planeGeometry args={[channelBoxWidth + 0.1, channelBoxHeight + 0.1]} />
                                <meshBasicMaterial color="#222222" transparent={true} opacity={0.8} />
                            </mesh>

                            {isSelected && (
                                <mesh position={[0, 0, -0.01]}>
                                    <planeGeometry args={[channelBoxWidth, channelBoxHeight]} />
                                    <meshBasicMaterial color={currentChannelInfo.color} transparent={true} opacity={1} />
                                </mesh>
                            )}

                            <Text
                                position={[0, 0, 0]}
                                fontSize={0.18}
                                color={isSelected ? '#ffffff' : '#ff6118'}
                                anchorX="center"
                                anchorY="middle"
                                outlineWidth={0.02}
                                outlineColor="#000000"
                            >
                                {`${channel.number}. ${channel.name}`}
                            </Text>
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

            {/* TV Screen */}
            <mesh position={[-0.05, 2.4, position.z + 0.2]}>
                <planeGeometry args={[backlightWidth, backlightHeight]} />
                <meshStandardMaterial
                    color={currentChannelInfo.color}
                    emissive={currentChannelInfo.color}
                    emissiveIntensity={intensities.emissive}
                    transparent={true}
                    opacity={intensities.opacity}
                />
            </mesh>

            {/* Channel Grid */}
            {isTvOn && showChannelInfo && <ChannelGrid />}

            {/* TV Lighting */}
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