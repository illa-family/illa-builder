import { DraggingGroupCenter } from "./widgetStatesState"

export interface SetNewWidgetDraggingPayload {
  isDragging: boolean
  widgetProps: any
}

export interface SetWidgetDraggingPayload {
  isDragging: boolean
  dragGroupActualParent?: string
  draggingGroupCenter?: DraggingGroupCenter
  id?: string
  dragOffset?: any
  startPoints?: any
}
