import { ButtonWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const ALERT_WIDGET_CONFIG: WidgetConfig = {
  type: "ALERT_WIDGET",
  displayName: "alert",
  widgetName: "widget.alert.name",
  icon: <ButtonWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  w: 20,
  h: 10,
  defaults: {
    type: "info",
    title: "Alert Title",
    content: "Alert Content"
  },
}