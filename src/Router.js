import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import Home from "pages/Home"
import LoginPage from "pages/LoginPage"
import RegisterPage from "pages/RegisterPage"
import EggListPage from "pages/EggListPage"

const Routers = () => {
  return (
    <Router>
      <Helmet>
        <title>Egg Plant</title>
      </Helmet>
      <Switch>
        <Route path={["/"]} exact component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path={"/list"} exact component={EggListPage} />
      </Switch>
    </Router>
  )
}

export default Routers
