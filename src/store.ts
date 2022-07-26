import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  TypedStartListening,
  ListenerEffectAPI,
} from "@reduxjs/toolkit"
import logger from "redux-logger"
import resourceReducer from "@/redux/resource/resourceSlice"
import actionReducer from "@/redux/currentApp/action/actionSlice"
import dashboardAppReducer from "@/redux/dashboard/apps/dashboardAppSlice"
import currentUserReducer from "@/redux/currentUser/currentUserSlice"
import liveFamilyReducer from "@/redux/liveFamily/liveFamilySlice"
import appInfoReducer from "@/redux/currentApp/appInfo/appInfoSlice"
import builderInfoReducer from "@/redux/builderInfo/builderInfoSlice"
import configReducer from "@/redux/config/configSlice"
import componentsReducer from "@/redux/currentApp/editor/components/componentsSlice"
import dragShadowReducer from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import dottedLineSquareReducer from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import displayNameReducer from "@/redux/currentApp/displayName/displayNameSlice"
import executionReducer from "@/redux/currentApp/executionTree/execution/executionSlice"
import dependenciesReducer from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { reduxAsync } from "@/middleware/redux/redux-async"

const listenerMiddleware = createListenerMiddleware()

const executionTreeReducer = combineReducers({
  execution: executionReducer,
  dependencies: dependenciesReducer,
})

const editorReducer = combineReducers({
  components: componentsReducer,
  dragShadow: dragShadowReducer,
  dottedLineSquare: dottedLineSquareReducer,
})

const appReducer = combineReducers({
  editor: editorReducer,
  action: actionReducer,
  appInfo: appInfoReducer,
  displayName: displayNameReducer,
  executionTree: executionTreeReducer,
})

const dashboardReducer = combineReducers({
  dashboardApps: dashboardAppReducer,
})

const store = configureStore({
  reducer: {
    config: configReducer,
    currentApp: appReducer,
    dashboard: dashboardReducer,
    currentUser: currentUserReducer,
    liveFamily: liveFamilyReducer,
    builderInfo: builderInfoReducer,
    resource: resourceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(reduxAsync)
      .concat(logger)
      .prepend(listenerMiddleware.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening
