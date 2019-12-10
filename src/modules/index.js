import { combineReducers } from "redux"
import { all } from "redux-saga/effects"
import authReducer, { authSaga } from "./authReducer"
import eggReducer, { eggSaga } from "./eggReducer"

const rootReducer = combineReducers({ authReducer, eggReducer })

export function* rootSaga() {
  yield all([authSaga(), eggSaga()])
}

export default rootReducer
