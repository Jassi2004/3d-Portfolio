import React, { useState } from 'react';
import { Mail, TvMinimal, TvMinimalPlay, Sun, Moon } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

const ControlButtons = () => {
    const { state, setState } = useAppContext();
    const [hoveredButton, setHoveredButton] = useState(null);
    const navigate = useNavigate();
    const handleContactNavigation = () => {
        navigate('/contact');
    };
    const buttons = [
        {
            id: 'contact',
            icon: <Mail className="w-4 h-4 text-black" />,
            label: 'Contact',
            position: 'top-16',
            onClick: () => {
                handleContactNavigation()
            }
        },
        {
            id: 'tv',
            icon: state.isTvOn ?
                <TvMinimalPlay className="w-4 h-4 text-black" /> :
                <TvMinimal className="w-4 h-4 text-black" />,
            label: `TV ${state.isTvOn ? 'On' : 'Off'}`,
            position: 'top-32',
            onClick: () => setState(prev => ({ ...prev, isTvOn: !state.isTvOn }))
        },
        {
            id: 'theme',
            icon: state.isDarkMode ?
                <Sun className="w-4 h-4 text-black" /> :
                <Moon className="w-4 h-4 text-black" />,
            label: state.isDarkMode ? 'Light Mode' : 'Dark Mode',
            position: 'top-48',
            onClick: () => setState(prev => ({ ...prev, isDarkMode: !state.isDarkMode }))
        }
    ];

    return (
        <>
            {buttons.map((button) => (
                <div
                    key={button.id}
                    className={`fixed ${button.position} right-4 z-20`}
                    onMouseEnter={() => setHoveredButton(button.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                >
                    <button
                        onClick={button.onClick}
                        className={`
                            p-2 rounded-lg 
                            bg-white/10 backdrop-blur-sm
                            hover:bg-white/20 
                            transition-all duration-200 
                            border border-white/20
                            flex items-center space-x-2
                            ${hoveredButton === button.id ? 'scale-105' : 'scale-100'}
                        `}
                    >
                        {button.icon}
                        <span className="text-black text-sm">
                            {button.label}
                        </span>
                    </button>
                </div>
            ))}
        </>
    );
};

export default ControlButtons;