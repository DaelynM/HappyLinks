import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
//firebase
import { SignInWithGoogle, auth } from "../../Firebase/firebase";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import LoaderPopover from "../LoaderComponent/LoaderPopoverComponent";
import { UserContext } from "../../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
  errorMessage: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.secondary.main,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SignIn = () => {
  const classes = useStyles();

  const { userContext, setUserContext } = useContext(UserContext);

  const [submited, setSubmited] = useState(false);

  const [signInState, setSignInState] = useState({
    email: "",
    password: "",
    validate: true,
  });

  const { email, password, validate } = signInState;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("successful login");
      setSubmited(true);
    } catch (err) {
      setSignInState({ ...signInState, validate: false });
      console.log("error occured when signing in");
    }

    console.log("signed in here 2");
  };

  const handleGoogleSignIn = async () => {
    await SignInWithGoogle();

    setSubmited(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {validate ? null : (
          <p className={classes.errorMessage}>
            Email or Password did not match, please try again
          </p>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            onChange={(e) =>
              setSignInState({ ...signInState, email: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) =>
              setSignInState({ ...signInState, password: e.target.value })
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Button
            onClick={handleGoogleSignIn}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In With Google
          </Button>
          <Typography align="center" variant="h6">
            Don't have an account yet?
          </Typography>

          <Grid container>
            <Grid item xs>
              <Link variant="body2" component={RouterLink} to="/signup">
                <Typography variant="subtitle1">Forgot Password?</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" component={RouterLink} to="/signup">
                <Typography align="center" variant="subtitle1">
                  Sign up for HappyLinks.com
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {submited ? <LoaderPopover /> : null}
    </Container>
  );
};

export default SignIn;
