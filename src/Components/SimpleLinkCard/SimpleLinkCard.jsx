import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Hidden, Link } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    color: "#fff",
    backgroundColor: "#232535",
    background:
      "linear-gradient(90deg, rgba(35,37,53,1) 0%, rgba(35,37,53,1) 46%, rgba(32,31,31,1) 100%)",
  },
});

const ImgMediaCard = (props) => {
  const classes = useStyles();
  console.log(props.link);

  return (
    <Link
      rel="noopener noreferrer"
      href={`https://www.${props.link}`}
      target="_blank"
      color="primary"
      style={{ textDecoration: "none" }}
    >
      <Card className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ textDecoration: "none", padding: "0px" }}
                >
                  Title - {props.link}
                </Typography>
                <Typography variant="body2" color="primary" component="p">
                  {props.link}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>
          {/*<Grid item sm={1}>
            ...
  </Grid>*/}
        </Grid>
      </Card>
    </Link>
  );
};

export default ImgMediaCard;
