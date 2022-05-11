import { FC, useMemo, useRef } from "react"

import { WrappedInputProps } from "./interface"
import Label from "../Label"
import { Wrapper } from "../Wrapper"
import { Input } from "@illa-design/input"
import { handleValidateCheck } from "../ValidateCheck"
import { ValidateCheckProps } from "../ValidateCheck/interface"

export const WrappedInput: FC<WrappedInputProps> = (props) => {
  const {
    readOnly = true,
    invalid,
    maxLength,
    minLength,
    pattern,
    regex,
    customRule,
    required = true,
    showCharacterCount = true,
    ...res
  } = props

  const validateProps: ValidateCheckProps = props

  const inputRef = useRef<HTMLInputElement>(null)

  if (readOnly) {
    if (inputRef && inputRef.current) {
      inputRef.current.onclick = (e) => {
        e.stopImmediatePropagation()
        e.stopPropagation()
        console.log("readOnly")
      }
    }
  }

  const needValidateCheck = useMemo(() => {
    if (invalid !== undefined) return false
    return maxLength || minLength || pattern || regex || customRule
  }, [invalid, maxLength, minLength, pattern, regex, customRule])

  return (
    <div>
      <Wrapper w={"300px"}>
        <Label label="testLabel" labelPosition={"left"} required={required} />
        <Input
          ref={inputRef}
          onChange={(value) => {
            needValidateCheck && handleValidateCheck(value, validateProps)
            customRule && customRule(value)
          }}
          {...res}
          showCount={true}
          maxLength={10}
        />
      </Wrapper>
    </div>
  )
}
WrappedInput.displayName = "WrappedInput"
