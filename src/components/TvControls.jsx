import React from 'react';
import { useAppContext } from '../AppContext';
import EmissiveSlider from './EmissiveSlider';

const TvControls = () => {
    const { state, setState, setCurrentPerspective } = useAppContext();

    const { isTvOn } = state;

    const handleNext = () => {
        if (!isTvOn) return;
        setState(prev => ({
            ...prev,
            currentChannel: prev.currentChannel < 6 ? prev.currentChannel + 1 : 1
        }));
    };

    const handlePrevious = () => {
        if (!isTvOn) return;
        setState(prev => ({
            ...prev,
            currentChannel: prev.currentChannel > 1 ? prev.currentChannel - 1 : 6
        }));
    };

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
            <button
                onClick={handlePrevious}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isTvOn}
            >
                Previous
            </button>
            <button
                onClick={() => setCurrentPerspective("intoTheTvPerspective")}
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isTvOn}
            >
                OK
            </button>
            <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isTvOn}
            >
                Next
            </button>
            {isTvOn && <EmissiveSlider />}

        </div>
    );
};

export default TvControls;