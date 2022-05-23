import { XYCoord } from "react-dnd"
import { v4 as uuidv4 } from "uuid"
import {
  BaseProps,
  DSLWidget,
} from "@/wrappedComponents/DraggableComponent/interface"

export type WidgetConfig = {
  props: {
    columns: number
    rows: number
  }
} & BaseProps

export const getTargetOffset = (monitorOffset: XYCoord | null, id: string) => {
  const target = window.document
    .querySelector<HTMLDivElement>(`#${id}`)
    ?.getBoundingClientRect()
  const targetTop = target?.top ?? 0
  const targetLeft = target?.left ?? 0
  const monitorTop = monitorOffset?.y ?? 0
  const monitorLeft = monitorOffset?.x ?? 0
  return {
    topRow: monitorTop - targetTop,
    leftColumn: monitorLeft - targetLeft,
  }
}

export const generateWidgetProps = (
  widgetConfig: WidgetConfig,
  parentId: string,
  monitorOffset: XYCoord | null,
): DSLWidget => {
  if (parentId) {
    let {
      props,
      props: { rows, columns },
      ...rest
    } = widgetConfig
    let { leftColumn, topRow } = getTargetOffset(monitorOffset, parentId)
    let { parentRowSpace = 1, parentColumnSpace = 1 } = props

    const sizes = {
      leftColumn,
      rightColumn: leftColumn + columns,
      topRow,
      bottomRow: topRow + rows,
      parentColumnSpace,
      parentRowSpace,
    }
    const result: DSLWidget = {
      ...rest,
      parentId,
      id: "dsl-" + uuidv4(),
      props: {
        ...props,
        ...sizes,
        isVisible: widgetConfig.type === "CONTAINER_WIDGET" ? true : undefined,
        isLoading: false,
      },
    }
    return result
  } else {
    throw Error("Failed to create widget: Parent was not provided ")
  }
}

export const updateWidgetProps= (
  widgetConfig: WidgetConfig,
  updateParams: {
    leftColumn: number
    topRow: number
  },
) => {
  let {
    props,
    props: { rows, columns },
    ...rest
  } = widgetConfig
  let { leftColumn, topRow } = updateParams

  return {
    ...rest,
    props: {
      ...props,
      leftColumn, topRow,
      rightColumn: leftColumn + columns,
      bottomRow: topRow + rows,
    },
  }
}
