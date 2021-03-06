import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export type IllaMode = "preview" | "edit" | "production"

export interface ConfigState {
  openLeftPanel: boolean
  openBottomPanel: boolean
  openRightPanel: boolean
  showDot: boolean
  scale: number
  selectedComponents: ComponentNode[]
  selectedAction: ActionItem<ActionContent> | null
  cacheActionContent: {
    [key: string]: ActionContent
  }
  expandedKeys: string[]
  mode: IllaMode
}

export const ConfigInitialState: ConfigState = {
  openLeftPanel: true,
  cacheActionContent: {},
  mode: "edit",
  openBottomPanel: true,
  openRightPanel: true,
  scale: 100,
  selectedComponents: [],
  selectedAction: null,
  showDot: false,
  expandedKeys: [],
}
