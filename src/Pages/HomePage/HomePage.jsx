import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import "./neonButton.scss";
import banner from "./images/banner.png";
import socials from "./images/socials.png";
import ParticlesComponent from "../../Components/ParticlesComponent/ParticlesComponent";
import { Link } from "react-router-dom";
import Sky from "react-sky";

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

        <div style={{ opacity: "0.06" }}>
          <Sky
            images={{
              0: "https://image.flaticon.com/icons/svg/174/174855.svg",
              1: "https://image.flaticon.com/icons/svg/174/174848.svg",
              2: "https://image.flaticon.com/icons/svg/174/174883.svg",
              3: "https://image.flaticon.com/icons/svg/174/174879.svg",
              4: "https://image.flaticon.com/icons/svg/174/174857.svg",
              5: "https://image.flaticon.com/icons/svg/174/174870.svg",
              6: "https://image.flaticon.com/icons/svg/174/174869.svg",
              7: "https://image.flaticon.com/icons/svg/174/174872.svg",
              8: "https://image.flaticon.com/icons/svg/174/174875.svg",
              9: "https://image.flaticon.com/icons/svg/174/174845.svg",
              10: "https://image.flaticon.com/icons/svg/174/174837.svg",
              11: "https://image.flaticon.com/icons/svg/174/174858.svg",
              12: "https://image.flaticon.com/icons/svg/174/174844.svg",
              13: "https://image.flaticon.com/icons/svg/174/174865.svg",
              14: "https://image.flaticon.com/icons/svg/174/174874.svg",
            }}
            how={
              30
            } /* Pass the number of images Sky will render chosing randomly */
            time={150} /* time of animation */
            size={"30px"} /* size of the rendered images */
            background={"palettedvioletred"} /* color of background */
          />
        </div>

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
              <Link to="signup">
                <Button
                  className={classes.signupbtn}
                  variant="outlined"
                  color="primary"
                >
                  Sign Up
                </Button>
              </Link>
              <br />

              <Typography variant="body2">
                CloutLinks let you quickly link to anywhere on the internet. Its
                your front door to the Internet. Soooo... How will you Influence
                Your Links?
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
