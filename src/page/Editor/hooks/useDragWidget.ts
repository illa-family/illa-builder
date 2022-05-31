import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { widgetStatesActions } from "@/redux/currentApp/editor/widgetStates/widgetStatesSlice"
import { SetWidgetDraggingPayload } from "@/redux/currentApp/editor/widgetStates/widgetStatesPayload"

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
        dragGroupActualParent,
        draggingGroupCenter,
        id,
        dragOffset,
        startPoints,
      }: SetWidgetDraggingPayload) => {
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
            id,
            dragOffset,
            startPoints,
          }),
        )
      },
      [dispatch],
    ),
    setDraggingCanvas: useCallback(
      (id: string, draggedOn: string) => {
        widgetStatesActions.setDraggingOn({ id, draggedOn })
      },
      [dispatch],
    ),
  }
}
