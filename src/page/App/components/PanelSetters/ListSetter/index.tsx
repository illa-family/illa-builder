import { FC, useCallback, useMemo } from "react"
import { isEqual, set, get } from "lodash"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { ListSetterProps } from "./interface"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import {
  labelStyle,
  listSetterWrapperStyle,
  listWrapperStyle,
  resetButtonStyle,
  resetIconStyle,
} from "./style"
import { ResetIcon } from "@illa-design/icon"
import { useTranslation } from "react-i18next"

export const ListSetter: FC<ListSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    childrenSetter,
    attrName,
    handleUpdateDsl,
    widgetDisplayName,
    panelConfig,
  } = props

  const { t } = useTranslation()

  const childrenSetterAttrPathMapDefaultValue = useMemo(() => {
    const childrenSetterAttrPathMap: Record<string, any> = {}
    if (childrenSetter) {
      childrenSetter.forEach((childSetter) => {
        set(
          childrenSetterAttrPathMap,
          childSetter.attrName,
          childSetter.defaultValue,
        )
      })
    }
    return childrenSetterAttrPathMap
  }, [childrenSetter])

  const canReset = useMemo(() => {
    return Object.keys(childrenSetterAttrPathMapDefaultValue).some((key) => {
      const realValue = get(panelConfig, key)
      const defaultValue = get(childrenSetterAttrPathMapDefaultValue, key)
      return !isEqual(realValue, defaultValue)
    })
  }, [childrenSetterAttrPathMapDefaultValue, panelConfig])

  const onClickReset = useCallback(() => {
    Object.keys(childrenSetterAttrPathMapDefaultValue).forEach((key) => {
      const defaultValue = get(childrenSetterAttrPathMapDefaultValue, key)
      handleUpdateDsl(key, defaultValue)
    })
  }, [childrenSetterAttrPathMapDefaultValue, handleUpdateDsl])

  return (
    <div css={listSetterWrapperStyle}>
      <div css={labelStyle}>
        <PanelLabel labelName={t(labelName)} labelDesc={labelDesc} />
        {canReset && (
          <div onClick={onClickReset} css={resetButtonStyle}>
            <span css={resetIconStyle}>
              <ResetIcon />
            </span>
            <span>{t("editor.inspect.setter_content.list_setter.reset")}</span>
          </div>
        )}
      </div>
      <div css={listWrapperStyle}>
        {childrenSetter?.map((child) => {
          return renderFieldAndLabel(child, widgetDisplayName ?? "", true, "")
        })}
      </div>
    </div>
  )
}

ListSetter.displayName = "ListSetter"
