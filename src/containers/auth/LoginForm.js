import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import { changeField, initializeForm, login, check } from "modules/authReducer"
import AuthForm from "components/auth/AuthForm"

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const { form, auth, authError } = useSelector(({ authReducer }) => ({
    form: authReducer.login,
    auth: authReducer.auth,
    authError: authReducer.authError,
  }))

  const onChange = e => {
    const { value, name } = e.target
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    )
  }

  const onSubmit = e => {
    e.preventDefault()
    const { email, password } = form
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    dispatch(initializeForm("login"))
  }, [dispatch])

  useEffect(() => {
    if (authError) {
      setError(authError.message)
      return
    }
    if (auth) {
      console.log("로그인 성공")
      dispatch(check())
    }
  }, [auth, authError, dispatch])

  useEffect(() => {
    if (auth) {
      history.push("/")
      try {
        localStorage.setItem("auth", JSON.stringify(auth))
      } catch (e) {
        console.log("localStorage is not working")
      }
    }
  }, [history, auth])

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  )
}

export default withRouter(LoginForm)
