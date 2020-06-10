import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormikField from "../components/FormikField";
import FormikSelect from "../components/FormikSelect";
import { Formik, Form, yupToFormErrors, Field } from "formik";
import * as Yup from "yup";

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
    margin: theme.spacing(5, 6),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(22),
  },
}));

const StudentDetailsSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").required("Required"),
  rollNumber: Yup.string()
    .matches(/^\d{5}(A|B)\d{4}/, "Please use the correct roll number")
    .required("Required"),
  email: Yup.string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "Please enter a correct email ID"
    )
    .required("Required"),
  mobileNumber: Yup.string().required("Required"),
  parents: Yup.boolean(),
  noOfParents: Yup.number().when("parents", {
    is: true,
    then: Yup.number("Please enter a valid number")
      .min(1, "Atleast one parent must attend")
      .max(2, "Only two parents can attend")
      .required("Please enter the number of parents"),
    otherwise: Yup.number("Please enter a valid number")
      .min(0, "You have selected parent's aren't attending!")
      .max(0, "You have selected parent's aren't attending!"),
  }),
});

const initialValues = {
  firstName: "",
  lastName: "",
  rollNumber: "",
  email: "",
  mobileNumber: "",
  parents: false,
  noOfParents: "",
};

const parents = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

export default function StudentForm(props) {
  const classes = useStyles();
  const [Department, setDep] = React.useState("");

  const handleSubmit = (values) => {
    props.nextButtonEventHandler();
    alert(JSON.stringify(values));
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={StudentDetailsSchema}
        >
          {({ dirty, isValid }) => {
            return (
              <div className={classes.paper}>
                <Form className={classes.form}>
                  <Grid item xs={12} sm={6}>
                    <FormikField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required="true"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikField
                      variant="outlined"
                      required="true"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikField
                      variant="outlined"
                      required="true"
                      label="Roll Number"
                      name="rollNumber"
                      autoComplete="rollno."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikField
                      variant="outlined"
                      required
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikField
                      variant="outlined"
                      required
                      label="Mobile Number"
                      name="mobileNumber"
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikSelect
                      name="parents"
                      items={parents}
                      label="Are parents attending?"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikField
                      variant="outlined"
                      label="If yes, how many?"
                      name="noOfParents"
                      autoComplete="off"
                      disabled={false}
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
        <Box mt={5} />
      </Container>
    </>
  );
}
