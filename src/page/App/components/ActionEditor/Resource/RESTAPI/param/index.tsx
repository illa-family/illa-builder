import { FC, useState } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { FieldArray } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import {
  configContainerStyle,
  descriptionStyle,
  paramGridRowContainerStyle,
  labelTextStyle,
  applyGridColIndex,
} from "@/page/App/components/ActionEditor/Resource/style"
import {
  RESTAPIParamProps,
  RESTAPIConfigureValues,
  RESTAPIParamValues,
} from "@/page/App/components/ActionEditor/Resource/RESTAPI/interface"
import {
  concatParam2Path,
  extractParamFromPath,
  hasParamInPath,
} from "@/page/App/components/ActionEditor/Resource/RESTAPI/util"
import {
  initArrayField,
  getEmptyField,
  addArrayField,
  removeArrayField,
  updateArrayField,
} from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray/util"
import { Body } from "./Body"
import { actionTypeStyle } from "./style"

export const RESTAPIParam: FC<RESTAPIParamProps> = (props) => {
  const { onChange } = props

  const { t } = useTranslation()
  const { resourceId, actionTemplate } = useSelector(getSelectedAction)
  const [isEditingUrl, setIsEditingUrl] = useState(false)

  const baseURL =
    (
      useSelector(selectAllResource).find(
        ({ resourceId: id }) => id === resourceId,
      )?.options as RESTAPIConfigureValues
    )?.baseURL ?? ""

  const config = actionTemplate as RESTAPIParamValues

  const [params, setParams] = useState({
    method: config?.method ?? "GET",
    path: config?.path ?? "",
    urlParams: initArrayField(config?.urlParams),
    headers: initArrayField(config?.headers),
    body: config?.body,
    cookies: initArrayField(config?.cookies),
  })

  const hasBody = params.method.indexOf("GET") === -1

  function updateField(field: string, newFieldVal: any) {
    const newParams = { ...params, [field]: newFieldVal }

    onChange && onChange(newParams)
    field === "path" && isEditingUrl && updateUrlParams(newParams)
    field === "urlParams" && !isEditingUrl && updatePath(newParams)

    setParams((preParams) => {
      return { ...preParams, [field]: newFieldVal }
    })
  }

  function updateUrlParams(params: RESTAPIParamValues) {
    if (!hasParamInPath(params.path)) {
      return
    }

    setParams((preParams) => {
      const newUrlParams = extractParamFromPath(params?.path).map(
        (param, index) => {
          // to merge original `_key` props
          return { ...(preParams.urlParams[index] ?? {}), ...param }
        },
      )
      return {
        ...preParams,
        urlParams: newUrlParams.length ? newUrlParams : [getEmptyField()],
      }
    })
  }

  function updatePath(params: RESTAPIParamValues) {
    const [path] = params?.path?.split("?") ?? ["", ""]

    setParams((preParams) => {
      return { ...preParams, path: concatParam2Path(path, preParams.urlParams) }
    })
  }

  return (
    <div css={configContainerStyle}>
      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.action_type")}
        </label>
        <div css={actionTypeStyle}>
          <Select
            value={params.method}
            onChange={(value) => updateField("method", value)}
            options={["GET", "POST", "PUT", "DELETE", "PATCH"]}
            size={"small"}
          />
          <Input
            value={params.path}
            onFocus={() => setIsEditingUrl(true)}
            onBlur={() => setIsEditingUrl(false)}
            onChange={(value) => {
              updateField("path", value)
            }}
            placeholder={t(
              "editor.action.resource.rest_api.placeholder.action_url_path",
            )}
            addonBefore={{ render: baseURL ?? null }}
          />
        </div>
        <dd css={css(applyGridColIndex(2), descriptionStyle)}>
          {t("editor.action.resource.rest_api.tip.get_req_auto_run")}
        </dd>
      </div>

      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.url_parameters")}
        </label>
        <FieldArray
          value={params.urlParams}
          onAdd={() => {
            setParams((prev) => {
              return { ...prev, urlParams: addArrayField(prev.urlParams) }
            })
          }}
          onRemove={(_key) =>
            setParams((prev) => {
              return { ...prev, urlParams: removeArrayField(prev.urlParams, _key) }
            })
          }
          onChange={(value) => {
            setParams((prev) => {
              const urlParams = updateArrayField(prev.urlParams, value)
              const newParams = { ...prev, urlParams }

              !isEditingUrl && updatePath(newParams)

              return newParams
            })
          }}
          autoNewField
        />
      </div>

      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.headers")}
        </label>
        <FieldArray
          value={params.headers}
          onAdd={() => updateField("headers", addArrayField(params.headers))}
          onRemove={(_key) =>
            updateField("headers", removeArrayField(params.headers, _key))
          }
          onChange={(value) =>
            updateField("headers", updateArrayField(params.headers, value))
          }
        />
      </div>

      {hasBody && (
        <div css={paramGridRowContainerStyle}>
          <label css={labelTextStyle}>
            {t("editor.action.resource.rest_api.label.body")}
          </label>
          <Body value={params.body} />
        </div>
      )}

      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.cookies")}
        </label>
        <FieldArray
          value={params.cookies}
          onAdd={() => updateField("cookies", addArrayField(params.cookies))}
          onRemove={(_key) =>
            updateField("cookies", removeArrayField(params.cookies, _key))
          }
          onChange={(value) =>
            updateField("cookies", updateArrayField(params.cookies, value))
          }
        />
      </div>
    </div>
  )
}

RESTAPIParam.displayName = "RESTAPIParam"
