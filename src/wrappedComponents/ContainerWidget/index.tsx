import { FC } from "react"
import { DropTargetMonitor, useDrop } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import { DropInfo, dslActions } from "@/redux/reducers/editorReducer/dslReducer"
import { DslActionName } from "@/redux/reducers/editorReducer/dslReducer/dsl-action"
import { DraggableComponent } from "@/wrappedComponents/DraggableComponent"
import {
  widgetBuilder,
  WidgetTypeList,
} from "@/wrappedComponents/WidgetBuilder"
import {
  generateWidgetProps,
  getTargetOffset,
  WidgetConfig,
} from "@/wrappedComponents/utils"
import { ContainerWidgetProps } from "./interface"
import { DragLayerComponent } from "@/components/DragLayerComponent"
import {
  getDragDetails,
  getWidgetStates,
} from "@/redux/selectors/editorSelectors/widgetStateSelectors"

interface PanelDrag {
  type: string
  props: any
}

export const CONTAINER_WIDGET_CONFIG = {
  type: "CONTAINER_WIDGET",
  defaults: {
    version: "0.0.1",
    backgroundColor: "#FFFFFF",
    rows: 40,
    columns: 24,
    width: "100%",
    height: "100%",
    widgetName: "Container",
    containerStyle: "card",
    borderColor: "transparent",
    borderWidth: "0",
    borderRadius: "0",
    children: [],
  },
}

export const ContainerWidget: FC<ContainerWidgetProps> = (
  containerWidgetProps,
) => {
  const {
    children,
    props,
    id,
    type,
    props: { topRow, leftColumn },
  } = containerWidgetProps
  const dispatch = useDispatch()
  const { isDragging, isResizing } = useSelector(getWidgetStates)
  const { draggedOn } = useSelector(getDragDetails)
  const showDragLayer = (isDragging && draggedOn === id) || isResizing

  const [collectProps, dropTarget] = useDrop<PanelDrag, DropInfo, Object>(
    () => ({
      accept: WidgetTypeList,
      drop: (item, monitor: DropTargetMonitor) => {
        if (monitor.getDropResult<DropInfo>()?.hasDropped) {
          return monitor.getDropResult<DropInfo>()!!
        }
        if (item.type) {
          let monitorOffset = getTargetOffset(monitor?.getClientOffset(), id)
          let config = generateWidgetProps(
            item as WidgetConfig,
            id,
            monitor?.getClientOffset(),
          )
          dispatch(
            dslActions.dslActionHandler({
              type: DslActionName.AddItem,
              dslText: config,
            }),
          )
          return {
            parent: containerWidgetProps,
            hasDropped: true,
          } as DropInfo
        }
        return {
          parent: containerWidgetProps,
          hasDropped: false,
        } as DropInfo
      },
    }),
    [topRow, leftColumn],
  )

  return (
    <DraggableComponent {...containerWidgetProps}>
      <div
        ref={dropTarget}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {children?.map((value) => {
          const { type } = value
          const child = widgetBuilder(type)
          return (
            <DraggableComponent key={value.id} {...value}>
              <child.widget {...value} />
            </DraggableComponent>
          )
        })}
      </div>
      {showDragLayer ? (
        <DragLayerComponent columnWidth={10} rowHeight={10} noPad />
      ) : null}
    </DraggableComponent>
  )
}

ContainerWidget.displayName = "ContainerWidget"
