import { FC, HTMLAttributes } from "react"
import { Button, ButtonGroup } from "@illa-design/button"
import {
  BugIcon,
  MoreIcon,
  CaretRightIcon,
  WindowBottomIcon,
  WindowLeftIcon,
  WindowRightIcon,
} from "@illa-design/icon"
import { useTranslation } from "react-i18next"
import {
  descriptionStyle,
  informationStyle,
  nameStyle,
  navBarStyle,
  rowCenter,
  viewControlStyle,
} from "./style"
import { ZoomControl } from "@/page/Editor/components/PageNavBar/ZoomControl"
import { ReactComponent as Logo } from "@assets/illa-logo.svg"
import { useDispatch, useSelector } from "react-redux"
import { PanelState } from "@/page/Editor"
import { getPreviewMode } from "@/redux/currentApp/editor/mode/modeSelector"
import { modeActions } from "@/redux/currentApp/editor/mode/modeSlice"

interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {
  switchPanelState: (config: PanelState) => void
}

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className, switchPanelState } = props
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const isPreviewMode = useSelector(getPreviewMode)

  const projectInfo = {
    name: "Sample App",
    description: "Add description",
  }

  return (
    <div className={className} css={navBarStyle}>
      <div css={rowCenter}>
        <Logo width={"34px"} />
        <section css={informationStyle}>
          <div css={nameStyle}>{projectInfo.name}</div>
          <div css={descriptionStyle}>{projectInfo.description}</div>
        </section>
      </div>
      <div css={viewControlStyle}>
        <WindowLeftIcon
          onClick={() => {
            switchPanelState("showLeftPanel")
          }}
        />
        <WindowRightIcon
          onClick={() => {
            switchPanelState("showRightPanel")
          }}
        />
        <WindowBottomIcon
          onClick={() => {
            switchPanelState("showBottomPanel")
          }}
        />
        <ZoomControl />
      </div>
      <div>
        <ButtonGroup spacing={"8px"}>
          <Button colorScheme="gray" size="medium" leftIcon={<BugIcon />} />
          <Button colorScheme="gray" size="medium" leftIcon={<MoreIcon />} />
          <Button
            colorScheme="grayBlue"
            size="medium"
            onClick={() => {
              dispatch(modeActions.setPreviewMode(!isPreviewMode))
            }}
          >
            {isPreviewMode ? t("preview") : t("edit")}
          </Button>
          <Button
            colorScheme="techPurple"
            size="medium"
            leftIcon={<CaretRightIcon />}
          >
            {t("deploy")}
          </Button>
          <Button
            colorScheme="techPurple"
            size="medium"
            onClick={() => {
              i18n.changeLanguage("zh")
            }}
          >
            changeLanguage
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

PageNavBar.displayName = "PageNavBar"
