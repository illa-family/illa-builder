import { FC } from "react"
import { SwitchProps } from "./interface"
import { Switch } from "@illa-design/switch"

const PanelSwitch: FC<SwitchProps> = (props) => {
  return (
    <Switch
      colorScheme="brand-purple"
      defaultChecked={props.value}
      onChange={props.onChange}
    />
  )
}

export default PanelSwitch
