import { FC } from "react"
import { invalidateMessageCss } from "./style"
import { WarningCircleIcon } from "@illa-design/icon"
import { handleValidateCheck } from "./utils"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"

export const InvalidMessage: FC<ValidateMessageProps> = (props) => {
  const { value, hideValidationMessage, customRule, ...res } = props

  const message = customRule ?? handleValidateCheck({ value, ...res })
  const showMessage = !hideValidationMessage && message && message.length > 0

  return (
    <>
      {showMessage && (
        <span css={invalidateMessageCss}>
          <WarningCircleIcon />
          {message}
        </span>
      )}
    </>
  )
}
