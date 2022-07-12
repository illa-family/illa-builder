import { RadioGroupProps } from "@illa-design/radio"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedSegmentedControlProps
  extends Pick<
    RadioGroupProps<any>,
    "value" | "disabled" | "options" | "direction" | "colorScheme"
  > {
  handleUpdateDsl: (value: any) => void
}

export interface SegmentedControlWidgetProps
  extends WrappedSegmentedControlProps,
    BaseWidgetProps {
  optionConfigureMode?: "dynamic" | "static"
  manualOptions?: {
    label: string
    value: string | number
    disabled?: boolean
    extra?: any
  }[]
  mappedOption?: {
    labels: string[]
    values: any[]
    disables: boolean[]
  }
}
