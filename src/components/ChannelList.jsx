import { Text } from '@react-three/drei';
import { useState, useEffect } from 'react';

const ChannelList = ({ currentChannel, channels, position, showChannelInfo }) => {
    const boxWidth = 2.5;
    const boxHeight = 0.4;
    const spacing = 0.5;

    return (
        <group position={position}>
            {channels.map((channel, index) => {
                const yOffset = -index * (boxHeight + spacing);
                const isSelected = channel.number === currentChannel;

                return (
                    <group key={channel.number} position={[0, yOffset, 0]}>
                        {/* Selection Box */}
                        {isSelected && (
                            <mesh position={[0, 0, -0.01]}>
                                <planeGeometry args={[boxWidth, boxHeight]} />
                                <meshBasicMaterial
                                    color="#ffffff"
                                    transparent={true}
                                    opacity={0.3}
                                />
                            </mesh>
                        )}

                        {/* Channel Text */}
                        <Text
                            position={[0, 0, 0]}
                            fontSize={0.2}
                            color={isSelected ? '#ffffff' : '#a0a0a0'}
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

export default ChannelList;