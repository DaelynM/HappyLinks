import React, { useState, useContext, useEffect } from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import uuid from "react-uuid";
import { UserContext } from "../../Context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import { firestore } from "../../Firebase/firebase";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InputAdornment from "@material-ui/core/InputAdornment";
import FlareIcon from "@material-ui/icons/Flare";

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

const EditLinksComponent = ({ editLinks, componentSwitch }) => {
  const classes = useStyles();

  const { userContext, setUserContext } = useContext(UserContext);

  const [linkArray, setLinkArray] = useState(
    userContext.linkArray
      ? userContext.linkArray
      : [{ id: uuid(), url: "", effect: false }]
  );

  useEffect(() => {
    setUserContext({ ...userContext, linkArray });
  }, [linkArray]);

  const updateLinks = () => {
    if (userContext) {
      const userReference = firestore.doc(`/users/${userContext.id}`);
      userReference.update({
        linkArray: userContext.linkArray,
      });
      alert("updated links");
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Links
      </Typography>
      <Grid container spacing={3}>
        {linkArray.map((e) => {
          return (
            <Grid item xs={12} key={e.id}>
              <TextField
                style={{ width: "95%" }}
                required
                label="Link"
                type="url"
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
                      <FlareIcon
                        color={`${e.effect ? "secondary" : "primary"}`}
                        onClick={() => {
                          setLinkArray((allLinks) =>
                            //if the current link were mapping over is the current link were editing, then add the changes to that node
                            allLinks.map((x) =>
                              x.id === e.id && x.effect != null
                                ? { ...x, effect: !x.effect }
                                : x
                            )
                          );
                        }}
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
        onClick={() =>
          setLinkArray([...linkArray, { id: uuid(), url: "", effect: false }])
        }
      >
        Add Another Link
      </Button>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="default"
          style={{ marginRight: 20 }}
          onClick={componentSwitch}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={updateLinks}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditLinksComponent;
