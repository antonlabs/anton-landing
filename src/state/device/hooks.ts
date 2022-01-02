import {useAppSelector} from "../index";
import {DeviceState} from "../types";

export const useDevice = (): DeviceState => {
    return useAppSelector((state) => state.device);
}
