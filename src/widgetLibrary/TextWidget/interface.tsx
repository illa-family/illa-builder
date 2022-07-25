import { BaseWidgetProps } from "@/widgetLibrary/interface"

export type HorizontalAlign = "start" | "center" | "end"
export type VerticalAlign = "start" | "center" | "end"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface TextProps extends Pick<TooltipWrapperProps, "tooltipText"> {
  value?: string
  disableMarkdown?: boolean
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
  backgroundColor?: string
  textColor?: string
  linkColor?: string
}

export interface TextWidgetProps extends TextProps, BaseWidgetProps {}
