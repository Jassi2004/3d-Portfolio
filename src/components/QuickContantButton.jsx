import { Mail } from 'lucide-react';
import { useState } from 'react';

const QuickContactButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="fixed top-16 right-5 z-20 p-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
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
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-medium text-white">
                        Contact
                    </span>
                </div>
            </button>
        </div>
    );
};

export default QuickContactButton;