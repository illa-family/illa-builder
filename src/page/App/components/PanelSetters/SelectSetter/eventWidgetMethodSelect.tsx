import { FC, useEffect, useMemo } from "react"
import { Select } from "@illa-design/select"
import { get } from "lodash"
import { BaseSelectSetterProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { useSelector } from "react-redux"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const EventWidgetMethodSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    attrName,
    parentAttrName,
    handleUpdateDsl,
    value,
    widgetDisplayName,
  } = props

  const widgetDisplayNameMapProps = useSelector(getWidgetExecutionResult)

  const selectedWidgetID = useMemo(() => {
    return get(
      widgetDisplayNameMapProps,
      `${widgetDisplayName}.${parentAttrName}.widgetID`,
    )
  }, [widgetDisplayNameMapProps, widgetDisplayName, parentAttrName])
  const selectedWidgetType = useMemo(() => {
    return get(widgetDisplayNameMapProps, `${selectedWidgetID}.$widgetType`)
  }, [widgetDisplayNameMapProps, selectedWidgetID])
  const finalOptions = useMemo(() => {
    let tmpOptions: string[] = []

    const eventHandlerConfig =
      widgetBuilder(selectedWidgetType)?.eventHandlerConfig
    if (eventHandlerConfig) {
      tmpOptions = eventHandlerConfig.methods
    }
    return tmpOptions
  }, [selectedWidgetID, selectedWidgetType])

  const finalValue = useMemo(() => {
    const index = finalOptions.findIndex((option) => {
      return option === value
    })
    console.log("index", index)
    if (index !== -1 && selectedWidgetType !== undefined) return value
    return undefined
  }, [finalOptions, value, selectedWidgetType])

  useEffect(() => {
    if (finalValue === undefined) {
      handleUpdateDsl(attrName, undefined)
    }
  }, [attrName, finalValue])

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions}
        size="small"
        value={finalValue}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}
EventWidgetMethodSelect.displayName = "EventWidgetMethodSelect"
