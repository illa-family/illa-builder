import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { MAIN_CONTAINER_ID } from "@/page/Editor/constants"
import { WidgetDragResizeState } from "./widgetStatesState"
import {
  SetNewWidgetDraggingPayload,
  SetWidgetDraggingPayload,
} from "./widgetStatesPayload"
import { v4 as uuidv4 } from "uuid"

export const setNewWidgetDragging: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<SetNewWidgetDraggingPayload>
> = (state, action) => {
  const {
    isDragging,
    widgetProps,
    widgetProps: { id },
  } = action.payload
  state.isDragging = isDragging
  const newId = id ?? "newId"
  if (isDragging) {
    state.dragDetails[newId] = {
      newWidget: widgetProps,
      draggedOn: MAIN_CONTAINER_ID,
    }
  } else {
    delete state.dragDetails[newId]
  }
}

export const setWidgetDragging: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<SetWidgetDraggingPayload>
> = (state, action) => {
  const {
    isDragging,
    id,
    dragGroupActualParent = "",
    draggingGroupCenter = {},
    ...rest
  } = action.payload

  state.isDragging = isDragging

  if (isDragging && id) {
    state.dragDetails[id] = {
      ...state.dragDetails[id],
      ...rest,
    }
  } else {
    delete state.dragDetails[id ?? ""]
  }
}

export const setDraggingOn: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<{
    draggedOn: string
    id: string
  }>
> = (state, action) => {
  const { draggedOn, id } = action.payload

  state.dragDetails[id] = {
    draggedOn,
  }
}

// resize
export const setWidgetResizing: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<boolean>
> = (state, action) => {
  state.isResizing = action.payload
}

// select
export const selectWidget: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<{ id?: string; isMultiSelect?: boolean }>
> = (state, action) => {
  if (action.payload.id === MAIN_CONTAINER_ID) return
  if (action.payload.isMultiSelect) {
    const id = action.payload.id || ""
    const removeSelection = state.selectedWidgets.includes(id)
    if (removeSelection) {
      state.selectedWidgets = state.selectedWidgets.filter(
        (each) => each !== id,
      )
    } else if (!!id) {
      state.selectedWidgets = [...state.selectedWidgets, id]
    }
    if (state.selectedWidgets.length > 0) {
      state.lastSelectedWidget = removeSelection ? "" : id
    }
  } else {
    state.lastSelectedWidget = action.payload.id
    if (action.payload.id) {
      state.selectedWidgets = [action.payload.id]
    } else {
      state.selectedWidgets = []
    }
  }
}

export const selectMultipleWidgets: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<{ ids?: string[] }>
> = (state, action) => {
  const { ids } = action.payload
  if (ids) {
    state.selectedWidgets = ids || []
    if (ids.length > 1) {
      state.lastSelectedWidget = ""
    } else {
      state.lastSelectedWidget = ids[0]
    }
  }
}

export const focusWidget: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<{ id?: string }>
> = (state, action) => {
  state.focusedWidget = action.payload.id
}
