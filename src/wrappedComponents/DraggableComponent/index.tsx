import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties,
} from "react"
import Moveable from "react-moveable"
import { useDispatch, useSelector } from "react-redux"
import { Frame } from "scenejs"
import { MAIN_CONTAINER_ID } from "@/page/Editor/constants/dragConfig"
import { useDragWidget } from "@/page/Editor/hooks/useDragWidget"
import { useSelectWidget } from "@/page/Editor/hooks/useSelectWidget"
import { dslActions } from "@/redux/reducers/editorReducer/dslReducer"
import { DslActionName } from "@/redux/reducers/editorReducer/dslReducer/dsl-action"
import { getPreviewMode } from "@/redux/selectors/editorSelectors/modeSelectors"
import {
  getFocusedWidget,
  getWidgetStates,
} from "@/redux/selectors/editorSelectors/widgetStateSelectors"
import { BaseProps, DraggableComponentProps } from "./interface"
import { updateWidgetProps, WidgetConfig } from "../utils"

export const WIDGET_PADDING = 4

export const DraggableComponent: FC<DraggableComponentProps> = (baseProps) => {
  const {
    children,
    id,
    parentId,
    type,
    props,
    props: {
      topRow,
      bottomRow,
      leftColumn,
      rightColumn,
      parentRowSpace = 1,
      parentColumnSpace = 1,
      dragDisabled,
      //
      width,
      height,
    },
  } = baseProps
  const dispatch = useDispatch()
  const ref = useRef<Moveable>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<HTMLDivElement | null>()
  const isPreviewMode = useSelector(getPreviewMode)
  const { isDragging, isResizing, isDraggingDisabled, selectedWidgets } =
    useSelector(getWidgetStates)
  const isResizingOrDragging = !!isResizing || !!isDragging
  const draggable =
    isResizingOrDragging &&
    !isDraggingDisabled &&
    !dragDisabled &&
    !isPreviewMode

  const isCurrentWidgetSelected = selectedWidgets.includes(id)
  const { focusWidget, selectWidget } = useSelectWidget()
  const { setDraggingCanvas, setDraggingState } = useDragWidget()
  const focusedWidget = useSelector(getFocusedWidget)
  const isCurrentWidgetFocused = focusedWidget === id
  const [frame, setFrame] = useState<Frame>()

  const onWindowResize = useCallback(() => {
    ref.current!!.updateTarget()
  }, [])

  useEffect(() => {
    setTarget(window.document.querySelector<HTMLDivElement>(`#${id}`))
    setFrame(new Frame("transform: translateX(0px) translateY(0px)"))
    window.addEventListener("resize", onWindowResize)
    return () => {
      window.removeEventListener("resize", onWindowResize)
    }
  }, [onWindowResize])

  // When mouse is over this draggable
  const handleMouseOver = (e: any) => {
    focusWidget &&
      !isResizingOrDragging &&
      !isCurrentWidgetFocused &&
      focusWidget(id)
    e.stopPropagation()
  }

  const getSize = (num: number) => `${num ?? 0}px`

  const getWidgetPositionStyle = (props: BaseProps["props"]): CSSProperties => {
    const {
      topRow,
      bottomRow,
      leftColumn,
      rightColumn,
      parentRowSpace = 1,
      parentColumnSpace = 1,
    } = props
    return {
      position: "absolute",
      top: topRow * parentRowSpace,
      left: leftColumn * parentColumnSpace,
      width: !!rightColumn
        ? (rightColumn - leftColumn) * parentColumnSpace
        : "100%",
      height: !!bottomRow ? (bottomRow - topRow) * parentRowSpace : "100%",
      padding: id === MAIN_CONTAINER_ID ? "unset" : WIDGET_PADDING,
    }
  }

  return (
    <div
      id={id}
      style={getWidgetPositionStyle(props)}
      ref={wrapperRef}
      onClick={handleMouseOver}
    >
      <Moveable
        ref={ref}
        target={target}
        throttleDrag={1}
        keepRatio={false}
        draggable={id !== MAIN_CONTAINER_ID}
        resizable={id !== MAIN_CONTAINER_ID}
        scalable={false}
        rotatable={false}
        origin={false}
        renderDirections={id !== MAIN_CONTAINER_ID}
        onDragStart={(e) => {
          if (!isCurrentWidgetSelected) {
            selectWidget(id)
          }
          const bounds = e.target.getBoundingClientRect()
          const startPoints = {
            top: bounds.top,
            left: bounds.left,
          }
          parentId && setDraggingCanvas(parentId)
          setDraggingState({
            isDragging: true,
            dragGroupActualParent: parentId || "",
            draggingGroupCenter: { id: id },
            startPoints,
          })
          // set frame
          if (frame != null) {
            frame.set("transform", "translateX", `0px`)
            frame.set("transform", "translateY", `0px`)
          }
        }}
        onDrag={(translate) => {
          if (frame != null) {
            frame.set(
              "transform",
              "translateX",
              `${translate.beforeTranslate[0]}px`,
            )
            frame.set(
              "transform",
              "translateY",
              `${translate.beforeTranslate[1]}px`,
            )
            translate.target.style.cssText += frame.toCSS()
          }
        }}
        onDragEnd={() => {
          if (frame != null && target != null && ref != null) {
            const { children, ...currentProps } = baseProps
            const lastFrame = new Frame(`left: ${leftColumn}; top: ${topRow}`)
            let newProps = updateWidgetProps(currentProps as WidgetConfig, {
              leftColumn:
                parseFloat(lastFrame.get("left") ?? 0) +
                parseFloat(frame.get("transform", "translateX") ?? 0),
              topRow:
                parseFloat(lastFrame.get("top") ?? 0) +
                parseFloat(frame.get("transform", "translateY") ?? 0),
            })
            dispatch(
              dslActions.dslActionHandler({
                type: DslActionName.UpdateItem,
                newDslText: newProps,
              }),
            )
            target.style.cssText += new Frame(
              "transform: translateX(0px) translateY(0px)",
            ).toCSS()
          }
        }}
      />
      {children}
    </div>
  )
}

DraggableComponent.displayName = "DraggableComponent"
