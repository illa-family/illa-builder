import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
  VerticalStartIcon,
  VerticalCenterIcon,
  VerticalEndIcon,
} from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const TEXT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "text-basic",
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: "text-basic-inputModal",
        labelName: "editor.inspect.setter_label.value",
        attrName: "disableMarkdown",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Markdown", value: true },
          { label: "Plain Text", value: false },
        ],
      },
      {
        id: "text-basic-value",
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        isSetterSingleRow: true,
      },
    ],
  },
  {
    id: "text-adornments",
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: "text-adornments-startAdornment",
        labelName: "editor.inspect.setter_label.tooltip",
        labelDesc: "xxxxx",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "text-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "text-layout-col",
        labelName: "editor.inspect.setter_label.horizontal_alignment",
        attrName: "horizontalAlign",
        labelDesc: "xxxxxxx",
        setterType: "RADIO_GROUP_SETTER",
        isSetterSingleRow: true,
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "start",
          },
          {
            label: <HorizontalCenterIcon />,
            value: "center",
          },
          {
            label: <HorizontalEndIcon />,
            value: "end",
          },
        ],
      },
      {
        id: "text-layout-row",
        labelName: "editor.inspect.setter_label.vertical_alignment",
        setterType: "RADIO_GROUP_SETTER",
        labelDesc: "xxxxxxx",
        attrName: "verticalAlign",
        isSetterSingleRow: true,
        options: [
          {
            label: <VerticalStartIcon />,
            value: "start",
          },
          {
            label: <VerticalCenterIcon />,
            value: "center",
          },
          {
            label: <VerticalEndIcon />,
            value: "end",
          },
        ],
      },
      {
        id: "text-layout-hidden",
        labelName: "editor.inspect.setter_label.hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "text-style",
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: "text-style-list",
        setterType: "LIST_SETTER",
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "text-style-color",
            labelName: "editor.inspect.setter_label.text",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "textColor",
            defaultValue: "gray",
            options: colorSchemeOptions,
          },
          {
            id: "text-style-link-color",
            labelName: "editor.inspect.setter_label.links_color",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "linkColor",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
