import React from 'react';
import { useAppContext } from '../AppContext';

const EmissiveSlider = () => {
    const { state, setEmissiveIntensity } = useAppContext();
    const emissiveIntensity = state.tvEmissiveIntensity ?? 0;

    const handleChange = (event) => {
        const newValue = parseFloat(event.target.value);
        setEmissiveIntensity(newValue);
    };

    return (
        <div className="relative">
            <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={emissiveIntensity}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                {emissiveIntensity.toFixed(1)}
            </span>
        </div>
    );
};

export default EmissiveSlider;