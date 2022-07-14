import { forwardRef } from "react"
import { Alert } from "@illa-design/alert"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { WrappedAlertProps } from "./interface"

export const WrappedAlert = forwardRef<any, WrappedAlertProps>(
  (props, ref) => {
    const {
      type,
      title,
      content,
    } = props

    return (
      <div css={containerStyle}>
        <Alert
          type={type}
          title={title}
          content={content}
        />
      </div>
    )
  }
)

WrappedAlert.displayName = "WrappedAlert"

export const AlertWidget = WrappedAlert