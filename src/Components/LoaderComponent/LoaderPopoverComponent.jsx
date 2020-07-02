import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import LoaderComponent from "./LoaderComponent";
import { UserContext } from "../../Context/UserContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoaderPopover() {
  const { userContext, setUserContext } = useContext(UserContext);

  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" align="center">
          {"Generating Your Clout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" align="center">
            You will be redirected very shortly
          </DialogContentText>
          <LoaderComponent
            whereTo={userContext ? "/form" : "/profile"}
            time="400"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
