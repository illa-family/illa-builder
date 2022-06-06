import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import {
  CHART_TYPE,
  LEGEND_POSITION,
  XAXISTYPE,
} from "@/wrappedComponents/Chart/interface"

export const CHART_DATASET_CONFIG: PanelConfig[] = [
  {
    id: "dataset-name",
    labelName: "Dataset name",
    attrName: "name",
    setterType: "INPUT_SETTER",
    isInPop: true,
  },
  {
    id: "dataset-value",
    labelName: "Dataset values",
    attrName: "values",
    setterType: "INPUT_SETTER", /// TextArea
    isInPop: true,
  },
  {
    id: "dataset-aggregationMethod",
    labelName: "Aggregation method",
    attrName: "aggregationMethod",
    setterType: "SELECT_SETTER",
    isInPop: true,
  },
  {
    id: "dataset-type",
    labelName: "Type",
    attrName: "type",
    setterType: "SELECT_SETTER",
    options: CHART_TYPE,
    isInPop: true,
  },
  {
    id: "dataset-toolTip",
    labelName: "Tooltip",
    attrName: "toolTip",
    setterType: "INPUT_SETTER",
    isInPop: true,
  },
]

export const CHART_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "chart-data",
    groupName: "DATA",
    children: [
      {
        id: "chart-data-config-type",
        isFullWidth: true,
        attrName: "configType",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: "UI Form",
            value: "UIForm",
          },
          {
            label: "Chart JSON",
            value: "JSON",
          },
        ],
      },
      {
        id: "chart-data-source",
        labelName: "Data source",
        isFullWidth: true,
        useCustomLabel: true,
        attrName: "dataSource",
        setterType: "CHART_DATA_SETTER",
        options: [
          {
            label: "value01",
            value: "value01",
          },
          {
            label: "value02",
            value: "value02",
          },
        ],
        bindAttrName: ["configType", "type"],
        shown: (value) => {
          return value["configType"] === "UIForm"
        },
      },
      {
        id: "chart-data",
        labelName: "data",
        isFullWidth: true,
        attrName: "chartJson",
        setterType: "TEXTAREA_SETTER", // todo @aoao
        bindAttrName: ["configType", "type"],
        shown: (value) => {
          return value["configType"] === "JSON"
        },
      },
    ],
  },
  {
    id: "chart-interaction",
    groupName: "INTERACTION",
    children: [
      // eventHandle
    ],
  },
  {
    id: "chart-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "chart-title",
        isFullWidth: true,
        labelName: "Title",
        attrName: "title", // todo@aoao
        setterType: "INPUT_SETTER",
      },
      {
        id: "chart-xAxisTitle",
        isFullWidth: true,
        labelName: "xAxisTitle",
        attrName: "xTitle",
        setterType: "INPUT_SETTER",
      },

      {
        id: "chart-xAxisType",
        labelName: "X-axis type",
        attrName: "xAxisType",
        isFullWidth: true,
        setterType: "SELECT_SETTER",
        options: XAXISTYPE,
      },
      {
        id: "chart-yAxisTitle",
        isFullWidth: true,
        labelName: "yAxisTitle",
        attrName: "yTitle",
        setterType: "INPUT_SETTER",
      },
      {
        id: "chart-legend-position",
        labelName: "Legend position",
        attrName: "type",
        setterType: "RADIO_GROUP_SETTER",
        options: LEGEND_POSITION, // @todo 等晨哥把方位抽出
      },
    ],
  },
]
