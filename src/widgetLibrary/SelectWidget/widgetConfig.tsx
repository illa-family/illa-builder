import { SelectWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { v4 } from "uuid"
import i18n from "@/i18n/config"

export const SELECT_WIDGET_CONFIG: WidgetConfig = {
  type: "SELECT_WIDGET",
  displayName: "select",
  widgetName: "widget.select.name",
  icon: <SelectWidgetIcon size="100%" />,
  sessionType: "SELECT",
  w: 10,
  h: 5,
  defaults: {
    optionConfigureMode: "static",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    manualOptions: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
    dataSources: "{{[]}}",
    colorScheme: "blue",
    hidden: false,
  },
}
