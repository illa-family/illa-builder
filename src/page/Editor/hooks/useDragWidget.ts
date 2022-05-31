import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { widgetStatesActions } from "@/redux/editor/widgetStates/widgetStatesSlice"

export const useDragWidget = () => {
  const dispatch = useDispatch()
  return {
    setDraggingNewWidget: useCallback(
      (isDragging: boolean, widgetProps: any) => {
        if (isDragging) {
          document.body.classList.add("dragging")
        } else {
          document.body.classList.remove("dragging")
        }
        dispatch(
          widgetStatesActions.setNewWidgetDragging({ isDragging, widgetProps }),
        )
      },
      [dispatch],
    ),
    setDraggingState: useCallback(
      ({
        isDragging,
        dragGroupActualParent = "",
        draggingGroupCenter = {},
        startPoints,
        dragOffset,
      }: {
        isDragging: boolean
        dragGroupActualParent?: string
        draggingGroupCenter?: Record<string, any>
        startPoints?: any
        dragOffset?: any
      }) => {
        if (isDragging) {
          document.body.classList.add("dragging")
        } else {
          document.body.classList.remove("dragging")
        }
        dispatch(
          widgetStatesActions.setWidgetDragging({
            isDragging,
            dragGroupActualParent,
            draggingGroupCenter,
            startPoints,
            dragOffset,
          }),
        )
      },
      [dispatch],
    ),
    setDraggingCanvas: useCallback(
      (draggedOn: string) => {
        widgetStatesActions.setDraggingOn({ draggedOn })
      },
      [dispatch],
    ),
  }
}
