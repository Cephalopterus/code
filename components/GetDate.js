import React from "react";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import { Formik, Form, yupToFormErrors, Field } from "formik";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const EventDetailsSchema = Yup.object().shape({
  eventDate: Yup.string().required("Please enter the date"),
});

const initialValues = {
  eventDate: null,
};

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        clearable
        disablePast
        label="Enter the date"
        name={field.name}
        value={field.value}
        format="dd/MM/yyyy"
        helperText={currentError}
        error={Boolean(currentError)}
        onError={(error) => {
          if (error !== currentError) {
            form.setFieldError(field.name, error);
          }
        }}
        onChange={(date) => form.setFieldValue(field.name, date, true)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

export default function GetDate(props) {
  const handleSubmit = (values) => {
    console.log(values.eventDate);
    props.eventDate(values.eventDate);
    props.nextButtonEventHandler();
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={EventDetailsSchema}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <Field name="eventDate" component={DatePickerField} />
              <Button
                variant="contained"
                color="primary"
                disabled={!dirty}
                type="submit"
                onClick={handleSubmit}
              >
                Next
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
