// import React, { Suspense, useState, useEffect } from 'react';
// import { Canvas } from "@react-three/fiber";

// // Custom Loading component
// const LoadingScreen = () => {
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setProgress(prev => {
//                 const newProgress = prev + Math.random() * 15;
//                 return newProgress > 100 ? 100 : newProgress;
//             });
//         }, 200);

//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
//             <div className="w-full max-w-md p-8">
//                 <div className="space-y-6">
//                     {/* Loading animation */}
//                     <div className="flex justify-center mb-8">
//                         <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
//                     </div>

//                     {/* Progress bar */}
//                     <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
//                         <div
//                             className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
//                             style={{ width: `${progress}%` }}
//                         />
//                     </div>

//                     {/* Loading text */}
//                     <div className="text-center">
//                         <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
//                             Loading Experience
//                         </p>
//                         <p className="text-gray-400 mt-2">
//                             {progress < 100 ? 'Preparing the scene...' : 'Almost ready!'}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
import React from 'react'

function LoadingScreen() {
    return (
        <div>LoadingScreen</div>
    )
}

export default LoadingScreen