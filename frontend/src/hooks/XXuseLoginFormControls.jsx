import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { useLoginMutation } from "../store/slices/usersApiSlice"
import { setCredentials } from "../store/slices/authSlice"
import {toast} from 'react-toastify'
import Loader from '../components/Loader';


const initialFormValues = {
  email: "",
  password:'',
  formSubmitted: false,
  success: false
};

export const useLoginFormControls = () => {


    // const [email,setEmail]= useState('')
    // const [password,setPassword] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/home')
        }
    },[navigate,userInfo])

          const submitForm = async (v)=>{
        // const submitForm = async (v, successCallback, errorCallback) => {
          const email=v.email;
          const password = v.password;
          try{
            const res = await login({email, password}).unwrap();
            // res&&successCallback();
            dispatch(setCredentials({...res}))
            navigate('/home')
        }catch(err){
            toast.error(err?.data?.message || err.error)
            // errorCallback();

        }
    }




  //  #################################
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    // if ("fullName" in fieldValues)
    //   temp.fullName = fieldValues.fullName ? "" : "This field is required.";

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length >= 6 ? "" : "Password need to be at least 6 characters";
    // if ("message" in fieldValues)
    //   temp.message =
    //     fieldValues.message.length !== 0 ? "" : "This field is required.";

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

  // const handleSuccess = () => {
  //   setValues({
  //     ...initialFormValues,
  //     // formSubmitted: true,
  //     success: true
  //   });
  // };

  // const handleError = () => {
  //   setValues({
  //     ...initialFormValues,
  //     // formSubmitted: true,
  //     success: false
  //   });
  // };

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
      // await PostContactForm(values, handleSuccess, handleError);
      // await submitForm(values, handleSuccess, handleError);
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
