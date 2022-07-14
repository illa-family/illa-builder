import { FC, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Loading } from "@illa-design/loading"
import { CloseIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { DashboardTitleBar } from "@/page/Dashboard/components/DashboardTitleBar"
import { Connection } from "@/api/ws"
import { Api } from "@/api/base"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { useDispatch, useSelector } from "react-redux"
import { Resource } from "@/redux/resource/resourceState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import {
  containerStyle,
  errorBodyStyle,
  errorDescriptionStyle,
  errorIconColorStyle,
  errorIconContentStyle,
  errorTitleStyle,
  loadingStyle,
} from "./style"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { Room } from "@/api/ws/interface"

export const IllaApp: FC = () => {
  const { t } = useTranslation()

  const [pageState, setPageState] = useState<string>("loading")
  const [retryNum, setRetryNum] = useState<number>(0)

  const dispatch = useDispatch()
  useEffect(() => {
    const controller = new AbortController()
    const appList = new Promise((resolve) => {
      Api.request<DashboardApp[]>(
        {
          url: "/apps",
          method: "GET",
          signal: controller.signal,
        },
        (response) => {
          dispatch(
            dashboardAppActions.updateDashboardAppListReducer(response.data),
          )
          resolve("success")
        },
        (failure) => {},
        (crash) => {},
        (loading) => {},
        (errorState) => {
          if (errorState) {
            resolve("error")
          }
        },
      )
    })

    const resourceList = new Promise((resolve) => {
      Api.request<Resource[]>(
        {
          url: "/resources",
          method: "GET",
          signal: controller.signal,
        },
        (response) => {
          dispatch(resourceActions.updateResourceListReducer(response.data))
          resolve("success")
        },
        (failure) => {},
        (crash) => {},
        (loading) => {},
        (errorState) => {
          if (errorState) {
            resolve("error")
          }
        },
      )
    })
    Promise.all([appList, resourceList]).then((result) => {
      if (result.includes("error")) {
        setPageState("error")
      } else {
        setPageState("success")
      }
    })
    return () => {
      controller.abort()
    }
  }, [retryNum])

  const currentUser = useSelector(getCurrentUser)

  useEffect(() => {
    Connection.enterRoom(
      "dashboard",
      "",
      (loading) => {},
      (errorState) => {},
      (room) => {},
    )
    return () => {
      Connection.leaveRoom("dashboard", "")
    }
  }, [currentUser])

  return (
    <div css={containerStyle}>
      <DashboardTitleBar />
      {pageState === "loading" && (
        <Loading _css={loadingStyle} colorScheme="techPurple" />
      )}
      {pageState === "error" && (
        <div css={errorBodyStyle}>
          <div css={errorIconContentStyle}>
            <CloseIcon size="16px" _css={errorIconColorStyle} />
          </div>
          <div css={errorTitleStyle}>{t("dashboard.common.error_title")}</div>
          <div css={errorDescriptionStyle}>
            {t("dashboard.common.error_description")}
          </div>
          <Button
            colorScheme="techPurple"
            onClick={() => {
              setRetryNum(retryNum + 1)
            }}
          >
            {t("dashboard.common.error_button")}
          </Button>
        </div>
      )}
      {pageState === "success" && <Outlet />}
    </div>
  )
}

IllaApp.displayName = "IllaApp"
