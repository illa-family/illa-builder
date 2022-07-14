import { FC } from "react"
import { get } from "lodash"
import { FxIcon } from "@illa-design/icon"
import { Switch } from "@illa-design/switch"
import { DynamicSwitchProps } from "./interface"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import {
  applyCustomIconStyle,
  applyLabelWrapperStyle,
  customAndSwitchWrapperStyle,
  dynamicSwitchInputStyle,
  dynamicSwitchWrapperStyle,
} from "./style"
import { BaseInput } from "../InputSetter/baseInput"
import { useTranslation } from "react-i18next"

export const DynamicSwitchSetter: FC<DynamicSwitchProps> = (props) => {
  const {
    attrName,
    labelName,
    labelDesc,
    panelConfig,
    handleUpdateDsl,
    value,
    widgetDisplayName,
    expectedType,
  } = props
  const { t } = useTranslation()

  const dynamicAttrPath = get(panelConfig, "$dynamicAttrPaths", [])

  const customSelected = dynamicAttrPath.includes(attrName)

  return (
    <div css={applyLabelWrapperStyle(customSelected)}>
      <div css={dynamicSwitchWrapperStyle}>
        <PanelLabel labelName={t(labelName)} labelDesc={labelDesc} />
        <div css={customAndSwitchWrapperStyle}>
          <div
            css={applyCustomIconStyle(customSelected)}
            onClick={() => {
              if (customSelected) {
                handleUpdateDsl(attrName, false)
              } else {
                handleUpdateDsl(attrName, `{{false}}`)
              }
            }}
          >
            <FxIcon />
          </div>
          {!customSelected && (
            <Switch
              onChange={(value) => {
                handleUpdateDsl(attrName, value)
              }}
              checked={value}
              colorScheme="purple"
            />
          )}
        </div>
      </div>
      {customSelected && (
        <div css={dynamicSwitchInputStyle}>
          <BaseInput
            attrName={attrName}
            value={value}
            handleUpdateDsl={handleUpdateDsl}
            panelConfig={panelConfig}
            expectedType={expectedType}
            isSetterSingleRow
            widgetDisplayName={widgetDisplayName}
            widgetType={""}
          />
        </div>
      )}
    </div>
  )
}

DynamicSwitchSetter.displayName = "DynamicSwitchSetter"
