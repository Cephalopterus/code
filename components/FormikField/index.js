import React from "react";
import { ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";

import "./FormikField.module.css";

const FormikField = ({
  name,
  label,
  type = "text",
  required = false,
  autoComplete = "off",
  variant = "outlined",
}) => {
  return (
    <div className="FormikField">
      <Field
        variant={variant}
        required={required}
        autoComplete={autoComplete}
        as={TextField}
        label={label}
        name={name}
        fullWidth
        type={type}
        helperText={<ErrorMessage name={name} />}
      />
    </div>
  );
};

export default FormikField;
