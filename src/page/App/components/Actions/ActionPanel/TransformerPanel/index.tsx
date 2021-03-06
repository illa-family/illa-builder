import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { CodeEditor } from "@/components/CodeEditor"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"
import { useTranslation } from "react-i18next"
import {
  transformerEditorStyle,
  transformerPanelContainerStyle,
  transformerTipStyle,
} from "./style"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { TransformerPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"

export const TransformerPanel: FC<TransformerPanelProps> = (props) => {
  const action = props.action
  const dispatch = useDispatch()
  const { t } = useTranslation()
  return (
    <div css={transformerPanelContainerStyle}>
      <CodeEditor
        value={
          "// Tip: assign your external references to variables instead of chaining off the curly brackets.\n" +
          "return 5"
        }
        css={transformerEditorStyle}
        lineNumbers
        height="88px"
        expectedType={VALIDATION_TYPES.STRING}
        mode="JAVASCRIPT"
        onChange={(value) => {
          dispatch(
            configActions.updateSelectedAction({
              ...action,
              content: {
                transformerString: value,
              } as TransformerAction,
            }),
          )
        }}
      />
      <div css={transformerTipStyle}>
        {t("editor.action.resource.transformer.tip.external_reference")}
      </div>
    </div>
  )
}

TransformerPanel.displayName = "TransformerPanel"
