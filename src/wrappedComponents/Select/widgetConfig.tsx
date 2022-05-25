import { ComponentModel } from "@/wrappedComponents/interface"
import { SelectIcon } from "@/wrappedComponents/Select/svg"

export const SELECT_WIDGET_CONFIG: ComponentModel = {
  type: "SELECT_WIDGET",
  widgetName: "select",
  version: "0.0.1",
  icon: <SelectIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 50,
    columns: 500,
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "200px",
  },
}
