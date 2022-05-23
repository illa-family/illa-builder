import { BuilderState } from "@/redux/reducers/interface"
import { DSLWidget } from "@/wrappedComponents/DraggableComponent/interface"

export const getEditorDsl = (state: BuilderState) => state.editor.present.dsl

// 调试用。
export const getSelectedWidgetStates = (state: BuilderState) =>
  state.editor.present.widgetStates.selectedWidgets

// 调试用。
export const getWidgetStateById = (state: BuilderState, id?: string) => {
  const current = getEditorDsl(state).root
  const queue = new Array<DSLWidget>()
  queue.push(current)
  while (queue.length) {
    const head = queue[queue.length - 1]

    if (head.id === id) {
      return head
    }
    queue.pop()
    if (head.children && head.children.length) {
      queue.push(...head.children)
    }
  }
  return null
}
