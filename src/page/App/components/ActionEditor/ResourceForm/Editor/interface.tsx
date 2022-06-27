import { ActionType } from "@/page/App/components/ActionEditor/ResourceForm/interface"

export type ConnectionRef = {
  testConnection: () => void
}

export interface ResourceFormEditorProps {
  actionType: ActionType
  resourceId?: string
  resourceType?: string
  back?: () => void
  onSubmit?: (resourceId: string) => void
}
