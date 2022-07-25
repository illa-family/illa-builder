import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ActionListState,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export const updateActionListReducer: CaseReducer<
  ActionListState,
  PayloadAction<ActionItem[]>
> = (_, action) => {
  return action.payload
}

export const addActionItemReducer: CaseReducer<
  ActionListState,
  PayloadAction<ActionItem>
> = (state, action) => {
  return [...state, action.payload]
}

export const updateActionItemReducer: CaseReducer<
  ActionListState,
  PayloadAction<Partial<ActionItem>>
> = (state, action) => {
  let targetActionIndex = state.findIndex(
    (item: ActionItem) => item.actionId === action.payload.actionId,
  )

  state.splice(targetActionIndex, 1, {
    ...state[targetActionIndex],
    ...action.payload,
  })
}

export const updateActionTemplateReducer: CaseReducer<
  ActionListState,
  PayloadAction<any>
> = (state, action) => {
  const { actionId } = action.payload
  let targetActionIndex = state.findIndex(
    (item: ActionItem) => item.actionId === actionId,
  )
  if (targetActionIndex === -1) return
  const oldAction = state[targetActionIndex]
  oldAction.actionTemplate = action.payload.actionTemplate
  state[targetActionIndex] = oldAction
}

export const removeActionItemReducer: CaseReducer<
  ActionListState,
  PayloadAction<string>
> = (state, action) => {
  state.splice(
    state.findIndex((item: ActionItem) => item.actionId === action.payload),
    1,
  )
}
