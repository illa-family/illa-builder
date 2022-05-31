import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Frame } from "scenejs"
import { MAIN_CONTAINER_ID } from "@/page/Editor/constants/dragConfig"
import { useDragWidget } from "@/page/Editor/hooks/useDragWidget"
import { useSelectWidget } from "@/page/Editor/hooks/useSelectWidget"
import { dslActions } from "@/redux/editor/dsl/dslSlice"
import { DraggableComponentProps } from "./interface"
import { getPreviewMode } from "@/redux/editor/mode/modeSelector"
import {
  getFocusedWidget,
  getWidgetStates,
} from "@/redux/editor/widgetStates/widgetStateSelector"
import { useDrag, useDragLayer } from "react-dnd"
import { css } from "@emotion/react"
import { getEmptyImage } from "react-dnd-html5-backend"
import { applyWidgetStyle } from "./style"

export const DraggableComponent: FC<DraggableComponentProps> = (baseProps) => {
  const {
    children,
    id,
    parentId,
    type,
    props,
    widgetName,
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
    ...rest
  } = baseProps
  const previewId = "preview" + id
  const dispatch = useDispatch()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<HTMLDivElement | null>()
  const [offset, setOffset] = useState({
    topRow,
    leftColumn,
  })
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
  const isCurrentWidgetFocused =
    focusedWidget === id && id !== MAIN_CONTAINER_ID

  // When mouse is over this draggable
  const handleFocus = () => {
    focusWidget &&
      !isResizingOrDragging &&
      !isCurrentWidgetFocused &&
      focusWidget(id)
  }

  const {
    itemType,
    item,
    widgetDragging,
    differenceOffsetTop,
    differenceOffsetLeft,
  } = useDragLayer((monitor) => {
    const dragType = monitor.getItemType()
    const item = monitor.getItem()
    const differenceOffsetTop = monitor.getDifferenceFromInitialOffset()?.y ?? 0
    const differenceOffsetLeft =
      monitor.getDifferenceFromInitialOffset()?.x ?? 0

    return {
      item,
      itemType: monitor.getItemType(),
      widgetDragging:
        monitor.isDragging() && dragType === "dragWidget" && item?.id === id,
      differenceOffsetTop,
      differenceOffsetLeft,
    }
  })

  const [{ opacity }, drag, dragPreview] = useDrag(() => {
    return {
      type: "dragWidget",
      item: {
        id,
        hasDropped: false,
        type: "dragWidget",
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
      end: (item, monitor) => {
        const { children, props, ...currentProps } = baseProps
        const parent = window.document.querySelector<HTMLDivElement>(`#${id}`)
        const differenceOffsetTop =
          monitor.getDifferenceFromInitialOffset()?.y ?? 0
        const differenceOffsetLeft =
          monitor.getDifferenceFromInitialOffset()?.x ?? 0
        const offset = {
          topRow:
            parseFloat(parent?.style?.top?.slice(0, -2) ?? "0") +
            differenceOffsetTop +
            "px",
          leftColumn:
            parseFloat(parent?.style?.left?.slice(0, -2) ?? "0") +
            differenceOffsetLeft +
            "px",
        }

        dispatch(
          dslActions.dslActionHandler({
            type: "UpdateItem",
            dslFrame: {
              ...currentProps,
              props: {
                ...props,
                ...offset,
              },
            },
          }),
        )
        setDraggingState({
          isDragging: false,
        })
      },
      canDrag: id !== MAIN_CONTAINER_ID,
      dropEffect: "move",
    }
  }, [])

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  return (
    <div
      id={id}
      style={{
        height: height,
        width: width,
        top: topRow,
        left: leftColumn,
        position: "absolute",
      }}
      css={applyWidgetStyle(isCurrentWidgetFocused)}
      ref={wrapperRef}
      {...rest}
    >
      {widgetDragging ? (
        <div
          ref={previewRef}
          id={previewId}
          css={css`
            position: absolute;
            top: 0;
            border: solid 0.5px #654aec;
            width: 100%;
            height: 100%;
            pointer-events: none;
            transform: translateX(${differenceOffsetLeft}px)
              translateY(${differenceOffsetTop}px);
          `}
        />
      ) : null}
      <div
        ref={id !== MAIN_CONTAINER_ID ? drag : null}
        style={{
          width: "100%",
          height: "100%",
          opacity,
        }}
        onDragStart={() => {
          if (!isCurrentWidgetSelected) {
            selectWidget(id)
          }
          handleFocus()
          parentId && setDraggingCanvas(id)
          setDraggingState({
            isDragging: true,
            dragGroupActualParent: parentId || "",
            draggingGroupCenter: { id: id },
            startPoints: {
              top: topRow,
              left: leftColumn,
            }
          })
        }}
      >
        {children}
      </div>
    </div>
  )
}

DraggableComponent.displayName = "DraggableComponent"
