import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import store from "@/store"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"
import { dottedLineSquareActions } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"

export function startDrag(dragNode: ComponentNode, exist: boolean) {
  store.dispatch(configActions.updateShowDot(true))
  store.dispatch(
    componentsActions.updateComponentDraggingState({
      displayName: dragNode.displayName,
      isDragging: true,
    }),
  )
  if (exist) {
    store.dispatch(configActions.updateSelectedComponent([dragNode]))
  }
}

export function endDrag(dragNode: ComponentNode) {
  store.dispatch(configActions.updateShowDot(false))
  store.dispatch(
    componentsActions.updateComponentDraggingState({
      displayName: dragNode.displayName,
      isDragging: false,
    }),
  )
  // remove dotted line square
  store.dispatch(
    dottedLineSquareActions.removeDottedLineSquareReducer(dragNode.displayName),
  )
  // remove drag
  store.dispatch(
    dragShadowActions.removeDragShadowReducer(dragNode.displayName),
  )
  if (
    searchDsl(
      store.getState().currentApp.editor.components,
      dragNode.displayName,
    ) == null
  ) {
    store.dispatch(
      displayNameActions.removeDisplayNameReducer(dragNode.displayName),
    )
  }
}
