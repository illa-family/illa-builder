import {
  defaultChartData,
  defaultChartData02,
  WrappedChartProps,
} from "./interface"
import { FC, useEffect, useMemo, useRef, useState } from "react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend,
  TimeScale,
  ArcElement,
  LogarithmicScale,
} from "chart.js"
import { Line, Bar, Pie, Scatter } from "react-chartjs-2"
import {
  initData,
  wrapData,
  wrapDataWithGroupBy,
  wrapPieDataset,
} from "./utils"
import "chartjs-adapter-moment"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { formatPropsToChartOptions } from "./formatData"

ChartJS.register(ArcElement, Tooltip, Legend, Title)
ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LogarithmicScale,
  ChartDataLabels,
)
export const WrappedChart: FC<WrappedChartProps> = (props) => {
  const {
    data = defaultChartData02,
    legendPosition = "bottom",
    title = "Chart",
    xTitle = "x-title",
    yTitle = "y-title",
    groupBy,
    datasets,
    type = "line",
    xType = "category",
    xAxisValues = "date",
    chartJson,
    configType = "UIForm",
  } = props

  const dataMap = useRef<{ [key: string]: any }>()

  const _Chart = useMemo(() => {
    switch (type) {
      case "line":
        return Line
      case "bar":
        return Bar
      case "pie":
        return Pie
      case "scatter":
        return Scatter
      default:
        return Line
    }
  }, [type])

  const [_datasets, _tooltips] = useMemo(() => {
    let res
    if (groupBy) {
      const groups = data?.map((item) => item[groupBy])
      res = wrapDataWithGroupBy(
        data,
        xAxisValues,
        datasets,
        type,
        groupBy,
        groups,
      )
    } else {
      res = wrapData(data, xAxisValues, datasets, type)
    }
    return [{ datasets: res?.datasets ?? [] }, res?.tooltips]
  }, [data, xAxisValues, datasets, type, dataMap.current, groupBy])

  const _options: any = useMemo(() => {
    return formatPropsToChartOptions(
      type,
      title,
      xType,
      xTitle,
      yTitle,
      legendPosition,
      _tooltips,
    )
  }, [type, title, xType, xTitle, yTitle, legendPosition, _tooltips])

  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    let myChart: ChartJS
    const ctx = ref?.current?.getContext("2d")
    if (chartJson && ctx) {
      myChart = new ChartJS(ctx, JSON.parse(chartJson))
    }
    return () => {
      myChart?.destroy()
    }
  }, [chartJson, configType])

  return (
    <>
      {configType === "JSON" ? (
        <canvas ref={ref} id={"my-chart-js"} width="400" height="400" />
      ) : (
        <>
          {type === "pie" ? (
            <Pie
              data={{
                labels: dataMap.current ? dataMap.current["date"] : [],
                datasets: wrapPieDataset(datasets).datasets ?? [],
              }}
              options={_options}
            />
          ) : (
            <_Chart redraw data={_datasets} options={_options} />
          )}
        </>
      )}
    </>
  )
}

WrappedChart.displayName = "ChartWidget"

export const ChartWidget = WrappedChart
