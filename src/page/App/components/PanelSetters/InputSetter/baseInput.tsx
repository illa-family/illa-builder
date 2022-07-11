import { FC, useMemo } from "react"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"
import { CodeEditor } from "@/components/CodeEditor"

function getPath(attrName?: string, widgetDisplayName?: string) {
  if (attrName && widgetDisplayName) {
    return `${widgetDisplayName}.${attrName}`
  } else {
    return widgetDisplayName
  }
}

export const BaseInput: FC<BaseInputSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    placeholder,
    attrName,
    handleUpdateDsl,
    expectedType,
    value,
    widgetDisplayName,
  } = props

  const _value = useMemo(() => {
    if (typeof value === "object") {
      return `{{${JSON.stringify(value)}}}`
    } else {
      return value
    }
  }, [value])

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow)}>
      <CodeEditor
        value={_value ?? ""}
        placeholder={placeholder}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
        mode={"TEXT_JS"}
        // @ts-ignore todo: weichen
        expectedType={expectedType}
        path={getPath(attrName, widgetDisplayName)}
      />
    </div>
  )
}

BaseInput.displayName = "BaseInput"
