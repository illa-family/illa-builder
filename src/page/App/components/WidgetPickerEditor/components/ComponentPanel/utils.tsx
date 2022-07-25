import { ComponentSessionProps } from "./interface"
import { sessionTypeMapSessionNameKey } from "@/widgetLibrary/componentListBuilder"
export function getMatchComponent(
  value?: string,
  options?: ComponentSessionProps[],
) {
  if (!value || value.length === 0) return options
  const valueArr = value.split("")
  let regKey = ".*"
  valueArr.forEach((s) => {
    regKey += s.toLocaleLowerCase() + ".*"
  })
  const reg = RegExp(regKey)

  const newSessionList: ComponentSessionProps[] = []
  const removeCommonlyOptions = options?.filter((option) => {
    return option.title !== sessionTypeMapSessionNameKey.COMMON
  })
  removeCommonlyOptions?.forEach((session) => {
    const res = session.widgetCardInfos.filter((widgetCardInfo) =>
      widgetCardInfo.widgetName.toLocaleLowerCase().match(reg),
    )
    if (res.length > 0) {
      newSessionList.push({ ...session, widgetCardInfos: res })
    }
  })
  return newSessionList
}
