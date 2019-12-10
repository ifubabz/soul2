import { createAction, handleActions } from "redux-actions"
import { takeLatest } from "redux-saga/effects"
import * as eggAPI from "lib/api/eggAPI"
import createRequestSaga, { createRequestActionTypes } from "modules/sagaUtils"

const [GET_EGGS, GET_EGGS_SUCCESS, GET_EGGS_FAILURE] = createRequestActionTypes(
  "eggs/GET_EGGS"
)

export const getEggs = createAction(GET_EGGS, email => ({
  email,
}))

const getEggsSaga = createRequestSaga(GET_EGGS, eggAPI.getEggs)

export function* eggSaga() {
  yield takeLatest(GET_EGGS, getEggsSaga)
}

const initialState = {
  eggs: [
    {
      id: "1",
      title: "기술 블로그 작성하기",
      createDate: "2019-12-10 13:22",
      dueDate: "3",
      name: "Park",
      period: "weekly",
    },
    {
      id: "2",
      title: "하루 6잔 물 마시기",
      createDate: "2019-12-10 18:22",
      dueDate: "1",
      name: "",
      period: "daily",
    },
  ],
}

const eggReducer = handleActions(
  {
    [GET_EGGS_SUCCESS]: (state, { payload: eggs }) => ({
      ...state,
    }),
    [GET_EGGS_FAILURE]: (state, { payload: error }) => ({
      ...state,
    }),
  },
  initialState
)

export default eggReducer
