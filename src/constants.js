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


export const REMOTE_POSITIONS = {
    // const [scale] = useState({ x: .2, y: 0.2, z: .2 }); //remote1
    // const [position] = useState({ x: 1.5, y: 1, z: 0 });//remote1
    // const [rotation] = useState({ x: .5, y: 0, z: .5 }); //remote1
    // const [scale] = useState({ x: 4, y: 4, z: 4 }); //remote2
    // const [position] = useState({ x: 1.5, y: 1, z: 0 }); //remote2
    // const [rotation] = useState({ x: 5.5, y: -.4, z: 0 }); //remote2
}