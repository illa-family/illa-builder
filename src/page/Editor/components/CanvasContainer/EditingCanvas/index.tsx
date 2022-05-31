import { FC } from "react"
import { controlStyle } from "./style"
import { useSelector } from "react-redux"
import {
  getEditing,
  getWidgetStates,
} from "@/redux/currentApp/editor/widgetStates/widgetStateSelector"

export const EditingCanvas: FC = (props) => {
  const { isDragging, isResizing, dragDetails } = useSelector(getWidgetStates)
  const isResizingOrDragging = !!isResizing || !!isDragging
  const edit = useSelector(getEditing)

  console.log(edit, "editing")
  return (
    <div css={controlStyle}>
      {edit?.map((item) => {
        const offset = dragDetails[item?.id ?? ""]?.dragOffset
        const differenceOffsetLeft = offset?.differenceOffsetLeft ?? 0
        const differenceOffsetTop = offset?.differenceOffsetTop ?? 0
        console.log(item?.id, offset, "map")
        return (
          <div
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              border: "solid 0.5px #654aec",
              top: item?.props?.topRow,
              left: item?.props?.leftColumn,
              transform: `translateX(${differenceOffsetLeft}px)
              translateY(${differenceOffsetTop}px)`,
            }}
          >
            test
          </div>
        )
      })}
    </div>
  )
}

EditingCanvas.displayName = "EditingCanvas"
