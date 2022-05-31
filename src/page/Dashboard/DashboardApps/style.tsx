import { SerializedStyles } from "@emotion/serialize"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const appsContainerStyle: SerializedStyles = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 auto;
  width: 67%;
  height: 100%;
`

export const listTitleContainerStyle: SerializedStyles = css`
  display: flex;
  height: 80px;
  align-items: center;
  flex-direction: row;
`

export const listTitleStyle: SerializedStyles = css`
  font-size: 20px;
  font-weight: 500;
  flex-grow: 1;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const itemExtraContainerStyle: SerializedStyles = css`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: row;
`

export const menuButtonStyle: SerializedStyles = css`
  margin-left: 4px;
`

export const itemMenuButtonStyle: SerializedStyles = css`
  margin-left: 4px;
`

export const loadingBoxStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 120px;
`
