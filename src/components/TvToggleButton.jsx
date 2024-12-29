import React, { useState } from 'react';
import { TvMinimal, TvMinimalPlay } from 'lucide-react';
import { useAppContext } from '../AppContext';

const TvToggleButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { state, setState } = useAppContext();
    return (
        <div
            className="fixed top-16 right-4 z-20 p-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                onClick={() => setState(prev => ({ ...prev, isTvOn: !state.isTvOn }))}
                className={`
                    relative
                    w-34 h-9 p-4
                    rounded-full
                    bg-gradient-to-br from-slate-900 to-slate-800
                    border border-slate-700
                    shadow-xl
                    overflow-hidden
                    transition-all duration-300
                    transform
                    ${isHovered ? 'scale-105 border-blue-500' : 'scale-100'}
                `}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />

                <div className="relative flex items-center justify-center h-full gap-3 ">
                    {state.isTvOn ? (
                        <TvMinimalPlay className="w-4 h-4 text-blue-400" />
                    ) : (
                        <TvMinimal className="w-4 h-4 text-blue-400" />
                    )}
                    <span className="text-xs font-medium text-white">
                        TV {state.isTvOn ? 'On' : 'Off'}
                    </span>
                </div>
            </button>
        </div>
    );
};

export default TvToggleButton;