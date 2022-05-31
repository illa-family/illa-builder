import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { SerializedStyles } from "@emotion/serialize"
import { MAIN_CONTAINER_ID } from "@/page/Editor/constants"

export function applyWidgetStyle(id: string, focus: boolean): SerializedStyles {
  const notCanvas = id !== MAIN_CONTAINER_ID
  let statusStyle = css``
  if (notCanvas) {
    statusStyle = css`
      &:hover {
        border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
      }
    `
  }
  return css`
    padding: 3px;
    border: 1px solid transparent;
    ${focus
      ? css`
          border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
        `
      : ""}
    ${statusStyle}
  `
}
