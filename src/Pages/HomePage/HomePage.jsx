import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import "./neonButton.scss";
import banner from "./images/banner.png";
import socials from "./images/socials.png";
import ParticlesComponent from "../../Components/ParticlesComponent/ParticlesComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  exoFont: {
    fontFamily: "Exo",
  },
  neonBlueTitle: {
    color: "rgba(67, 160, 255, 1)",
    // textShadow: "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
    textShadow:
      // "2px 1px 1px rgba(67, 142, 234, 1), 0 0 15px blue, 0 0 5px darkblue",
      "0 0 5px rgba(67, 142, 234, 1)",
    fontSize: "7vh",
  },
  neonBlueSm: {
    color: "rgba(67, 160, 255, 1)",
    // textShadow: "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
    textShadow:
      // "2px 1px 1px rgba(67, 142, 234, 1), 0 0 15px blue, 0 0 5px darkblue",
      "0 0 5px rgba(67, 142, 234, 1)",
    fontSize: "2vh",
  },
  neonPinkSm: {
    color: "rgba(193, 84, 177, 1)",
    textShadow: "0 0 2px rgba(193, 84, 177, 1)",
    fontSize: "2vh",
  },
  neonGreenSm: {
    color: "rgba(96, 211, 181, 1)",
    // textShadow: "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
    textShadow:
      // "2px 1px 1px rgba(67, 142, 234, 1), 0 0 15px blue, 0 0 5px darkblue",
      "0 0 2px rgba(193, 84, 177, 1)",
    fontSize: "2vh",
  },
  signupbtn: {
    color: "rgba(67, 160, 255, 1)",
    // textShadow: "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
    textShadow:
      // "2px 1px 1px rgba(67, 142, 234, 1), 0 0 15px blue, 0 0 5px darkblue",
      "0 0 5px rgba(67, 142, 234, 1)",
    margin: "3vh",
    width: "44vh",
    fontSize: "22px",
  },
  part2: {
    backgroundColor: "#ffffff",
  },
}));

const HomePage = ({ match }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <ParticlesComponent />

        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          style={{ padding: "3vh 0 5vh 0", height: "90vh" }}
        >
          <Grid item sm={11} md={6}>
            <div className={classes.paper}>
              <Typography variant="h3" className={classes.neonBlueTitle}>
                All your links. <br />
                All in one place.
              </Typography>

              <Typography variant="h2" className={classes.neonGreenSm}>
                Create your free links in less than 60 seconds.
              </Typography>
              <Button
                className={classes.signupbtn}
                variant="outlined"
                color="primary"
              >
                Sign Up
              </Button>
              <br />

              <Typography variant="span">
                HappyLinks let you quickly link to anywhere on the internet.
                It’s your digital glossary, your public bookmarks, your front
                door to the internet. So where will you send people?
              </Typography>
            </div>
          </Grid>
          <Grid item sm={11} md={5}>
            <div className={classes.paper}>
              <img style={{ maxWidth: "50vh" }} src={banner}></img>
            </div>
          </Grid>
        </Grid>

        {/**

        <div className={classes.part2}>
          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            style={{ padding: "3vh 0 5vh 0" }}
          >
            <Grid item sm={11} md={6}>
              <div className={classes.paper}>
                <Typography variant="h3" className={classes.neonBlueTitle}>
                  All your links.
                </Typography>

                <Typography variant="h2" className={classes.neonPinkSm}>
                  HappyLinks let you quickly link to anywhere on the internet.
                  It’s your digital glossary, your public bookmarks, your front
                  door to the internet. So where will you send people?
                </Typography>
              </div>
            </Grid>
            <Grid item sm={11} md={5}>
              <div className={classes.paper}>
                <img style={{ maxWidth: "50vh" }} src={socials}></img>
              </div>
            </Grid>
          </Grid>
        </div>
      */}
      </div>
    </div>
  );
};

export default HomePage;
