import React, { useState, useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../Context/UserContext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InputAdornment from "@material-ui/core/InputAdornment";
import uuid from "react-uuid";

import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(0.5),
  },
  box: {
    color: red,
  },
}));
// Destructure props
const SecondStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { city },
  filedError,
  isError,
}) => {
  const classes = useStyles();

  const { userContext, setUserContext } = useContext(UserContext);
  console.log("signedIn value id", userContext.username);

  const [linkArray, setLinkArray] = useState(
    userContext.linkArray ? userContext.linkArray : [{ id: uuid(), url: "" }]
  );

  console.log("userContext.links", userContext.linkArray);
  console.log("linkArray", linkArray);

  useEffect(() => {
    setUserContext({ ...userContext, linkArray });
  }, [linkArray]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Links
      </Typography>

      <Grid container spacing={3}>
        {linkArray.map((e) => {
          return (
            <Grid item xs={12} key={e.id}>
              <TextField
                required
                label="Link"
                fullWidth
                value={e.url || ""}
                name="links"
                onChange={(l) => {
                  const url = l.target.value;
                  setLinkArray((curLinks) =>
                    curLinks.map((x) => (x.id === e.id ? { ...x, url } : x))
                  );
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.box}>
                      https://
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <DeleteForeverIcon
                        onClick={() =>
                          setLinkArray((curLinks) =>
                            curLinks.filter((x) => x.id !== e.id)
                          )
                        }
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => setLinkArray([...linkArray, { id: uuid(), url: "" }])}
      >
        Add Another Link
      </Button>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 20 }}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </React.Fragment>
  );
};

export default SecondStep;
