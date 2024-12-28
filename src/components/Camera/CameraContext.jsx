// // CameraContext.jsx
// import React, { createContext, useContext } from 'react';
// import { Vector3 } from 'three';

// const CameraContext = createContext(undefined);

// export const CameraProvider = ({ children }) => {
//     const defaultPosition = new Vector3(5, 5, 5);
//     const resetRef = React.useRef(() => { });

//     const resetCamera = () => {
//         resetRef.current();
//     };

//     return (
//         <CameraContext.Provider value={{
//             defaultPosition,
//             resetCamera,
//             _setResetFunction: (fn) => { resetRef.current = fn }
//         }}>
//             {children}
//         </CameraContext.Provider>
//     );
// };

// export const useCamera = () => {
//     const context = useContext(CameraContext);
//     if (!context) {
//         throw new Error('useCamera must be used within a CameraProvider');
//     }
//     return context;
// };


import React, { createContext, useContext, useState } from 'react';
import { Vector3 } from 'three';

const CameraContext = createContext(undefined);

export const CameraProvider = ({ children }) => {
    const defaultPosition = new Vector3(5, 5, 5); // Default camera position
    const resetRef = React.useRef(() => { });

    const [targetPosition, setTargetPosition] = useState(defaultPosition);

    const resetCamera = () => {
        resetRef.current();
    };

    return (
        <CameraContext.Provider value={{
            defaultPosition,
            targetPosition,
            setCameraPosition: (position) => setTargetPosition(new Vector3(...position)),
            resetCamera,
            _setResetFunction: (fn) => { resetRef.current = fn }
        }}>
            {children}
        </CameraContext.Provider>
    );
};

export const useCamera = () => {
    const context = useContext(CameraContext);
    if (!context) {
        throw new Error('useCamera must be used within a CameraProvider');
    }
    return context;
};
