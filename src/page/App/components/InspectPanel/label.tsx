import { FC } from "react"
import { Tooltip } from "@illa-design/tooltip"
import { applyLabelTipsStyle, labelTipsTextStyle } from "./style"
import { PanelLabelProps } from "./interface"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Text } from "@/widgetLibrary/TextWidget"

export const PanelLabel: FC<PanelLabelProps> = (props) => {
  const { labelDesc, labelName, isInList } = props

  return (
    <Tooltip
      content={<Text value={labelDesc} disableMarkdown />}
      trigger="hover"
      position="left"
      maxWidth="240px"
      colorScheme="white"
      disabled={!labelDesc}
    >
      <span css={applyLabelTipsStyle(isInList, !!labelDesc)}>{labelName}</span>
    </Tooltip>
  )
}

PanelLabel.displayName = "PanelLabel"
