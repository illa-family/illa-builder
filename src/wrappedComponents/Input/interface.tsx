import { ValidateCheckProps } from "../ValidateCheck/interface"
import { InputProps } from "@illa-design/input"

export interface WrappedInputProps
  extends Omit<InputProps, "maxLength" | "minLength" | "pattern">,
    ValidateCheckProps {
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  invalid?: boolean
  hideValidationMessage?: boolean
  customRule?: (value?: string) => boolean
  showCharacterCount?: boolean
}
