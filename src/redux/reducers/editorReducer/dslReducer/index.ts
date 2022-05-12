import { createSlice } from "@reduxjs/toolkit"
import { DslLayout, DslNode, DslState } from "./interface"
import { AddFrame, AddText, DslActionName, UpdateText } from "./dsl-action"
import { MAIN_CONTAINER_ID, Category, DslType } from "@/page/Editor/constants/dragConfig"

const initialState = {
  root: {
    dslKey: "dslRoot",
    parentKey: MAIN_CONTAINER_ID,
    version: "0.0.1",
    nodeChildren: [],
    type: DslType.DslFrame,
    category: Category.Layout,
    height: "auto",
    width: "auto",
    left: "auto",
    right: "auto",
    top: "auto",
    bottom: "auto",
    position: "absolute",
  },
} as DslState

function addNode(
  currentState: DslState,
  parentKey: string,
  dslNode: DslNode,
): DslState {
  // 只有 layout 才可以没有parent
  if (parentKey == MAIN_CONTAINER_ID) {
    if (dslNode.category == Category.Layout) {
      return {
        ...currentState,
        root: dslNode as DslLayout,
      }
    } else {
      return currentState
    }
  } else {
    addNode2Layout(parentKey, currentState.root!!, dslNode)
    return currentState
  }
}

function addNode2Layout(
  parentKey: string,
  dslLayout: DslLayout,
  dslNode: DslNode,
) {
  if (dslLayout.dslKey == parentKey) {
    if (
      !dslLayout.nodeChildren.some((value) => {
        return dslNode.dslKey == value.dslKey
      })
    ) {
      dslLayout.nodeChildren.push(dslNode)
    }
    return dslLayout
  } else {
    dslLayout.nodeChildren.forEach((value) => {
      if (value.category == Category.Layout) {
        addNode2Layout(parentKey, value as DslLayout, dslNode)
      }
    })
  }
}

function updateNode(
  dslState: DslState,
  parentNode: DslLayout,
  dslNode: DslNode,
) {
  if (dslNode.parentKey == MAIN_CONTAINER_ID && dslNode.category == Category.Layout) {
    dslState.root = dslNode as DslLayout
    return
  }
  if (parentNode.dslKey == dslNode.parentKey) {
    const index = parentNode.nodeChildren.findIndex((value, index, obj) => {
      return value.dslKey == dslNode.dslKey
    })
    parentNode.nodeChildren[index] = dslNode
  } else {
    parentNode.nodeChildren.forEach((value) => {
      if (value.category == Category.Layout) {
        updateNode(dslState, value as DslLayout, dslNode)
      }
    })
  }
}

const dslSlice = createSlice({
  name: "dsl",
  initialState,
  reducers: {
    dslActionHandler(state, action) {
      let safeState = state

      switch (action.payload?.type) {
        case DslActionName.AddFrame: {
          const addFrameAction = action.payload as AddFrame
          if (addFrameAction.dslFrame.parentKey == null) {
            safeState = {
              ...safeState,
              root: addFrameAction.dslFrame,
            }
          } else {
            safeState = addNode(
              safeState,
              addFrameAction.dslFrame.parentKey,
              addFrameAction.dslFrame,
            )
          }
          break
        }
        case DslActionName.AddText: {
          const addTextAction = action.payload as AddText
          addNode2Layout(
            addTextAction.dslText.parentKey,
            safeState.root!!,
            addTextAction.dslText,
          )
          break
        }
        case DslActionName.UpdateText: {
          const updateTextAction = action.payload as UpdateText
          updateNode(safeState, safeState.root!!, updateTextAction.newDslText)
          break
        }
      }
      return safeState
    },
  },
})

export * from "./interface"
export const { dslActionHandler } = dslSlice.actions
export const dslActions = dslSlice.actions
export default dslSlice.reducer