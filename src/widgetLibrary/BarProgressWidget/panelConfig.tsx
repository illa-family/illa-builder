import { HorizontalEndIcon, HorizontalStartIcon } from "@illa-design/icon"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const BAR_PROGRESS_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "bar-progress-basic",
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: "bar-progress-basic-Value",
        labelName: "editor.inspect.setter_label.value",
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "bar-progress-label",
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: "bar-progress-label-label",
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "bar-progress-label-caption",
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "bar-progress-label-position",
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "bar-progress-label-alignment",
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
        id: "bar-progress-label-labelWidth",
        labelName: "editor.inspect.setter_label.label_width",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: "bar-progress-adornments",
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: "bar-progress-adornments-showText",
        labelName: "editor.inspect.setter_label.hide_value_label",
        attrName: "showText",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "bar-progress-adornments-tooltip",
        labelName: "editor.inspect.setter_label.tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "bar-progress-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "bar-progress-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: "editor.inspect.setter_label.hidden",
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "bar-progress-style",
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: "bar-progress-style-list",
        setterType: "LIST_SETTER",
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "bar-progress-color",
            labelName: "editor.inspect.setter_label.styles",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "color",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
          {
            id: "bar-progress-trailColor",
            labelName: "editor.inspect.setter_label.trail_color",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "trailColor",
            defaultValue: "gray",
            options: colorSchemeOptions,
          },
          {
            id: "bar-progress-strokeWidth",
            labelName: "editor.inspect.setter_label.stroke_width",
            setterType: "INPUT_SETTER",
            attrName: "strokeWidth",
            defaultValue: "4px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
