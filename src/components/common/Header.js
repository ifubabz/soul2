import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
  titleLink: {
    color: theme.palette.common.white,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  button: {
    color: theme.palette.common.white,
    margin: theme.spacing(1),
  },
}))

const Header = ({ auth, onLogout }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              Egg Plant
            </Link>
          </Typography>
          {auth ? (
            <>
              <Link to="/list">
                <Button className={classes.button}>목록</Button>
              </Link>
              <Button className={classes.button} onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button className={classes.button}>Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
