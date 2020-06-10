import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormikSelect from "../components/FormikSelect";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(22),
  },
}));

//Make this dynamic based on a fetch
const Convos = [
  {
    label: "IT CMPN Convocation",
    value: "0001",
  },
  {
    label: "BIOMED ETRX Convocation",
    value: "0002",
  },
];

const EventDetailsSchema = Yup.object().shape({
  convocationName: Yup.string().required("You need to select an event"),
});

const initialValues = {
  convocationName: "",
};

//Replace this grouped select with a fetch + map of the options
export default function EventForm(props) {
  const classes = useStyles();
  const handleSubmit = (values) => {
    alert(JSON.stringify(values));
    props.nextButtonEventHandler();
    props.eventLoader(values.convocationName);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={EventDetailsSchema}
        >
          {({ dirty, isValid }) => {
            return (
              <div className={classes.paper}>
                <Form className={classes.form}>
                  <Grid item xs={12}>
                    <FormikSelect
                      name="convocationName"
                      items={Convos}
                      label="Please select the event you want"
                      required
                    />
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!dirty || !isValid}
                    type="submit"
                    className={classes.submit}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
      <Box mt={5} />
    </Container>
  );
}
