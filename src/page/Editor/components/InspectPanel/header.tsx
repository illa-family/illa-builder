import { FC, useContext } from "react"
import { MoreIcon } from "@illa-design/icon"
import { panelHeaderWrapperCss, panelHeaderIconWrapperCss } from "./style"
import { Trigger } from "@illa-design/trigger"
import { ActionMenu } from "./actionMenu"
import { HeaderProps } from "./interface"
import { ConfigPanelContext } from "./context"
import { WrappedEditableText } from "@/wrappedComponents/EditableText"

export const PanelHeader: FC<HeaderProps> = (props) => {
  const { componentDsl, handleUpdateDsl } = useContext(ConfigPanelContext)

  return (
    <div css={panelHeaderWrapperCss}>
      {/*  TODO: wait for editable component*/}
      <WrappedEditableText defaultValue={componentDsl.type} />
      <div css={panelHeaderIconWrapperCss}>
        <Trigger
          position="br"
          trigger="click"
          content={<ActionMenu componentId="testId" componentType="testType" />}
          withoutPadding
          closeOnClick
          clickOutsideToClose
          showArrow={false}
          colorScheme="white"
        >
          <MoreIcon />
        </Trigger>
      </div>
    </div>
  )
}

PanelHeader.displayName = "PanelHeader"
