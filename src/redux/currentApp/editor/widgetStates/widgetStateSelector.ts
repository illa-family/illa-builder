import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { getWidgetStateById } from "@/redux/currentApp/editor/dsl/dslSelector"
import { createSelector } from "@reduxjs/toolkit"

export const getWidgetStates = (state: RootState) =>
  state.currentApp.editor.widgetStates

export const getWidgetResizingOrDragging = (state: RootState) =>
  !!state.currentApp.editor.widgetStates.isResizing ||
  !!state.currentApp.editor.widgetStates.isDragging

export const getFocusedWidget = (state: RootState) =>
  state.currentApp.editor.widgetStates.focusedWidget

export const getDragDetails = (state: RootState) =>
  state.currentApp.editor.widgetStates.dragDetails

export const getEditing = (state: RootState) => {
  const { selectedWidgets } = getWidgetStates(state)
  const isResizingOrDragging = getWidgetResizingOrDragging(state)
  if (isResizingOrDragging) {
    return selectedWidgets.map((id: string) => getWidgetStateById(state, id))
  }
  return []
}
