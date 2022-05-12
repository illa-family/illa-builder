import { FC } from "react"
import { RadioGroupProps } from "./interface"
import { RadioGroup } from "@illa-design/radio"

const PanelRadioGroup: FC<RadioGroupProps> = (props) => {
  const mockData = [
    { label: "a", value: "a" },
    { label: "b", value: "b" },
    { label: "c", value: "c" },
  ]
  return (
    <RadioGroup
      colorScheme="purple"
      type="button"
      options={mockData}
      defaultValue="a"
    />
  )
}
export default PanelRadioGroup
