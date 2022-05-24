import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ActionListState,
  ActionItem,
} from "@/redux/action/actionList/actionListState"

export const addActionItemReducer: CaseReducer<
  ActionListState,
  PayloadAction<string>
> = (state, action) => { }

export const updateActionItemReducer: CaseReducer<
  ActionListState,
  PayloadAction<ActionItem>
> = (state, action) => { }

export const removeActionItemReducer: CaseReducer<
  ActionListState,
  PayloadAction<string>
> = (state, action) => { }
