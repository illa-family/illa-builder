import { createContext, ReactNode, FC, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/editor/components/componentsSelector"
import { Empty } from "@/page/App/components/InspectPanel/empty"

interface Injected {
  widgetType: string
  widgetDisplayName: string
  widgetParentDisplayName: string
  widgetProps: Record<string, any>
  handleUpdateDsl: (attrPath: string, value: any) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

export const SelectedProvider: FC<Props> = ({ children }) => {
  const singleSelectedComponentNode = useSelector(
    getComponentNodeBySingleSelected,
  )

  const widgetType = useMemo(
    () => singleSelectedComponentNode?.type,
    [singleSelectedComponentNode],
  )

  const widgetDisplayName = useMemo(
    () => singleSelectedComponentNode?.displayName as string,
    [singleSelectedComponentNode],
  )

  const widgetParentDisplayName = useMemo(
    () => singleSelectedComponentNode?.parentNode as string,
    [singleSelectedComponentNode],
  )

  const widgetProps = useMemo(
    () => singleSelectedComponentNode?.props || {},
    [singleSelectedComponentNode],
  )

  const dispatch = useDispatch()

  const handleUpdateDsl = (attrPath: string, value: any) => {
    if (!widgetProps || !widgetDisplayName) return
    const updateSlice = { [attrPath]: value }
    dispatch(
      componentsActions.updateComponentPropsReducer({
        displayName: widgetDisplayName,
        updateSlice,
      }),
    )
  }

  if (!widgetType || !widgetDisplayName) return <Empty />

  const value = {
    widgetType,
    widgetDisplayName,
    widgetParentDisplayName,
    widgetProps,
    handleUpdateDsl,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SelectedProvider"
