// AppContext.js

import React, { createContext, useContext, useState } from "react";
import { DEFAULT_CAMERA } from "./constants"; // Assuming this is already defined

// Import the positions structure
import { CAMERA_POSITIONS } from "./positions";

// Create a context for app state
const AppContext = createContext();

// AppProvider component to wrap around the app and provide state
export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        isDarkMode: false,
        isTvOn: false,
        camera: DEFAULT_CAMERA,
        currentCameraPosition: CAMERA_POSITIONS.perspective1, // Default to perspective1
        activeCharacter: "idle",
    });

    // Function to change camera position
    const setCameraPosition = (positionKey) => {
        setState(prev => ({
            ...prev,
            currentCameraPosition: CAMERA_POSITIONS[positionKey], // Change camera position dynamically
        }));
    };

    // Function to turn tv on (Only turn on if it's not already on)
    const setIsTvOn = () => {
        if (!state.isTvOn) { // Only set to true if TV is off
            setState(prev => ({
                ...prev,
                isTvOn: true
            }));
        }
    };



    // Function to set activeCharacter
    const setActiveCharacter = (character) => {
        setState((prev) => ({
            ...prev,
            activeCharacter: character,
        }));
    };
    return (
        <AppContext.Provider value={{ state, setState, setCameraPosition, setActiveCharacter, setIsTvOn }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use app context
export const useAppContext = () => {
    return useContext(AppContext);
};
