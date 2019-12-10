import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Header from "components/common/Header"
import { logout } from "modules/authReducer"

const HeaderContainer = () => {
  const { auth } = useSelector(({ authReducer }) => ({
    auth: authReducer.auth,
  }))
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
  }
  return <Header auth={auth} onLogout={onLogout} />
}

export default HeaderContainer
