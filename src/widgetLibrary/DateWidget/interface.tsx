import { ReactNode } from "react"
import { DatePickerProps } from "@illa-design/date-picker"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedDateProps
  extends Pick<
    DatePickerProps,
    "value" | "readOnly" | "disabled" | "placeholder" | "colorScheme"
  > {
  value?: string
  dateFormat?: string
  loading?: boolean
  showClear?: DatePickerProps["allowClear"]
  beforeIcon?: ReactNode // TODO: not support yet
  Aftericon?: ReactNode // TODO: not support yet
  beforeText?: string // TODO: not support yet
  afterText?: string // TODO: not support yet
  minDate?: string
  maxDate?: string
  handleUpdateDsl: (value: any) => void
}

export interface DateWidgetProps extends WrappedDateProps, BaseWidgetProps {}
