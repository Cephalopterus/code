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

const ConvocationDetailsSchema = Yup.object().shape({
  convocationName: Yup.string().required("Enter the name please"),
  numberOfBranches: Yup.number()
    .required("Please enter the number of branches")
    .min(1, "There needs to be atleast one branch")
    .max(3, "You can't have more than three branches!"),
  branches: Yup.string(),
  seatsOfFirst: Yup.string().required(),
  seatsOfSecond: Yup.string().when("numberOfBranches", {
    is: 2 || 3,
    then: Yup.string().required("You need to enter this"),
    else: Yup.string(),
  }),
  seatsOfThird: Yup.string().when("numberOfBranches", {
    is: 3,
    then: Yup.string().required("You need to enter this"),
    else: Yup.string(),
  }),
});

const initialValues = {
  convocationName: "",
  numberOfBranches: "",
  branches: "",
  seatsOfFirst: "",
  seatsOfSecond: "",
  seatsOfThird: "",
};

export default function ConvocationForm(props) {
  const handleSubmit = (values) => {
    props.nextButtonEventHandler();
    props.setDetails(values);
    props.setBranches(values.numberOfBranches);
    alert(JSON.stringify(values));
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={ConvocationDetailsSchema}
        >
          {({ dirty, isValid }) => {
            return (
              <Form>
                <FormikField
                  name="convocationName"
                  label="Name of the Convocation"
                  required
                />
                <FormikField
                  name="numberOfBranches"
                  label="How many branches you do want"
                  required
                  type="number"
                />
                <FormikField
                  name="branches"
                  label="Enter branch names, use commas"
                  required
                />
                <FormikField
                  name="seatsOfFirst"
                  label="Seating of first branch"
                  required
                />
                <FormikField
                  name="seatsOfSecond"
                  label="Seating of second branch(OPTIONAL)"
                  required
                />
                <FormikField
                  name="seatsOfThird"
                  label="Seating of third branch(OPTIONAL)"
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!dirty || !isValid}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
        <Box mt={5} />
      </Container>
    </>
  );
}
