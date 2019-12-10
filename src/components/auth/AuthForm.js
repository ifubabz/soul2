import React from "react"
import {
  Container,
  CssBaseline,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Typography,
  Box,
  Link,
  makeStyles,
} from "@material-ui/core"
import image from "images/icons8-eggplant-48.png"

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.primary.light,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //width: 500,
  },
  avatar: {
    margin: theme.spacing(1),
    color: "#fff",
    width: 60,
    height: 60,
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    "& input:invalid + fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
    "& input:valid + fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}))

const textMap = {
  login: "로그인",
  register: "회원가입",
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        STONES
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type]
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar alt="Egg Plant" src={image} className={classes.avatar} />
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
            value={form.username}
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={onChange}
            value={form.password}
          />
          {type === "register" && (
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
          )}
          {type === "login" && (
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="아이디 저장"
            />
          )}
          {error && <div>{error}</div>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {text}
          </Button>
        </form>
        <Grid container>
          {type === "login" ? (
            <>
              <Grid item xs>
                <Typography>
                  <Link color="primary" href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Link color="primary" href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs />
              <Grid item>
                <Typography>
                  <Link color="primary" href="/login" variant="body2">
                    {"로그인"}
                  </Link>
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
        <Box m={8}>
          <Copyright />
        </Box>
      </div>
    </Container>
  )
}

export default AuthForm
