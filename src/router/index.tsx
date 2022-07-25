import { useRoutes } from "react-router-dom"
import { routerConfig } from "@/router/routerConfig"
import { RoutesObjectPro } from "@/router/interface"
import { CheckIsLogin } from "@/auth"

const wrappedRouter = (routesConfig: RoutesObjectPro[]) => {
  return routesConfig.map((routeItem: RoutesObjectPro) => {
    const { element, children, needLogin, ...otherRouteProps } = routeItem
    const newRouteItem: RoutesObjectPro = {
      ...otherRouteProps,
    }
    if (needLogin) {
      newRouteItem.element = <CheckIsLogin>{element}</CheckIsLogin>
    } else {
      newRouteItem.element = element
    }
    if (Array.isArray(children) && children.length) {
      newRouteItem.children = wrappedRouter(children)
    }

    return newRouteItem
  })
}

export const ILLARoute = () => {
  return useRoutes(wrappedRouter(routerConfig))
}
