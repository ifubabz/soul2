import { createAction, handleActions } from "redux-actions"
import { takeLatest, call } from "redux-saga/effects"
import * as authAPI from "lib/api/authAPI"
import createRequestSaga, { createRequestActionTypes } from "modules/sagaUtils"

const CHANGE_FIELD = "auth/CHANGE_FIELD"
const INITIALIZE_FORM = "auth/INITIALIZE_FORM"

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  "auth/LOGIN"
)
const LOGOUT = "auth/LOGOUT"
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  "auth/CHECK"
)

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  "auth/REGISTER"
)

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // email, password, passwordConfirm
    value, // 실제 바꾸려는 값
  })
)
export const initializeForm = createAction(INITIALIZE_FORM, form => form) // register / login

export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}))
export const logout = createAction(LOGOUT)
export const check = createAction(CHECK)

export const register = createAction(REGISTER, ({ email, password }) => ({
  email,
  password,
}))

const loginSaga = createRequestSaga(LOGIN, authAPI.login)
function* logoutSaga() {
  try {
    yield call(authAPI.logout) // logout API 호출
    localStorage.removeItem("auth")
  } catch (e) {
    console.log(e)
  }
}
const checkSaga = createRequestSaga(CHECK, authAPI.check)
function checkFailureSaga() {
  try {
    console.log("checkFailureSaga")
    localStorage.removeItem("auth")
  } catch (e) {
    console.log("localStorage is not working")
  }
}

const registerSaga = createRequestSaga(REGISTER, authAPI.register)

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga)
  yield takeLatest(LOGOUT, logoutSaga)
  yield takeLatest(CHECK, checkSaga)
  yield takeLatest(CHECK_FAILURE, checkFailureSaga)

  yield takeLatest(REGISTER, registerSaga)
}

const initialState = {
  register: {
    email: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    email: "",
    password: "",
  },
  auth: null,
  authError: null,
}

const authReducer = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => {
      const newSate = Object.assign({}, state)
      newSate[form][key] = value
      return newSate
    },
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => {
      const newSate = Object.assign({}, state)
      newSate.authError = error
      return newSate
    },
    [LOGOUT]: state => ({
      ...state,
      auth: null,
    }),
    [CHECK_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      auth: null,
      checkError: error,
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
)

export default authReducer
