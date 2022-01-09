import * as LightweightCharts from 'lightweight-charts';
import {KlineModel} from "../../clients/binance/models/kline.model";
import {useEffect, useRef} from "react";
import {BarData, createChart, UTCTimestamp} from "lightweight-charts";
import {useDevice} from "../../state/device/hooks";


const klineToBarData = (kline: KlineModel): BarData => {
    return {
        time: kline.openTime as UTCTimestamp,
        open: kline.open,
        high: kline.high,
        low: kline.low,
        close: kline.close
    }
}

let candleSeries: LightweightCharts.ISeriesApi<any>;
let chart: LightweightCharts.IChartApi | undefined;
let lastCandle: KlineModel | undefined;

export const CandleStickChart = (props: {candles: KlineModel[]}) => {
    const device = useDevice();
    const myRef = useRef<any>();
    lastCandle = props.candles.slice(-1)[0];
    useEffect(() => {
        if(!chart) {
            chart = createChart(myRef.current, {width: device.screenWidth / 2, height: 400});
        }
        return () => {
            chart?.remove();
        }
    }, [device.screenWidth, lastCandle]);

    useEffect(() => {
        console.log('refresh series', props.candles);
        if(chart && lastCandle !== undefined) {
            if(candleSeries) {
                chart?.removeSeries(candleSeries);
            }
            candleSeries = chart.addCandlestickSeries();
            candleSeries.setData(props.candles.map(klineToBarData));
        }
    }, [lastCandle])

    return <div ref={myRef} />

};
