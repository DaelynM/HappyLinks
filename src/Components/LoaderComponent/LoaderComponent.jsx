import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const LoaderComponent = ({ history, whereTo, time }) => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [swap, setSwap] = useState(false);

  const { userContext, setUserContext } = useContext(UserContext);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? setSwap(true) : prevProgress + 20
      );
    }, time);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (swap) {
      // if (userContext.username) {
      //   whereTo = "/profile";
      // }
      history.push(whereTo);
    }
  }, [progress]);

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel className={classes.root} value={progress} />
    </div>
  );
};

export default withRouter(LoaderComponent);
