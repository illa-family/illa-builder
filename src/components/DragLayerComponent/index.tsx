import { HTMLAttributes } from "react"
import { applyDragLayer } from "./style"

export interface DragLayerProps extends HTMLAttributes<HTMLDivElement> {
  rowHeight: number
  columnWidth: number
  noPad: boolean
}

export function DragLayerComponent(props: DragLayerProps) {
  const { className } = props
  return (
    <div className={className} css={applyDragLayer(props)} />
  )
}

DragLayerComponent.displayName = "DragLayerComponent"
