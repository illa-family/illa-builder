import { RootState } from "@/store"

export const getWidgetStates = (state: RootState) =>
  state.currentApp.editor.widgetStates

export const getFocusedWidget = (state: RootState) =>
  state.currentApp.editor.widgetStates.focusedWidget

export const getDragDetails = (state: RootState) =>
  state.currentApp.editor.widgetStates.dragDetails
