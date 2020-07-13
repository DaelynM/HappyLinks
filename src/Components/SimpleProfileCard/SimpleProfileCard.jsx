import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import SimpleMenu from "../SimpleMenuComponent/SimpleMenu";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {},
  title: {
    fontSize: 14,
    color: "#fff",
  },
  username: {
    color: "#fff",
  },
  pos: {
    marginBottom: 12,
  },
  country: {
    paddingTop: 12,
  },
  overideColor: {
    color: "#fff",
  },
  imageFormat: {
    width: "15vh",
    display: "block",
    margin: "0 2vh 0 0",
    width: "90%",
    borderRadius: "50%",
  },
  subInfo: {
    fontSize: 14,
    color: "#fff",
  },

  center: {
    textAlign: "center",
  },
});

const SimpleProfileCard = ({
  makePrivate,
  firebaseCall,
  componentSwitchEp,
}) => {
  const classes = useStyles();

  console.log("LA", firebaseCall.linkArray);

  const numOfLinks = () => {
    if (firebaseCall.linkArray) {
      var count = firebaseCall.linkArray.length;
      return count;
    }
  };

  return (
    <Card
      className={classes.root}
      style={{ background: "linear-gradient(0deg,#3358f4,#1d8cf8)" }}
    >
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            {/*<Typography className={classes.title} color="primary" gutterBottom>
              Username
  </Typography>*/}
            <Grid
              container
              spacing={1}
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item xs={5}>
                <img
                  src={firebaseCall.profilePic}
                  className={classes.imageFormat}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.center}>
                  Views
                  <br />
                  N/A
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.center}>
                  Links <br />
                  {numOfLinks()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            {makePrivate ? (
              ""
            ) : (
              <SimpleMenu
                username={firebaseCall.username}
                componentSwitchEp={componentSwitchEp}
              />
            )}
          </Grid>
        </Grid>
        <Typography variant="h6" component="h4" style={{ marginTop: "2vh" }}>
          <Link
            rel="noopener noreferrer"
            href={`http://localhost:3000/${firebaseCall.username}`}
            target="_blank"
            color="inherit"
          >
            @{firebaseCall.username}
          </Link>
        </Typography>
        <Typography
          className={classes.pos}
          className={classes.overideColor}
          fontWeight="fontWeightBold"
        >
          <b>{firebaseCall.shortBio}</b>
        </Typography>
        <Typography variant="body2" component="p" className={classes.username}>
          {firebaseCall.longBio}
        </Typography>

        {firebaseCall.country ? (
          <div>
            <Typography
              className={classes.country}
              color="textSecondary"
              gutterBottom
            >
              <LocationOnIcon /> {firebaseCall.country}
            </Typography>
          </div>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
};

export default SimpleProfileCard;
