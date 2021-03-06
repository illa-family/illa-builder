import { FC, forwardRef, useEffect, useRef } from "react"
import { Input } from "@illa-design/input"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { InputWidgetProps, WrappedInputProps } from "./interface"

export const WrappedInput = forwardRef<HTMLInputElement, WrappedInputProps>(
  (props, ref) => {
    const {
      value,
      placeholder,
      disabled,
      readOnly,
      prefixIcon,
      prefixText,
      suffixIcon,
      suffixText,
      showCharacterCount,
      colorScheme,
      handleUpdateDsl,
      allowClear,
      maxLength,
      minLength,
    } = props

    return (
      <div css={containerStyle}>
        <Input
          inputRef={ref}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          prefix={prefixIcon}
          addonBefore={{ render: prefixText, custom: false }}
          suffix={suffixIcon}
          addonAfter={{ render: suffixText, custom: false }}
          onChange={(value) => {
            handleUpdateDsl({ value })
          }}
          showCount={showCharacterCount}
          borderColor={colorScheme}
          allowClear={allowClear}
          onClear={() => {
            handleUpdateDsl({ value: "" })
          }}
          maxLength={maxLength}
          minLength={minLength}
        />
      </div>
    )
  },
)
WrappedInput.displayName = "WrappedInput"

export const InputWidget: FC<InputWidgetProps> = (props) => {
  const {
    value,
    placeholder,
    disabled,
    readOnly,
    prefixIcon,
    prefixText,
    suffixIcon,
    suffixText,
    showCharacterCount,
    colorScheme,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    allowClear,
    minLength,
    maxLength,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      value,
      placeholder,
      disabled,
      readOnly,
      prefixIcon,
      prefixText,
      suffixIcon,
      suffixText,
      showCharacterCount,
      colorScheme,
      allowClear,
      minLength,
      maxLength,
      focus: () => {
        inputRef.current?.focus()
      },
      setValue: (value: boolean | string | number | void) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      validate: () => {},
      clearValidation: () => {},
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    value,
    placeholder,
    disabled,
    readOnly,
    prefixIcon,
    prefixText,
    suffixIcon,
    suffixText,
    showCharacterCount,
    colorScheme,
    displayName,
    allowClear,
    minLength,
    maxLength,
  ])
  return <WrappedInput {...props} ref={inputRef} />
}

InputWidget.displayName = "InputWidget"
