import { forwardRef } from "react"
import { Alert } from "@illa-design/alert"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { WrappedAlertProps } from "./interface"

export const WrappedAlert = forwardRef<HTMLDivElement, WrappedAlertProps>((props, ref) => {
  const { type, title, content, closable, showIcon } = props

  return (
    <div css={containerStyle}>
      <Alert
        type={type}
        title={title}
        content={content}
        closable={closable}
        showIcon={showIcon}
      />
    </div>
  )
})

WrappedAlert.displayName = "WrappedAlert"

export const AlertWidget = WrappedAlert
