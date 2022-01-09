import {useAppSelector} from "../index";
import {DeviceState} from "../types";

export const useDevice = (): DeviceState => {
    return useAppSelector(() => ({
        screenWidth: window.innerWidth,
        isMobile: window.innerWidth <= 768
    }));
}
