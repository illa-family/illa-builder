import { FC } from "react"
import { RecordEditorProps } from "@/page/App/components/Actions/ActionPanel/RecordEditor/interface"
import {
  recordEditorContainerStyle,
  recordEditorLabelStyle,
  recordEditorStyle,
  recordNewButton,
  recordStyle,
} from "./style"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { Button } from "@illa-design/button"
import { AddIcon, DeleteIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { useTranslation } from "react-i18next"

export const RecordEditor: FC<RecordEditorProps> = (props) => {
  const { records, label, onDelete, onAdd } = props

  const { t } = useTranslation()

  return (
    <div css={recordEditorContainerStyle}>
      <span css={recordEditorLabelStyle}>{label}</span>
      <div css={recordEditorStyle}>
        {records.map((record, index) => {
          return (
            <div css={recordStyle} key={index}>
              <CodeEditor
                value={record.key}
                mode="TEXT_JS"
                borderRadius="8px 0 0 8px"
                expectedType={VALIDATION_TYPES.STRING}
              />
              <CodeEditor
                mode="TEXT_JS"
                value={record.value}
                borderRadius="0 0 0 0"
                expectedType={VALIDATION_TYPES.STRING}
              />
              <Button
                variant="outline"
                buttonRadius="0 8px 8px 0"
                colorScheme="gray"
                onClick={() => {
                  onDelete(index, record)
                }}
                leftIcon={
                  <DeleteIcon
                    color={globalColor(`--${illaPrefix}-grayBlue-08`)}
                  />
                }
              />
            </div>
          )
        })}
        <Button
          css={recordNewButton}
          colorScheme="techPurple"
          size="medium"
          variant="text"
          onClick={() => {
            onAdd()
          }}
          leftIcon={
            <AddIcon color={globalColor(`--${illaPrefix}-techPurple-08`)} />
          }
        >
          {t("editor.action.panel.btn.new")}
        </Button>
      </div>
    </div>
  )
}

RecordEditor.displayName = "RecordEditor"
