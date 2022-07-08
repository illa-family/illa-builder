import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { SerializedStyles } from "@emotion/react"
import { ReactNode } from "react"

export interface HeaderProps {
  title: string
  handleCloseModal: () => void
}

export interface BodyProps {
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
}

export interface ModalProps extends HeaderProps, BodyProps {
  _css?: SerializedStyles
  header?: ReactNode
}
