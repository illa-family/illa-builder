import { FC, HTMLAttributes } from "react"

import { WrappedInput } from "@/wrappedComponents/Input"
interface CanvasContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const CanvasContainer: FC<CanvasContainerProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      <WrappedInput pattern={"URL"} defaultValue={"1111"} />
    </div>
  )
}

CanvasContainer.displayName = "CanvasContainer"
