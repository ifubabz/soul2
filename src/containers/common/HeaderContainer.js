import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import Header from "components/common/Header"
import { logout } from "modules/authReducer"

const HeaderContainer = ({ history }) => {
  const { auth } = useSelector(({ authReducer }) => ({
    auth: authReducer.auth,
  }))
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
    history.push("/")
  }
  return <Header auth={auth} onLogout={onLogout} />
}

export default withRouter(HeaderContainer)
