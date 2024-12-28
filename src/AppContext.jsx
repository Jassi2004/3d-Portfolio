import React, { createContext, useContext, useState } from "react";
import { DEFAULT_CAMERA } from "./constants";

// Create a context for app state
const AppContext = createContext();

// AppProvider component to wrap around the app and provide state
export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        isDarkMode: false,
        isTvOn: false,
        animationState: "idle",
        camera: DEFAULT_CAMERA
    });

    // Function to reset the camera
    const resetCamera = () => {
        console.log("Resetting camera to:", DEFAULT_CAMERA); // Log to confirm the camera reset

        setState(prev => ({
            ...prev,
            camera: DEFAULT_CAMERA
        }));
    };

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use app context
export const useAppContext = () => {
    return useContext(AppContext);
};
