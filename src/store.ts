import { configureStore, combineReducers } from "@reduxjs/toolkit"
import logger from "redux-logger"
import editorReducer from "@/redux/editor"
import resourceReducer from "@/redux/action/resource/resourceSlice"
import actionListReducer from "@/redux/action/actionList/actionListSlice"
import dashboardReducer from "@/redux/dashboard/dashboardSlice"

const store = configureStore({
  reducer: {
    editor: editorReducer,
    action: combineReducers({
      actionList: actionListReducer,
      resource: resourceReducer,
    }),
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
