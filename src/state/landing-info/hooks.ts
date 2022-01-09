import {useAppDispatch, useAppSelector} from "../index";
import {LandingInfo} from "../types";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchTotalTransactions} from "./index";

export const useLandingInfo = (): LandingInfo => {
    return useAppSelector((state) => state.landingInfo);
}

export const useFetchLandingInfo = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTotalTransactions());
    }, [useDispatch, dispatch])

}
