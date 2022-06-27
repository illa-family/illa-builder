import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import { MySQLParamProps, MySQLParamValues } from "@/page/App/components/ActionEditor/Resource/MySQL/interface"
import { getSelectedAction } from "@/redux/config/configSelector"
import { panelPaddingStyle } from "./style"

export const MySQLParam: FC<MySQLParamProps> = (props) => {
  const { onChange } = props
  const { query = "" } = useSelector(getSelectedAction)?.actionTemplate ?? {}
  const [params, setParams] = useState<MySQLParamValues>({
    query,
    mode: "sql",
  })

  function updateField(field: string) {
    return (v: any) => {
      setParams((preParams) => {
        const newParams = { ...preParams, [field]: v }

        onChange?.(newParams)

        return newParams
      })
    }
  }

  return (
    <div css={panelPaddingStyle}>
      <CodeEditor
        value={params.query}
        onChange={updateField("query")}
        mode="TEXT_SQL"
        expectedType="String"
        height="88px"
        lineNumbers
      />
    </div>
  )
}

MySQLParam.displayName = "MySQLParam"
