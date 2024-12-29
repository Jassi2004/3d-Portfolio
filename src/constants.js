// constant.js

import { Vector3 } from "three";

export const DEFAULT_CAMERA = {
    position: [0, 3.8, 10.7], // Default camera position
    fov: 55,                  // Default field of view
};



export const CAMERA_POSITIONS = {
    defaultPerspective: {
        position: new Vector3(0, 3.8, 10.7),
        target: new Vector3(0, 0, 0),
    },
    tvPerspective: {
        position: new Vector3(0, 3, 7.5),
        target: new Vector3(0, 0, 0),
    },
    walkingPerspective: {
        position: new Vector3(-4.5, 3.5, 5),
        target: new Vector3(0, 2, 0),
    },
    changeChannelPerspective: {
        position: new Vector3(0, 2, 2),
        target: new Vector3(0, 1, -5),
    },
    intoTheTvPerspective: {
        position: new Vector3(0, 2, -4),
        target: new Vector3(0, 2.5, -5.2),
    },
    perspective1: {
        position: new Vector3(8, 8, 15),
        target: new Vector3(0, 0, 0),
    },
    perspective2: {
        position: new Vector3(-4, 2, -4),
        target: new Vector3(0, 0, 0),
    },
};
