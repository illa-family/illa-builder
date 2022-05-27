import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { SerializedStyles } from "@emotion/serialize"

export function applyWidgetStyle(foucs: boolean): SerializedStyles {
  return css`
    padding: 3px;
    ${foucs ? css`
      border: 1px solid ${globalColor(`--${illaPrefix}-techPurple-01`)};
    ` : ""}
  `
}
