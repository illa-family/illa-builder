import { WidgetConfigs } from "./interface"
import {
  TEXT_PANEL_CONFIG,
  TEXT_WIDGET_CONFIG,
  TEXT_EVENT_HANDLER_CONFIG,
  TextWidget,
} from "@/widgetLibrary/TextWidget"
import {
  IMAGE_PANEL_CONFIG,
  IMAGE_WIDGET_CONFIG,
  IMAGE_EVENT_HANDLER_CONFIG,
  ImageWidget,
} from "@/widgetLibrary/ImageWidget"
import {
  SWITCH_EVENT_HANDLER_CONFIG,
  SWITCH_PANEL_CONFIG,
  SWITCH_WIDGET_CONFIG,
  SwitchWidget,
} from "@/widgetLibrary/SwitchWidget"
import {
  BUTTON_PANEL_CONFIG,
  BUTTON_WIDGET_CONFIG,
  BUTTON_EVENT_HANDLER_CONFIG,
  ButtonWidget,
} from "@/widgetLibrary/ButtonWidget"
import {
  SELECT_PANEL_CONFIG,
  SELECT_WIDGET_CONFIG,
  SELECT_EVENT_HANDLER_CONFIG,
  SelectWidget,
} from "@/widgetLibrary/SelectWidget"
import {
  INPUT_PANEL_CONFIG,
  INPUT_WIDGET_CONFIG,
  INPUT_EVENT_HANDLER_CONFIG,
  InputWidget,
} from "@/widgetLibrary/InputWidget"
import {
  RADIO_GROUP_PANEL_CONFIG,
  RADIO_GROUP_WIDGET_CONFIG,
  RADIO_GROUP_EVENT_HANDLER_CONFIG,
  RadioGroupWidget,
} from "@/widgetLibrary/RadioGroupWidget"
import {
  DATE_PANEL_CONFIG,
  DATE_WIDGET_CONFIG,
  DATE_EVENT_HANDLER_CONFIG,
  DateWidget,
} from "@/widgetLibrary/DateWidget"
import {
  DATE_TIME_PANEL_CONFIG,
  DATE_TIME_WIDGET_CONFIG,
  DATE_TIME_EVENT_HANDLER_CONFIG,
  DateTimeWidget,
} from "@/widgetLibrary/DateTimeWidget"
import {
  DATE_RANGE_PANEL_CONFIG,
  DATE_RANGE_WIDGET_CONFIG,
  DATE_RANGE_EVENT_HANDLER_CONFIG,
  DateRangeWidget,
} from "@/widgetLibrary/DateRangeWidget"
import {
  RATE_PANEL_CONFIG,
  RATE_WIDGET_CONFIG,
  RATE_EVENT_HANDLER_CONFIG,
  RateWidget,
} from "@/widgetLibrary/RateWidget"
import {
  BAR_PROGRESS_PANEL_CONFIG,
  BAR_PROGRESS_WIDGET_CONFIG,
  BarProgressWidget,
} from "@/widgetLibrary/BarProgressWidget"
import {
  CIRCLE_PROGRESS_PANEL_CONFIG,
  CIRCLE_PROGRESS_WIDGET_CONFIG,
  CircleProgressWidget,
} from "@/widgetLibrary/CircleProgressWidget"
import {
  TIMELINE_PANEL_CONFIG,
  TIMELINE_WIDGET_CONFIG,
  TimelineWidget,
} from "@/widgetLibrary/TimelineWidget"
import {
  NUMBER_INPUT_PANEL_CONFIG,
  NUMBER_INPUT_WIDGET_CONFIG,
  INPUT_NUMBER_EVENT_HANDLER_CONFIG,
  NumberInputWidget,
} from "@/widgetLibrary/NumberInputWidget"
import {
  CHECKBOX_GROUP_PANEL_CONFIG,
  CHECKBOX_GROUP_WIDGET_CONFIG,
  CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG,
  CheckboxWidget,
} from "@/widgetLibrary/CheckboxGroupWidget"
import {
  SEGMENTED_CONTROL_PANEL_CONFIG,
  SEGMENTED_CONTROL_WIDGET_CONFIG,
  SEGMENTED_CONTROL_EVENT_HANDLER_CONFIG,
  SegmentedControlWidget,
} from "@/widgetLibrary/SegmentedControlWidget"
import {
  DIVIDER_PANEL_CONFIG,
  DIVIDER_WIDGET_CONFIG,
  DividerWidget,
} from "@/widgetLibrary/DividerWidget"
import {
  EDITABLE_TEXT_PANEL_CONFIG,
  EDITABLE_TEXT_WIDGET_CONFIG,
  EDITABLE_EVENT_HANDLER_CONFIG,
  EditableTextWidget,
} from "@/widgetLibrary/EditableWidget"

export const WidgetConfig: WidgetConfigs = {
  TEXT_WIDGET: {
    widget: TextWidget,
    config: TEXT_WIDGET_CONFIG,
    panelConfig: TEXT_PANEL_CONFIG,
    eventHandlerConfig: TEXT_EVENT_HANDLER_CONFIG,
  },
  IMAGE_WIDGET: {
    widget: ImageWidget,
    config: IMAGE_WIDGET_CONFIG,
    panelConfig: IMAGE_PANEL_CONFIG,
    eventHandlerConfig: IMAGE_EVENT_HANDLER_CONFIG,
  },
  SWITCH_WIDGET: {
    widget: SwitchWidget,
    config: SWITCH_WIDGET_CONFIG,
    panelConfig: SWITCH_PANEL_CONFIG,
    eventHandlerConfig: SWITCH_EVENT_HANDLER_CONFIG,
  },
  BUTTON_WIDGET: {
    widget: ButtonWidget,
    config: BUTTON_WIDGET_CONFIG,
    panelConfig: BUTTON_PANEL_CONFIG,
    eventHandlerConfig: BUTTON_EVENT_HANDLER_CONFIG,
  },
  SELECT_WIDGET: {
    widget: SelectWidget,
    config: SELECT_WIDGET_CONFIG,
    panelConfig: SELECT_PANEL_CONFIG,
    eventHandlerConfig: SELECT_EVENT_HANDLER_CONFIG,
  },
  RADIO_GROUP_WIDGET: {
    widget: RadioGroupWidget,
    config: RADIO_GROUP_WIDGET_CONFIG,
    panelConfig: RADIO_GROUP_PANEL_CONFIG,
    eventHandlerConfig: RADIO_GROUP_EVENT_HANDLER_CONFIG,
  },
  INPUT_WIDGET: {
    widget: InputWidget,
    config: INPUT_WIDGET_CONFIG,
    panelConfig: INPUT_PANEL_CONFIG,
    eventHandlerConfig: INPUT_EVENT_HANDLER_CONFIG,
  },
  DATE_WIDGET: {
    widget: DateWidget,
    config: DATE_WIDGET_CONFIG,
    panelConfig: DATE_PANEL_CONFIG,
    eventHandlerConfig: DATE_EVENT_HANDLER_CONFIG,
  },
  DATE_RANGE_WIDGET: {
    widget: DateRangeWidget,
    config: DATE_RANGE_WIDGET_CONFIG,
    panelConfig: DATE_RANGE_PANEL_CONFIG,
    eventHandlerConfig: DATE_RANGE_EVENT_HANDLER_CONFIG,
  },
  DATE_TIME_WIDGET: {
    widget: DateTimeWidget,
    config: DATE_TIME_WIDGET_CONFIG,
    panelConfig: DATE_TIME_PANEL_CONFIG,
    eventHandlerConfig: DATE_TIME_EVENT_HANDLER_CONFIG,
  },
  RATE_WIDGET: {
    widget: RateWidget,
    config: RATE_WIDGET_CONFIG,
    panelConfig: RATE_PANEL_CONFIG,
    eventHandlerConfig: RATE_EVENT_HANDLER_CONFIG,
  },
  BAR_PROGRESS_WIDGET: {
    widget: BarProgressWidget,
    config: BAR_PROGRESS_WIDGET_CONFIG,
    panelConfig: BAR_PROGRESS_PANEL_CONFIG,
  },
  CIRCLE_PROGRESS_WIDGET: {
    widget: CircleProgressWidget,
    config: CIRCLE_PROGRESS_WIDGET_CONFIG,
    panelConfig: CIRCLE_PROGRESS_PANEL_CONFIG,
  },
  TIMELINE_WIDGET: {
    widget: TimelineWidget,
    config: TIMELINE_WIDGET_CONFIG,
    panelConfig: TIMELINE_PANEL_CONFIG,
  },
  NUMBER_INPUT_WIDGET: {
    widget: NumberInputWidget,
    config: NUMBER_INPUT_WIDGET_CONFIG,
    panelConfig: NUMBER_INPUT_PANEL_CONFIG,
    eventHandlerConfig: INPUT_NUMBER_EVENT_HANDLER_CONFIG,
  },
  CHECKBOX_GROUP_WIDGET: {
    widget: CheckboxWidget,
    config: CHECKBOX_GROUP_WIDGET_CONFIG,
    panelConfig: CHECKBOX_GROUP_PANEL_CONFIG,
    eventHandlerConfig: CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG,
  },
  SEGMENTED_CONTROL_WIDGET: {
    widget: SegmentedControlWidget,
    config: SEGMENTED_CONTROL_WIDGET_CONFIG,
    panelConfig: SEGMENTED_CONTROL_PANEL_CONFIG,
    eventHandlerConfig: SEGMENTED_CONTROL_EVENT_HANDLER_CONFIG,
  },
  DIVIDER_WIDGET: {
    widget: DividerWidget,
    config: DIVIDER_WIDGET_CONFIG,
    panelConfig: DIVIDER_PANEL_CONFIG,
  },
  EDITABLE_TEXT_WIDGET: {
    widget: EditableTextWidget,
    config: EDITABLE_TEXT_WIDGET_CONFIG,
    panelConfig: EDITABLE_TEXT_PANEL_CONFIG,
    eventHandlerConfig: EDITABLE_EVENT_HANDLER_CONFIG,
  },
}

export type WidgetType = keyof typeof WidgetConfig

export const WidgetTypeList = Object.keys(WidgetConfig)

export const widgetBuilder = (type: WidgetType) => {
  return WidgetConfig[type]
}
