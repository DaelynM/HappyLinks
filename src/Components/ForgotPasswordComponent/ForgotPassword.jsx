import React, { useState, useEffect } from "react";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.secondary.main,
  },
  successMessage: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.success.main,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();

  const [forgotPass, setForgotPass] = useState("");
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    console.log("forgotPass", forgotPass);
  }, [forgotPass]);

  // const { email, password, validate } = signInState;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setValidation(true);
      await auth.sendPasswordResetEmail(forgotPass);
    } catch (err) {
      setValidation(false);
      console.log("error occured when signing in");
    }
  };

  const reportMsg = () => {
    if (validation === false) {
      return (
        <p className={classes.errorMessage}>
          Email did not match, please try again
        </p>
      );
    } else if (validation === true) {
      return (
        <p className={classes.successMessage}>
          Email has been sent, please check your inbox
        </p>
      );
    } else {
      return "";
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password?
        </Typography>
        {reportMsg()}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address..."
            name="email"
            autoComplete="off"
            autoFocus
            type="email"
            onChange={(e) => setForgotPass(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit Password Reset
          </Button>

          <Typography align="center" variant="h6">
            Don't have an account yet?
          </Typography>

          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Back
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
