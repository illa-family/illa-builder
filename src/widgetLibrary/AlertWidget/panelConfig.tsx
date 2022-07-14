import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const ALERT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "alert-basic",
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: "alert-basic-Type",
        labelName: "editor.inspect.setter_label.type",
        attrName: "type",
        setterType: "BASE_SELECT_SETTER",
        options: [
          { label: "info", value: "info" },
          { label: "success", value: "success" },
          { label: "warning", value: "warning" },
          { label: "error", value: "error" },
        ],
      },
      {
        id: "alert-basic-Title",
        labelName: "editor.inspect.setter_label.title",
        attrName: "title",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "alert-basic-Content",
        labelName: "editor.inspect.setter_label.content",
        attrName: "content",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      }
    ]
  }
]