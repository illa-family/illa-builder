import { FC } from "react"
import { WrapperProps } from "./interface"
import { css } from "@emotion/react"

export const Wrapper: FC<WrapperProps> = (props) => {
  const { className, h, w, alignment } = props

  const sizeCss = css`
    width: ${w ?? "fit-content"};
    height: ${h ?? "fit-content"};
    display: inline-flex;
    border: dashed 1px pink;
  `

  return (
    <div className={className} css={sizeCss}>
      {props.children}
    </div>
  )
}

Wrapper.displayName = "Wrapper"
