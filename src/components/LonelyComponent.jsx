// LonelyComponent.js
import React from 'react';
import { Text } from '@react-three/drei';
import { useState, useEffect } from 'react';

const LonelyComponent = ({ message, position = [0, 0, 0] }) => {
    const [text, setText] = useState(message);

    useEffect(() => {
        setText(message);
    }, [message]);

    return (
        <group position={position} scale={[2, 2, 2]}>
            <Text
                fontSize={1}
                color="white"
                anchorX="center"
                anchorY="middle"
                position={[0, 0, 0]}
                maxWidth={20}
            >
                {text}
            </Text>
        </group>
    );
};

export default LonelyComponent;
