import { FC, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Divider } from "@illa-design/divider"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import { getSelectedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { Transformer } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/Transformer"
import { ResourceParams } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/ResourceParams"
import { EventHandler } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/EventHandler"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { ResourcePanelProps } from "./interface"

export const ResourcePanel: FC<ResourcePanelProps> = (props) => {
  const { resourceId } = props
  const { setIsActionDirty } = useContext(ActionEditorContext)
  const activeActionItem = useSelector(getSelectedAction)
  const dispatch = useDispatch()
  let resourceType: string
  let resource

  resource = useSelector(selectAllResource).find(
    (i) => i.resourceId === resourceId,
  )
  resourceType = resource?.resourceType ?? ""

  function updateActionTemplate(value: any) {
    setIsActionDirty?.(true)
    dispatch(
      configActions.updateSelectedAction({
        ...activeActionItem,
        actionTemplate: {
          ...activeActionItem.actionTemplate,
          ...value,
        },
      }),
    )
  }

  return (
    <>
      <div>
        <ResourceParams
          resourceType={resourceType}
          onChange={updateActionTemplate}
        />
        <Transformer onChange={updateActionTemplate} />
        <Divider />
        <EventHandler />
      </div>
    </>
  )
}

ResourcePanel.displayName = "ResourcePanel"
