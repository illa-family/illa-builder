import { FC } from "react"
import { ScaleSquareProps } from "@/page/App/components/ScaleSquare/interface"
import {
  applyBarPointerStyle,
  applyInnerStyle,
  applyOuterStyle,
  applySquarePointerStyle,
  applyTransformWidgetStyle,
} from "@/page/App/components/ScaleSquare/style"
import { TransformWidget } from "@/wrappedComponents/TransformWidget"
import { useDispatch } from "react-redux"
import { configActions } from "@/redux/currentApp/config/configSlice"

export const ScaleSquare: FC<ScaleSquareProps> = (props) => {
  const { w, h, componentNode, className, ...otherProps } = props
  const scaleSquareState = componentNode.error ? "error" : "normal"
  const dispatch = useDispatch()
  return (
    <div
      css={applyOuterStyle(h, w)}
      className={className}
      onClick={() => {
        dispatch(configActions.updateSelectedComponent([componentNode]))
      }}
      {...otherProps}
    >
      <div css={applyTransformWidgetStyle(scaleSquareState)}>
        <TransformWidget componentNode={componentNode} />
      </div>
      <div css={applySquarePointerStyle(scaleSquareState, "tl")} />
      <div css={applySquarePointerStyle(scaleSquareState, "tr")} />
      <div css={applySquarePointerStyle(scaleSquareState, "bl")} />
      <div css={applySquarePointerStyle(scaleSquareState, "br")} />
      <div css={applyBarPointerStyle(scaleSquareState, "l")} />
      <div css={applyBarPointerStyle(scaleSquareState, "t")} />
      <div css={applyBarPointerStyle(scaleSquareState, "r")} />
      <div css={applyBarPointerStyle(scaleSquareState, "b")} />
    </div>
  )
}
