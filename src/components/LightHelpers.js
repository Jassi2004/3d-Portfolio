/* eslint-disable react/no-unknown-property */

import { useThree } from "@react-three/fiber";
import { DirectionalLight, DirectionalLightHelper, HemisphereLight, PointLight, SpotLight } from "three";
import { useRef, useEffect, useState } from "react";

function LightHelpers({ isDarkMode }) {
    const lightRef1 = useRef();
    const lightRef2 = useRef();
    const lightRef3 = useRef();
    const sunlightRef = useRef();
    const moonlightRef = useRef();
    const hemisphereRef = useRef();
    const pointLightRef1 = useRef();
    const spotLightRef = useRef();
    const pointLightRef2 = useRef();

    const helperRef1 = useRef();
    const helperRef2 = useRef();
    const helperRef3 = useRef();
    const sunHelperRef = useRef();
    const moonHelperRef = useRef();
    const hemisphereHelperRef = useRef();
    const pointHelperRef1 = useRef();
    const spotHelperRef = useRef();
    const pointHelperRef2 = useRef();

    const { scene } = useThree();

    // Function to remove both light and its helper
    const cleanupLightAndHelper = (lightRef, helperRef, lightName) => {
        if (helperRef.current || lightRef.current) {
           // console.log(`🔴 Removing ${lightName}`);
        }
        if (helperRef.current) {
            scene.remove(helperRef.current);
            helperRef.current.dispose();
            helperRef.current = null;
        }
        if (lightRef.current) {
            scene.remove(lightRef.current);
            if (lightRef.current.dispose) {
                lightRef.current.dispose();
            }
            lightRef.current = null;
        }
    };

    useEffect(() => {
       // console.log(`\n🔄 Mode Changed: ${isDarkMode ? 'Dark Mode' : 'Light Mode'}`);
       // console.log('------------------------------------------------');
        // Cleanup function to remove all lights and helpers
        const cleanup = () => {
           // console.log('🧹 Cleaning up previous lights...');

            cleanupLightAndHelper(lightRef1, helperRef1);
            cleanupLightAndHelper(lightRef2, helperRef2);
            cleanupLightAndHelper(lightRef3, helperRef3);
            cleanupLightAndHelper(sunlightRef, sunHelperRef);
            cleanupLightAndHelper(moonlightRef, moonHelperRef);
            cleanupLightAndHelper(hemisphereRef, hemisphereHelperRef);
            cleanupLightAndHelper(pointLightRef1, pointHelperRef1);
            cleanupLightAndHelper(spotLightRef, spotHelperRef);
            cleanupLightAndHelper(pointLightRef2, pointHelperRef2);
           // console.log('🧹 Cleaning up previous lights...');

        };

        // Clean up existing lights before adding new ones
        cleanup();

        if (!isDarkMode) {
            // LIGHT MODE SETUP
           // console.log('🌞 Setting up Light Mode:');

            const sunlight = new DirectionalLight("#ffd700", 2);
            sunlight.position.set(-20, 10, 0);
            sunlight.castShadow = true;
            sunlight.shadow.mapSize.width = 2048;
            sunlight.shadow.mapSize.height = 2048;
            sunlight.shadow.camera.far = 50;
            sunlight.shadow.camera.left = -10;
            sunlight.shadow.camera.right = 10;
            sunlight.shadow.camera.top = 10;
            sunlight.shadow.camera.bottom = -10;
            sunlightRef.current = sunlight;
            scene.add(sunlight);
            sunHelperRef.current = new DirectionalLightHelper(sunlight, 1, "#FFD700");
            // scene.add(sunHelperRef.current);
           // console.log('  ✓ Added Sun Light (Primary) - Color: #ffd700, Intensity: 2.0');


            const light1 = new DirectionalLight("#fff", 0.3);
            light1.position.set(10, 2, 0);
            lightRef1.current = light1;
            scene.add(light1);
            helperRef1.current = new DirectionalLightHelper(light1, 1, "#FF0000");
            // scene.add(helperRef1.current);
           // console.log('  ✓ Added Directional Light 1 - Color: #fff, Intensity: 1.0');


            const light2 = new DirectionalLight("#fff", 1);
            light2.position.set(-8, 2, 0);
            lightRef2.current = light2;
            scene.add(light2);
            helperRef2.current = new DirectionalLightHelper(light2, 1, "#00FF00");
            // scene.add(helperRef2.current);
           // console.log('  ✓ Added Directional Light 2 - Color: #fff, Intensity: 1.0');


            const light3 = new DirectionalLight("#fff", 0.3);
            light3.position.set(0, 5, 5);
            lightRef3.current = light3;
            scene.add(light3);
            helperRef3.current = new DirectionalLightHelper(light3, 1, "#0000FF");
            // scene.add(helperRef3.current);
           // console.log('  ✓ Added Directional Light 3 - Color: #fff, Intensity: 0.3');


        } else {
            // DARK MODE SETUP
           // console.log('🌙 Setting up Dark Mode:');

            const moonlight = new DirectionalLight("#4169E1", 1.2);
            moonlight.position.set(-15, 12, 5);
            moonlight.castShadow = true;
            moonlight.shadow.mapSize.width = 2048;
            moonlight.shadow.mapSize.height = 2048;
            moonlight.shadow.camera.far = 50;
            moonlight.shadow.camera.left = -10;
            moonlight.shadow.camera.right = 10;
            moonlight.shadow.camera.top = 10;
            moonlight.shadow.camera.bottom = -10;
            moonlightRef.current = moonlight;
            scene.add(moonlight);
            moonHelperRef.current = new DirectionalLightHelper(moonlight, 1, "#FFFFFF");
            // scene.add(moonHelperRef.current);
           // console.log('  ✓ Added Moon Light (Primary) - Color: #4169E1, Intensity: 1.2');

            const hemisphereLight = new HemisphereLight("#4169E1", "#191970", 0.15);
            hemisphereRef.current = hemisphereLight;
            scene.add(hemisphereLight);
            // Hemisphere lights don't have a standard helper, so we create a custom marker
            const hemisphereLightMarker = new DirectionalLight("#4169E1", 0);
            hemisphereLightMarker.position.set(0, 8, 0);
            hemisphereHelperRef.current = new DirectionalLightHelper(hemisphereLightMarker, 1, "#FFA500");
            // scene.add(hemisphereHelperRef.current);
           // console.log('  ✓ Added Hemisphere Light - Sky: #4169E1, Ground: #191970, Intensity: 0.15');

            const pointLight1 = new PointLight("#4B0082", 0.2, 20);
            pointLight1.position.set(0, 8, 0);
            pointLightRef1.current = pointLight1;
            scene.add(pointLight1);
            pointHelperRef1.current = new DirectionalLightHelper(new DirectionalLight(), 1, "#800080");
            pointHelperRef1.current.position.copy(pointLight1.position);
            // scene.add(pointHelperRef1.current);
           // console.log('  ✓ Added Point Light 1 - Color: #4B0082, Intensity: 0.2, Distance: 20');


            const spotLight = new SpotLight("#4ca6ff", 2, 6, Math.PI / 3, 1, 2);
            spotLight.position.set(-10.5, 4.8, -6);
            spotLightRef.current = spotLight;
            scene.add(spotLight);
            spotHelperRef.current = new DirectionalLightHelper(new DirectionalLight(), 1, "#00FFFF");
            spotHelperRef.current.position.copy(spotLight.position);
            // scene.add(spotHelperRef.current);
           // console.log('  ✓ Added spotlight - Color: #4B0082, Intensity: 0.2, Distance: 20');


            const pointLight2 = new PointLight("#6495ED", 0.3, 15);
            pointLight2.position.set(8, 4, -8);
            pointLightRef2.current = pointLight2;
            scene.add(pointLight2);
            pointHelperRef2.current = new DirectionalLightHelper(new DirectionalLight(), 1, "#FF69B4");
            pointHelperRef2.current.position.copy(pointLight2.position);
            // scene.add(pointHelperRef2.current);
           // console.log('  ✓ Added Point Light 2 - Color: #4B0082, Intensity: 0.2, Distance: 20');


            const light1 = new DirectionalLight("#4B0082", 0.15);
            light1.position.set(10, 2, 0);
            lightRef1.current = light1;
            scene.add(light1);
            helperRef1.current = new DirectionalLightHelper(light1, 1, "#FF0000");
            // scene.add(helperRef1.current);
           // console.log('  ✓ Added DirectionalLight 1 - Color: #4B0082, Intensity: 0.2, Distance: 20');

            const light2 = new DirectionalLight("#191970", 0.25);
            light2.position.set(-8, 2, 0);
            lightRef2.current = light2;
            scene.add(light2);
            helperRef2.current = new DirectionalLightHelper(light2, 1, "#00FF00");
            // scene.add(helperRef2.current);
           // console.log('  ✓ Added DirectionalLight 2 - Color: #4B0082, Intensity: 0.2, Distance: 20');


            const light3 = new DirectionalLight("#000080", 0.15);
            light3.position.set(0, 5, 5);
            lightRef3.current = light3;
            scene.add(light3);
            helperRef3.current = new DirectionalLightHelper(light3, 1, "#0000FF");
            // scene.add(helperRef3.current);
           // console.log('  ✓ Added DirectionalLight 3 - Color: #4B0082, Intensity: 0.2, Distance: 20');

           // console.log('✅ Dark mode setup complete\n');
        }
        // Cleanup when component unmounts or mode changes
        return () => {
           // console.log('\n🔄 Cleaning up lights due to mode change or unmount...');
            cleanup();
        };
    }, [scene, isDarkMode]);

    return null;
}

export default LightHelpers;