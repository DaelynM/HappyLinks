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
});

const SimpleProfileCard = ({ makePrivate, firebaseCall }) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      style={{ background: "linear-gradient(0deg,#3358f4,#1d8cf8)" }}
    >
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography className={classes.title} color="primary" gutterBottom>
              Username
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {makePrivate ? "" : <SimpleMenu username={firebaseCall.username} />}
          </Grid>
        </Grid>
        <Typography variant="h6" component="h4">
          <Link
            rel="noopener noreferrer"
            href="https://www.instagram.com/_vhub/"
            target="_blank"
            color="inherit"
          >
            @{firebaseCall.username}
          </Link>
        </Typography>{" "}
        <Typography className={classes.pos} className={classes.overideColor}>
          Short Bio
        </Typography>
        <Typography variant="body2" component="p" className={classes.username}>
          Long bio
          <br />
          {'"a saying for the long bio lorem ipsum idk test this to see wrap"'}
        </Typography>
        <Typography
          className={classes.country}
          color="textSecondary"
          gutterBottom
        >
          Country
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SimpleProfileCard;
