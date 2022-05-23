import { HTMLAttributes } from "react"
import { Control } from "react-hook-form"
import { RESTAPIFormValues } from "../interface"

export interface ParamListProps extends HTMLAttributes<HTMLDivElement> {
  name: string,
  control: Control<RESTAPIFormValues>,
}
