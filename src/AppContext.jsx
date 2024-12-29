import React, { createContext, useContext, useState } from "react";
import { DEFAULT_CAMERA } from "./constants"; // Assuming this is already defined

import { CAMERA_POSITIONS } from "./constants";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        isDarkMode: false,
        isTvOn: false,
        activeCharacter: "idle",
        currentChannel: 1,
        isRemoteActive: false,
        currentCameraPosition: CAMERA_POSITIONS.perspective1, // Default to perspective1
        camera: DEFAULT_CAMERA,
        currentPerspective: 'defaultPerspective',  // Add this to your initial state
        tvEmissiveIntensity: 2, // Default intensity

    });


    const setIsTvOn = () => {
        if (!state.isTvOn) {
            setState(prev => ({
                ...prev,
                isTvOn: true
            }));
        }
    };

    const setActiveCharacter = (character) => {
        setState((prev) => ({
            ...prev,
            activeCharacter: character,
        }));
    };

    const setCurrentChannel = (channel) => {
        setState(prev => ({
            ...prev,
            currentChannel: channel
        }));
    };

    const setCurrentPerspective = (perspectiveKey) => {
        setState((prev) => ({
            ...prev,
            currentPerspective: perspectiveKey, // Store the key instead of the position object
        }));
    };

    const setEmissiveIntensity = (value) => {
        setState((prev) => ({
            ...prev,
            tvEmissiveIntensity: value, // Default intensity
        }));
    };

    const value = {
        state,
        setState,
        setActiveCharacter,
        setIsTvOn,
        setCurrentChannel,
        setCurrentPerspective,
        setEmissiveIntensity
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};