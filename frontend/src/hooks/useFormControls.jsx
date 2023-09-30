import { useState } from "react"


export const useFormControls = (initialFormValues,onFormSubmit) => {


  const submitForm = onFormSubmit;

  //  #################################
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    if ("password" in fieldValues)
      temp.password =
      fieldValues.password.length >= 6? "" : "Password need to be at least 6 characters";

    if ("confirmPassword" in fieldValues)
      // temp.confirmPassword =
      //   fieldValues.confirmPassword=== values.password ? "" : "Password fields need to match";
      // fieldValues.confirmPassword.length >= 6? "" : "Password need to be at least 6 characters";
      temp.confirmPassword = (fieldValues.confirmPassword&&fieldValues.confirmPassword===values.password)?
         "" : "Password fields must match"

    setErrors({
      ...temp
    });
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    validate({ [name]: value });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.email &&
      fieldValues.password 
      &&Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid =
      Object.values(errors).every((x) => x === "") && formIsValid();
    if (isValid) {
      await submitForm(values);
    }
  };

  return {
    values,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid
  };
};
