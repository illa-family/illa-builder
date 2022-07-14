import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { HorizontalEndIcon, HorizontalStartIcon } from "@illa-design/icon"

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
      },
      {
        id: "alert-basic-Closable",
        labelName: "editor.inspect.setter_label.closable",
        attrName: "closable",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "alert-basic-ShowIcon",
        labelName: "editor.inspect.setter_label.show_icon",
        attrName: "showIcon",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "alert-label",
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: "alert-label-label",
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "alert-label-caption",
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "alert-label-position",
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "alert-label-alignment",
        labelName: "editor.inspect.setter_label.label_alignment",
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "left",
          },
          {
            label: <HorizontalEndIcon />,
            value: "right",
          },
        ],
      },
      {
        id: "alert-label-labelWidth",
        labelName: "editor.inspect.setter_label.label_width",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: "alert-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "alert-layout-hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        labelName: "editor.inspect.setter_label.hidden",
        attrName: "hidden",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
]
