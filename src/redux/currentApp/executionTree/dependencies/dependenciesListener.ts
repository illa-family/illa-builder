import { AnyAction, isAnyOf, Unsubscribe } from "@reduxjs/toolkit"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getAllComponentDisplayNameMapProps } from "@/redux/currentApp/editor/components/componentsSelector"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import dependenciesTreeWorker from "@/utils/worker/exectionTreeWorker?worker"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"

export const worker = new dependenciesTreeWorker()

async function handleUpdateDependencies(
  action: AnyAction,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const displayNameMapProps = getAllComponentDisplayNameMapProps(rootState)
  const builderInfo = getBuilderInfo(rootState)
  const currentUser = getCurrentUser(rootState)
  if (!displayNameMapProps) return
  worker.postMessage({
    action: "GENERATE_DEPENDENCIES",
    displayNameMapProps: displayNameMapProps,
    builderInfo: builderInfo,
    currentUser: currentUser,
  })
  worker.onmessage = (e) => {
    const { data } = e
    const { result = {} } = data
    listenerApi.dispatch(dependenciesActions.setDependenciesReducer(result))
  }
}

export function setupDependenciesListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      matcher: isAnyOf(
        componentsActions.updateComponentPropsReducer,
        componentsActions.deleteComponentNodeReducer,
      ),
      effect: handleUpdateDependencies,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
