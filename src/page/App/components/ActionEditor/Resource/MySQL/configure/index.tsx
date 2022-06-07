import { forwardRef, useImperativeHandle, useState } from "react"
import { css } from "@emotion/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input, Password } from "@illa-design/input"
import { Switch } from "@illa-design/switch"
import { Divider } from "@illa-design/divider"
import { InputNumber } from "@illa-design/input-number"
import { applyGridColIndex } from "@/page/App/components/ActionEditor/style"
import { useSelector } from "react-redux"
import { selectAllResource } from "@/redux/currentApp/action/resource/resourceSelector"
import {
  descriptionStyle,
  errorMessageStyle,
  formStyle,
  gridContainerStyle,
  gridRowContainerStyle,
  groupTitleStyle,
  itemTextStyle,
  labelTextSmallSizeStyle,
  labelTextStyle,
  labelTextVerticalStyle,
  requiredLabelTextStyle,
  splitLineStyle,
} from "@/page/App/components/ActionEditor/Resource/style"
import {
  MySQLConfigureProps,
  MySQLConfigureValues,
  AdvancedOptions,
  TestConnectionBaseValues,
} from "../interface"
import { InputUpload } from "./input-upload"
import {
  formPaddingStyle,
  hostnamePortStyle,
  switchAreaStyle,
  switchDescriptionStyle,
  usernamePasswordStyle,
} from "./style"

const baseOptionSet = new Set([
  "host",
  "port",
  "databaseName",
  "databaseUsername",
  "databasePassword",
  "ssl",
  "ssh",
])
const advancedOptionSet = new Set([
  "sshHost",
  "sshPort",
  "sshUsername",
  "sshPassword",
  "sshPrivateKey",
  "sshPassphrase",
  "serverCert",
  "clientKey",
  "clientCert",
])
const dataTransform = (data: MySQLConfigureValues) => {
  let options: {
    [x: string]:
    | string
    | number
    | boolean
    | { [x: string]: string | number | boolean }
  } = {}
  let advanced: { [x: string]: string | number | boolean } = {}
  Object.keys(data).forEach((key) => {
    if (baseOptionSet.has(key)) {
      options[key as keyof TestConnectionBaseValues] =
        data[key as keyof MySQLConfigureValues]
    }
    if (advancedOptionSet.has(key)) {
      advanced[key as keyof AdvancedOptions] =
        data[key as keyof MySQLConfigureValues]
    }
  })
  options.advancedOptions = advanced
  return { kind: "mysql", options }
}

export const MySQLConfigure = forwardRef<HTMLFormElement, MySQLConfigureProps>(
  (props, ref) => {
    const { resourceId, connectionRef, onSubmit, onTestConnection } = props
    const { t } = useTranslation()
    const resourceConfig = useSelector(selectAllResource).find(
      (i) => i.resourceId === resourceId,
    )
    const [expandSSH, setExpandSSH] = useState(false)
    const [expandSSL, setExpandSSL] = useState(false)
    const {
      handleSubmit,
      control,
      register,
      resetField,
      formState: { errors },
      getValues,
      setValue,
    } = useForm<MySQLConfigureValues>({
      mode: "onBlur",
      defaultValues: (resourceConfig?.config as MySQLConfigureValues) || {
        port: 3306,
        ssh: false,
        ssl: false,
        sshPort: 22,
      },
    })

    const testConnection = () => {
      let data: MySQLConfigureValues = {
        ...getValues(),
        ssh: expandSSH,
        ssl: expandSSL,
      }
      const _data = dataTransform(data)
      onTestConnection?.({
        resourceName: data.name,
        resourceType: "MySQL",
        dbName: "",
        created: Date.now().toString(),
        config: _data,
      })
    }

    useImperativeHandle(connectionRef, () => {
      {
        return { testConnection }
      }
    })

    const submitForm: SubmitHandler<MySQLConfigureValues> = (data) => {
      data = { ...data, ssh: expandSSH, ssl: expandSSL }

      onSubmit &&
        onSubmit({
          resourceName: data.name,
          resourceType: "MySQL",
          dbName: "",
          created: Date.now().toString(),
          config: data,
        })
    }
    return (
      <form onSubmit={handleSubmit(submitForm)} css={formStyle} ref={ref}>
        <div css={css(gridContainerStyle, formPaddingStyle)}>
          <div css={gridRowContainerStyle}>
            <label css={requiredLabelTextStyle}>
              {t("editor.action.resource.mySql.label.name")}
            </label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.name",
                  )}
                  error={!!errors.name}
                  maxLength={200}
                />
              )}
              rules={{
                required: t("editor.action.form.required"),
              }}
              control={control}
              name="name"
            />
            {errors.name && (
              <div css={css(errorMessageStyle, applyGridColIndex(2))}>
                {errors.name.message}
              </div>
            )}
          </div>
          <div css={gridRowContainerStyle}>
            <label css={requiredLabelTextStyle}>
              {t("editor.action.resource.mySql.label.hostname_port")}
            </label>
            <div css={hostnamePortStyle}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t(
                      "editor.action.resource.mySql.placeholder.hostname",
                    )}
                    error={!!errors.host}
                    maxLength={200}
                  />
                )}
                control={control}
                name="host"
                rules={{
                  required: t("editor.action.form.required"),
                }}
              />
              <Controller
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    placeholder="3306"
                    error={!!errors.port}
                  />
                )}
                control={control}
                name="port"
                rules={{
                  required: t("editor.action.form.required"),
                }}
              />
            </div>
            {(errors.host || errors.port) && (
              <div css={css(hostnamePortStyle, applyGridColIndex(2))}>
                <div css={errorMessageStyle}>{errors.host?.message}</div>
                <div css={errorMessageStyle}>{errors.port?.message}</div>
              </div>
            )}
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.mySql.label.database")}
            </label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.database",
                  )}
                />
              )}
              control={control}
              name="databaseName"
            />
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.mySql.label.username_password")}
            </label>
            <div css={usernamePasswordStyle}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t(
                      "editor.action.resource.mySql.placeholder.username",
                    )}
                  />
                )}
                control={control}
                name="databaseUsername"
              />
              <Controller
                render={({ field }) => (
                  <Password
                    {...field}
                    invisibleButton={false}
                    placeholder={t(
                      "editor.action.resource.mySql.placeholder.password",
                    )}
                  />
                )}
                control={control}
                name="databasePassword"
              />
            </div>
            <div css={css(descriptionStyle, applyGridColIndex(2))}>
              {t("editor.action.resource.mySql.tip.username_password")}
            </div>
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.mySql.label.connect_type")}
            </label>
            <div css={itemTextStyle}>
              {t("editor.action.resource.mySql.tip.connect_type")}
            </div>
          </div>
          <Divider css={splitLineStyle} />
          <h4 css={groupTitleStyle}>Advanced Options</h4>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.mySql.label.connect_over_ssh")}
            </label>
            <div css={switchAreaStyle}>
              <Switch
                colorScheme="techPurple"
                checked={expandSSH}
                onChange={(val) => {
                  setExpandSSH(val)
                }}
              />
              <div css={switchDescriptionStyle}>
                <div css={labelTextStyle}>
                  {t("editor.action.resource.mySql.tip.connect_over_ssh")}
                </div>
              </div>
            </div>
          </div>
          {expandSSH && (
            <>
              <div css={gridRowContainerStyle}>
                <label css={requiredLabelTextStyle}>
                  {t("editor.action.resource.mySql.label.ssh_hostname_port")}
                </label>
                <div css={hostnamePortStyle}>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t(
                          "editor.action.resource.mySql.placeholder.ssh_hostname_port",
                        )}
                        maxLength={200}
                        error={!!errors.sshHost}
                      />
                    )}
                    rules={{
                      required: t("editor.action.form.required"),
                    }}
                    control={control}
                    name="sshHost"
                  />
                  <Controller
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        placeholder="22"
                        error={!!errors.sshPort}
                      />
                    )}
                    rules={{
                      required: t("editor.action.form.required"),
                    }}
                    control={control}
                    name="sshPort"
                  />
                </div>
                {(errors.sshHost || errors.sshPort) && (
                  <div css={css(hostnamePortStyle, applyGridColIndex(2))}>
                    <div css={errorMessageStyle}>{errors.sshHost?.message}</div>
                    <div css={errorMessageStyle}>{errors.sshPort?.message}</div>
                  </div>
                )}
              </div>
              <div css={gridRowContainerStyle}>
                <label css={requiredLabelTextStyle}>
                  {t("editor.action.resource.mySql.label.ssh_credentials")}
                </label>
                <div css={usernamePasswordStyle}>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t(
                          "editor.action.resource.mySql.placeholder.ssh_credentials",
                        )}
                        error={!!errors.sshUsername}
                      />
                    )}
                    rules={{
                      required: t("editor.action.form.required"),
                    }}
                    control={control}
                    name="sshUsername"
                  />
                  <Controller
                    render={({ field }) => (
                      <Password
                        {...field}
                        placeholder="•••••••••"
                        invisibleButton={false}
                        error={!!errors.sshPassword}
                      />
                    )}
                    rules={{
                      required: t("editor.action.form.required"),
                    }}
                    control={control}
                    name="sshPassword"
                  />
                </div>
                {(errors.sshUsername || errors.sshPassword) && (
                  <div css={css(hostnamePortStyle, applyGridColIndex(2))}>
                    <div css={errorMessageStyle}>
                      {errors.sshUsername?.message}
                    </div>
                    <div css={errorMessageStyle}>
                      {errors.sshPassword?.message}
                    </div>
                  </div>
                )}
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t("editor.action.resource.mySql.label.private_key")}
                </label>
                <InputUpload
                  name="sshPrivateKey"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.private_key",
                  )}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={css(labelTextStyle, labelTextVerticalStyle)}>
                  <div>SSH passphrase</div>
                  <div css={labelTextSmallSizeStyle}>
                    {t("editor.action.resource.mySql.tip.ssh_passphrase")}
                  </div>
                </label>
                <Controller
                  render={({ field }) => (
                    <Password
                      {...field}
                      placeholder="•••••••••"
                      invisibleButton={false}
                    />
                  )}
                  control={control}
                  name="sshPassphrase"
                />
              </div>
            </>
          )}
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.mySql.label.ssl_options")}
            </label>
            <div css={switchAreaStyle}>
              <Switch
                colorScheme="techPurple"
                checked={expandSSL}
                onChange={(val) => {
                  setExpandSSL(val)
                }}
              />
              <div css={switchDescriptionStyle}>
                <div css={labelTextStyle}>
                  {t("editor.action.resource.mySql.tip.ssl_options")}
                </div>
              </div>
            </div>
          </div>
          {expandSSL && (
            <>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t(
                    "editor.action.resource.mySql.label.server_root_certificate",
                  )}
                </label>
                <InputUpload
                  name="serverCert"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.server_root_certificate",
                  )}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t("editor.action.resource.mySql.label.client_key")}
                </label>
                <InputUpload
                  name="clientKey"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.client_key",
                  )}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t("editor.action.resource.mySql.label.client_certificate")}
                </label>
                <InputUpload
                  name="clientCert"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.client_certificate",
                  )}
                />
              </div>
            </>
          )}
        </div>
      </form>
    )
  },
)

MySQLConfigure.displayName = "MySQLConfigure"
