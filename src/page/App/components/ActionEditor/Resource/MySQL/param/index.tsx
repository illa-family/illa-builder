import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import {
  MySQLParamProps,
  MySQLParamValues,
} from "@/page/App/components/ActionEditor/Resource/MySQL/interface"
import { getSelectedAction } from "@/redux/config/configSelector"
import { panelPaddingStyle } from "./style"

export const MySQLParam: FC<MySQLParamProps> = (props) => {
  const { onChange } = props
  const { query = "", mode = "sql" } =
    useSelector(getSelectedAction)?.actionTemplate ?? {}

  return (
    <div css={panelPaddingStyle}>
      <CodeEditor
        value={query}
        onChange={(value) => {
          onChange({ query: value })
        }}
        mode="TEXT_SQL"
        expectedType="String"
        height="88px"
        lineNumbers
      />
    </div>
  )
}

MySQLParam.displayName = "MySQLParam"
