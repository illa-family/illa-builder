import { FC, Fragment } from "react"
import { Input, Password } from "@illa-design/input"
import { Select } from "@illa-design/select"
import { Button } from "@illa-design/button"
import { WarningCircleIcon } from "@illa-design/icon"
import {
  SettingCommonFormProps,
  paramDataType,
  contentItemType,
} from "./interface"
import {
  settingBodyStyle,
  settingItemStyle,
  itemTitleStyle,
  itemSubtitleStyle,
  saveButtonStyle,
  errorLineStyle,
  errorTextStyle,
} from "./styles"

export const SettingCommonForm: FC<SettingCommonFormProps> = (props) => {
  const { paramData, onSubmit } = props

  return (
    <div css={settingBodyStyle}>
      {paramData.map((item: paramDataType, idx: number) => {
        return (
          <div css={settingItemStyle} key={idx}>
            {item.title && <p css={itemTitleStyle}>{item.title}</p>}
            {item.subTitle && (
              <span css={itemSubtitleStyle}>{item.subTitle}</span>
            )}
            {item.content.map(
              (contentItem: contentItemType, contentIdx: number) => {
                return (
                  <Fragment key={contentIdx}>
                    {contentItem.type === "input" && (
                      <>
                        <Input
                          size="large"
                          borderColor="techPurple"
                          style={{ width: 280 }}
                          disabled={contentItem.disabled}
                          value={contentItem.value}
                          onChange={contentItem.onChange}
                          onFocus={contentItem.onFocus}
                        />
                        {contentItem.showError && (
                          <div css={errorLineStyle}>
                            <WarningCircleIcon />
                            <span css={errorTextStyle}>
                              {contentItem.errorMsg}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    {contentItem.type === "input-password" && (
                      <>
                        <Password
                          size="large"
                          borderColor="techPurple"
                          style={{ width: 280 }}
                          disabled={contentItem.disabled}
                          value={contentItem.value}
                          onChange={contentItem.onPasswordChange}
                          onFocus={contentItem.onFocus}
                        />
                        {contentItem.showError && (
                          <div css={errorLineStyle}>
                            <WarningCircleIcon />
                            <span css={errorTextStyle}>
                              {contentItem.errorMsg}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    {contentItem.type === "select" && (
                      <Select
                        style={{ width: 280 }}
                        colorScheme="techPurple"
                        size="large"
                        options={contentItem.selectOptions}
                        defaultValue={contentItem.defaultSelectValue}
                        onChange={contentItem.onChange}
                      />
                    )}
                    {contentItem.type === "button" && (
                      <div css={saveButtonStyle}>
                        <Button
                          colorScheme="techPurple"
                          size="large"
                          fullWidth
                          disabled={contentItem.disabled}
                          loading={contentItem.loading}
                          onClick={onSubmit}
                        >
                          {contentItem.value}
                        </Button>
                      </div>
                    )}
                  </Fragment>
                )
              },
            )}
          </div>
        )
      })}
    </div>
  )
}
