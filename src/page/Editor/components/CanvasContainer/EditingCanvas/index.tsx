import { FC } from "react"
import { controlStyle } from "./style"
import { useSelector } from "react-redux"
import {
  getEditing,
  getWidgetStates,
} from "@/redux/currentApp/editor/widgetStates/widgetStateSelector"

export const EditingCanvas: FC = (props) => {
  const { dragDetails } = useSelector(getWidgetStates)
  const edit = useSelector(getEditing)

  return (
    <div css={controlStyle}>
      {edit?.map((item) => {
        const offset = dragDetails[item?.id ?? ""]?.dragOffset
        const differenceOffsetLeft = offset?.differenceOffsetLeft ?? 0
        const differenceOffsetTop = offset?.differenceOffsetTop ?? 0
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
