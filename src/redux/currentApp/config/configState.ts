import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export interface ConfigState {
  openLeftPanel: boolean
  openBottomPanel: boolean
  openRightPanel: boolean
  unitSize: UnitSize
  showDot: boolean
  scale: number
  selectedComponents: ComponentNode[]
  selectedAction: ActionItem | null
}

export interface UnitSize {
  unitWidth: number
  unitHeight: number
}

export const ConfigInitialState: ConfigState = {
  openLeftPanel: true,
  scale: 100,
  openBottomPanel: true,
  selectedComponents: [],
  selectedAction: null,
  openRightPanel: true,
  showDot: false,
  unitSize: {
    unitHeight: 8,
    unitWidth: 0,
  },
}
