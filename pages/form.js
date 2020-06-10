import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import StudentForm from "../components/StudentForm";
import EventForm from "../components/EventForm";
import ThankYou from "../components/ThankYou";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: "#29b6f6",
    },
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(3, 10),
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

export default function Registration() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [event, addEvent] = React.useState("");
  const [state, setState] = React.useState(1);

  switch (state) {
    case 1:
      return (
        <EventForm
          nextButtonEventHandler={() => setState(2)}
          eventLoader={(eventData) => addEvent(eventData)}
        />
      );
    case 2:
      return (
        <StudentForm
          nextButtonEventHandler={() => setState(3)}
          eventSelected={event}
        />
      );
    case 3:
      return <ThankYou />;
    default:
      throw new Error(`Unknnown page ID ${state}`);
  }
}
