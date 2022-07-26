import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
// TODO: @aruseito Abstract into tool function
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { Button } from "@illa-design/button"
import { Empty } from "@illa-design/empty"
import { Table } from "@illa-design/table"
import {
  Resource,
  ResourceListState,
  ResourceType,
} from "@/redux/resource/resourceState"
import { getAllResources } from "@/redux/resource/resourceSelector"
import {
  appsContainerStyle,
  listTitleContainerStyle,
  listTitleStyle,
} from "@/page/Dashboard/DashboardApps/style"
import {
  tableColStyle,
  tableInfoTextStyle,
  tableMainTextStyle,
  tableNormalTextStyle,
  tableStyle,
} from "./style"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import { cloneDeep } from "lodash"
import { Divider } from "@illa-design/divider"

dayjs.extend(utc)
dayjs.extend(timezone)

function NameColComponent(type: ResourceType, text: string) {
  const icon = getIconFromResourceType(type, "24px")
  return (
    <div css={tableColStyle}>
      {icon}
      <span css={css(tableNormalTextStyle, tableMainTextStyle)}>{text}</span>
    </div>
  )
}

function TypeColComponent(text: string) {
  return <span css={tableInfoTextStyle}>{text}</span>
}

function DbNameColComponent(text: string) {
  if (text) {
    return <span css={tableNormalTextStyle}>{text}</span>
  } else {
    return <span css={tableInfoTextStyle}>-</span>
  }
}

function CtimeColComponent(text: string) {
  const timezone = dayjs.tz.guess()
  return (
    <span css={tableInfoTextStyle}>
      {dayjs(text).tz(timezone).format("YYYY-MM-DD HH:mm:ss")}
    </span>
  )
}

export const DashboardResources: FC = () => {
  const { t } = useTranslation()

  const resourcesList: ResourceListState = useSelector(getAllResources)

  const countColumnsWidth = (itemWidth: number, minWidth: number) => {
    const windowSizeRate = +(
      (document.documentElement.clientWidth * 0.67) /
      1920
    ).toFixed(2)
    return itemWidth * windowSizeRate < minWidth
      ? minWidth
      : itemWidth * windowSizeRate
  }
  const columns = useMemo(
    () => [
      {
        Header: t("dashboard.resources.table_name"),
        accessor: "nameCol",
        width: `${countColumnsWidth(360, 160)}px`,
      },
      {
        Header: t("dashboard.resources.table_type"),
        accessor: "typeCol",
        width: "150px",
      },
      {
        Header: t("dashboard.resources.table_dbname"),
        accessor: "dbNameCol",
        width: `${countColumnsWidth(520, 200)}px`,
      },
      {
        Header: t("dashboard.resources.table_ctime"),
        accessor: "ctimeCol",
        width: "150px",
      },
      {
        Header: "",
        accessor: "extraCol",
        disableSortBy: true,
        width: "90px",
      },
    ],
    [],
  )
  const data = useMemo(() => {
    const result: any[] = []
      const tmpResourcesList = cloneDeep(resourcesList)
      tmpResourcesList
          .sort((a, b) => {
              return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          })
          .forEach((item: Resource, idx: number) => {
      result.push({
        nameCol: NameColComponent(item.resourceType, item.resourceName),
        typeCol: TypeColComponent(item.resourceType),
        dbNameCol: "",
        ctimeCol: CtimeColComponent(item.updatedAt),
      })
    })
    return result
  }, [resourcesList])

  return (
    <>
      <div css={appsContainerStyle}>
        <div css={listTitleContainerStyle}>
          <span css={listTitleStyle}>{t("resources")}</span>
          <Button colorScheme="techPurple">
            {t("dashboard.resources.create_resources")}
          </Button>
        </div>
        <Divider direction="horizontal" />
        {resourcesList?.length ? (
          <Table
            _css={tableStyle}
            data={data}
            columns={columns}
            disableRowSelect
          />
        ) : null}
        {!resourcesList?.length ? <Empty paddingVertical="120px" /> : null}
      </div>
    </>
  )
}

DashboardResources.displayName = "DashboardResources"
