import React, { useState, Fragment, useContext, useEffect } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import Confirm from "./Confirm";
import Success from "./Success";
import { UserContext } from "../../Context/UserContext";
import firebase, { firestore } from "../../Firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 1, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/);
const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/);
// Step titles
const labels = ["Username", "Links", "Review Profile"];

const StepForm = () => {
  const classes = useStyles();

  const { userContext, setUserContext } = useContext(UserContext);

  const [steps, setSteps] = useState(0);
  const [fields, setFields] = useState({
    username: "",
    city: "",
  });

  // Copy fields as they all have the same name
  const [filedError, setFieldError] = useState({
    ...fields,
  });

  const [isError, setIsError] = useState(false);

  // Proceed to next step
  const handleNext = () => setSteps(steps + 1);
  // Go back to prev step
  const handleBack = () => setSteps(steps - 1);

  const handleUsername = (value) => {
    return firestore
      .collection("users")
      .where("username", "==", value)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("not taken top");
          return false;
        } else {
          console.log("username taken top");
          return true;
        }
      });
  };

  // Handle fields change
  const handleChange = (input) => ({ target: { value } }) => {
    // Set values to the fields
    setFields({
      ...fields,
      [input]: value,
    });

    console.log("input", input);
    console.log("input value", value);
    setUserContext({ ...userContext, [input]: value.toLowerCase() });

    // Handle errors
    const formErrors = { ...filedError };
    const lengthValidate = value.length > 0 && value.length < 3;

    switch (input) {
      case "city":
        formErrors.city = lengthValidate
          ? "Minimum 3 characaters required"
          : "";
        break;
      case "username":
        handleUsername(value).then((e) => {
          formErrors.username = e
            ? "username taken bottom"
            : "not taken bottom";
        });
        // formErrors.username = lengthValidate
        //   ? "Minimum 3 characaters required"
        //   : "";
        console.log("formErrors.username", formErrors.username);
        handleUsername(value).then((e) => {
          console.log("handleUsername(value)", e);
        });

        break;
      default:
        break;
    }

    // set error hook
    Object.values(formErrors).forEach((error) =>
      error.length > 0 ? setIsError(true) : setIsError(false)
    );
    // set errors hook
    setFieldError({
      ...formErrors,
    });
  };

  const handleSteps = (step) => {
    console.log("steps", step);
    switch (step) {
      case 0:
        return (
          <FirstStep
            handleNext={handleNext}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        );
      case 1:
        return (
          <SecondStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        );
      case 2:
        return (
          <Confirm
            handleNext={handleNext}
            handleBack={handleBack}
            values={fields}
          />
        );
      default:
        break;
    }
  };

  // Handle components
  return (
    <Fragment>
      {steps != 3 ? (
        <Typography component="h1" variant="h4" align="center">
          Create Your Clout Profile
        </Typography>
      ) : null}

      {steps === labels.length ? (
        <Success />
      ) : (
        <Fragment>
          <Stepper activeStep={steps} className={classes.stepper}>
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {handleSteps(steps)}
        </Fragment>
      )}
    </Fragment>
  );
};

export default StepForm;
