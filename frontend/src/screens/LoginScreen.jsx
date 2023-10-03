import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../store/slices/usersApiSlice";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormControls } from "../hooks/useFormControls";
import Box from "@mui/material/Box";

const inputFieldValues = [
  {
    name: "email",
    label: "Email",
    id: "email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    id: "password",
    type: "password",
  },
];

const initialFormValues = {
  email: "",
  password: "",
  formSubmitted: false,
  success: false,
};

export default function LoginScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const onFormSubmit = async (v) => {
    const email = v.email;
    const password = v.password;
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls(initialFormValues, onFormSubmit);

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        <br />

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          {inputFieldValues.map((inputFieldValue, index) => {
            return (
              <TextField
                size="small"
                key={index}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                name={inputFieldValue.name}
                label={inputFieldValue.label}
                // error={errors[inputFieldValue.name]}
                multiline={inputFieldValue.multiline ?? false}
                fullWidth
                rows={inputFieldValue.rows ?? 1}
                autoComplete="none"
                type={inputFieldValue.type || "text"}
                {...(errors[inputFieldValue.name] && {
                  error: true,
                  helperText: errors[inputFieldValue.name],
                })}
              />
            );
          })}
          <br />
          <br />
          <Button variant="contained" type="submit" disabled={!formIsValid()}>
            Sign In
          </Button>
          {/* </form> */}
        </Box>
        <br />
        <div>
          New user? <Link to="/register"> Register</Link>
        </div>

        <div>{isLoading && <Loader />}</div>
      </FormContainer>
    </>
  );
}
