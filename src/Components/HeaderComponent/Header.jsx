import React, { useContext } from "react";
import { auth } from "../../Firebase/firebase";
import { withRouter, Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "2vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  center: {
    textAlign: "right",
  },
}));

const Header = ({ match, history, location }) => {
  const { userContext } = useContext(UserContext);
  //console.log("signedIn value", userContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={2}>
          <Link to="/">
            <h3>Image here</h3>
          </Link>
        </Grid>
        <Grid item xs={5} />

        <Grid item xs={3} className={classes.center}>
          <Link to="/signin">
            <h5>Sign In</h5>
          </Link>
        </Grid>
        <Link to="/" onClick={() => auth.signOut()}>
          SignOut
        </Link>
      </Grid>
    </div>
  );
};

export default withRouter(Header);

// <div className={classes.root}>
// <Grid container spacing={3} justify="center">
//   <Grid item xs={1} />

//   <Grid item xs={2}>
//     <Link to="/">Image here</Link>
//   </Grid>
//   <Grid item xs={1} />

//   <Grid item xs={1} className={classes.center}>
//     <Link to="/">Home</Link>
//   </Grid>
//   <Grid item xs={1} className={classes.center}>
//     <Link to="/" onClick={() => auth.signOut()}>
//       SignOut
//     </Link>
//   </Grid>
//   <Grid item xs={1} className={classes.center}>
//     <Link to="/form">Form</Link>
//   </Grid>
//   <Grid item xs={1} className={classes.center}>
//     <Link to="/profile">Profile</Link>
//   </Grid>
//   <Grid item xs={4} />
// </Grid>
// </div>

// return (
//   <div
//     className={classes.root}
//     style={{ maxWidth: "99.2%", paddingTop: "3vh" }}
//   >
//     <Grid container spacing={6} justify="center">
//       {userContext ? (
//         <div>
//           <Grid item xs={2}>
//             <Paper className={classes.paper}>xs=12</Paper>

//             <Link to="/">Home </Link>
//           </Grid>
//           <Grid item xs={2}>
//             <Link to="/" onClick={() => auth.signOut()}>
//               <Paper className={classes.paper}>xs=12</Paper>
//               SignOut
//             </Link>
//           </Grid>
//           <Grid item xs={2}>
//             <Paper className={classes.paper}>xs=12</Paper>

//             <Link to="/form"> Form</Link>
//           </Grid>
//           <Grid item xs={2}>
//             <Paper className={classes.paper}>xs=12</Paper>

//             <Link to="/profile"> Profile</Link>
//           </Grid>
//         </div>
//       ) : (
//         <div>
//           <Link to="/">Home</Link>
//           <Link to="/signin">SignIn</Link>
//           <Link to="/signup">SignUp</Link>
//         </div>
//       )}
//     </Grid>
//   </div>
// );
