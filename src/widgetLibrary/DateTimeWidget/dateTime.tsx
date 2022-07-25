import { FC, forwardRef, useCallback, useEffect, useState } from "react"
import dayjs from "dayjs"
import { DatePicker } from "@illa-design/date-picker"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { DateTimeWidgetProps, WrappedDateTimeProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedDateTime = forwardRef<any, WrappedDateTimeProps>(
  (props, ref) => {
    const {
      value,
      dateFormat,
      placeholder,
      showClear,
      required,
      minDate,
      disabled,
      maxDate,
      readOnly,
      minuteStep,
      timeFormat,
      hideValidationMessage,
      colorScheme,
      handleUpdateDsl,
    } = props

    const [currentValue, setCurrentValue] = useState(value)

    const checkRange = useCallback(
      (current) => {
        const beforeMinDate = minDate
          ? !!current?.isBefore(dayjs(minDate))
          : false
        const afterMaxDate = maxDate
          ? !!current?.isAfter(dayjs(maxDate))
          : false
        return beforeMinDate || afterMaxDate
      },
      [minDate, maxDate],
    )

    return (
      <div css={containerStyle}>
        <DatePicker
          showTime={{ step: { minute: minuteStep }, format: timeFormat }}
          colorScheme={colorScheme}
          format={dateFormat}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          placeholder={placeholder}
          allowClear={showClear}
          disabledDate={checkRange}
          onClear={() => {
            setCurrentValue(undefined)
            handleUpdateDsl({ value: "" })
          }}
          onChange={(value) => {
            setCurrentValue(value)
            handleUpdateDsl({ value })
          }}
        />
        <InvalidMessage
          value={currentValue}
          required={required}
          hideValidationMessage={hideValidationMessage}
        />
      </div>
    )
  },
)

WrappedDateTime.displayName = "WrappedDateTime"

export const DateTimeWidget: FC<DateTimeWidgetProps> = (props) => {
  const {
    value,
    dateFormat,
    placeholder,
    showClear,
    required,
    minDate,
    disabled,
    maxDate,
    readOnly,
    minuteStep,
    timeFormat,
    hideValidationMessage,
    colorScheme,
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateDsl,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      dateFormat,
      placeholder,
      showClear,
      required,
      minDate,
      disabled,
      maxDate,
      readOnly,
      minuteStep,
      timeFormat,
      hideValidationMessage,
      colorScheme,
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: "" })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    value,
    dateFormat,
    placeholder,
    showClear,
    required,
    minDate,
    disabled,
    maxDate,
    readOnly,
    minuteStep,
    timeFormat,
    hideValidationMessage,
    colorScheme,
  ])
  return <WrappedDateTime {...props} />
}

DateTimeWidget.displayName = "DateTimeWidget"
