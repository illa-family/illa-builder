import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { DragLayerProps } from "./index"
import {
  CONTAINER_GRID_PADDING,
  GRID_POINT_SIZE,
  GridDefaults,
} from "@/page/Editor/constants"

export function applyDragLayer(props: DragLayerProps): SerializedStyles {
  return css`
    position: absolute;
    pointer-events: none;
    left: ${props.noPad ? "0" : `${CONTAINER_GRID_PADDING}px`};
    top: ${props.noPad ? "0" : `${CONTAINER_GRID_PADDING}px`};
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle at ${GRID_POINT_SIZE}px ${GRID_POINT_SIZE}px,
      ${globalColor(`--${illaPrefix}-grayBlue-08`)} ${GRID_POINT_SIZE}px,
      transparent 0
    );
    background-size: calc(100% / ${GridDefaults.DEFAULT_GRID_COLUMNS}) ${GridDefaults.DEFAULT_GRID_ROW_HEIGHT}px;
  `
}
