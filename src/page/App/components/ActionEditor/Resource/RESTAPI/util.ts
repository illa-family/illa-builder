import { Params } from "./interface"

export function concatParam2Path(path: string, params: Params[]): string {
  return (
    path &&
    `${path}?${params
      ?.filter(({ key, value }) => key !== "" && value !== undefined)
      .map(({ key, value }) => `${key}=${value}`)
      .join("&")}`
  )
}

export function hasParamInPath(path?: string): boolean {
  if (!path) {
    return false;
  }

  return path.split("?").length > 1;
}

export function extractParamFromPath(path?: string): Params[] {
  if (!path) {
    return []
  }

  const firstQuestionMarkIndex = path?.indexOf("?")

  if (firstQuestionMarkIndex === -1) {
    return []
  }

  const urlParamsStr = path?.slice((firstQuestionMarkIndex ?? -1) + 1)

  return (
    urlParamsStr?.split("&").map((param) => {
      const [key, value] = param.split("=")
      return { key, value }
    }) ?? []
  )
}
