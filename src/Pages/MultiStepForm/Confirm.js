import React, { Fragment, useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../Context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const idShoterner = (e) => {
  var newId = e.slice(0, 10);
  newId = newId.concat("...");
  return newId;
};

// Destructure props
const Confirm = ({ handleNext, handleBack, values: { username } }) => {
  const classes = useStyles();

  const { userContext, setUserContext } = useContext(UserContext);

  return (
    <Fragment>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Username" secondary={userContext.username} />
          <Typography variant="body2">{userContext.username}</Typography>
        </ListItem>
        {userContext.linkArray.map((e) => (
          <ListItem className={classes.listItem} key={e.id}>
            <ListItemText
              primary={`Link ${e.url}`}
              secondary={idShoterner(e.id)}
            />
            <Typography variant="body2">{e.url}</Typography>
          </ListItem>
        ))}

        <Divider />
      </List>

      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          variant="contained"
          color="secondary"
          onClick={handleNext}
        >
          Confirm & Continue
        </Button>
      </div>
    </Fragment>
  );
};

export default Confirm;
