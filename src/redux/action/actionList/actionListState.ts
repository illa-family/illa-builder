export interface ActionItem {
  id: string
  name: string
  type: "query" | "transformer"
  isWarning?: boolean
  time?: string
}

export interface ActionListState { }

export const actionInitialItem = {} as ActionItem
