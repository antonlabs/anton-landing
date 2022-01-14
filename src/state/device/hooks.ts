import {DeviceState} from "../types";


export const useDevice = (): DeviceState => {
    return {
        screenWidth: window.innerWidth,
        isMobile: window.innerWidth <= 768
    };
}
