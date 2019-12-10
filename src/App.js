import React from "react"
import "./App.css"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { deepPurple, green, red, common, grey } from "@material-ui/core/colors"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import rootReducer, { rootSaga } from "modules"
import { HelmetProvider } from "react-helmet-async"
import Router from "Router"
import { check } from "modules/authReducer"

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", "serif"',
  },
  palette: {
    primary: {
      light: deepPurple[50],
      main: deepPurple[500],
      dark: deepPurple[700],
    },
    secondary: {
      light: green[200],
      main: green[300],
      dark: green[500],
    },
    error: {
      light: red[200],
      main: red[300],
      dark: red[500],
    },
    text: {
      primary: common.black,
      secondary: grey[700],
      disabled: grey[500],
      hint: grey[700],
    },
  },
})

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

function loadAuth() {
  try {
    const auth = localStorage.getItem("auth")
    if (!auth) return

    store.dispatch(check())
  } catch (e) {
    console.log("localStorage is not working")
  }
}
loadAuth()

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <HelmetProvider>
          <div className="App">
            <Router />
          </div>
        </HelmetProvider>
      </MuiThemeProvider>
    </Provider>
  )
}

export default App
