// import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// import { Link, useNavigate } from "react-router-dom"
// import {Form, Row, Col} from 'react-bootstrap'
// import {useDispatch, useSelector} from 'react-redux'
import FormContainer from "../components/Common_Components/FormContainer"
// import { useLoginMutation } from "../store/slices/usersApiSlice"
// import { setCredentials } from "../store/slices/authSlice"
// import {toast} from 'react-toastify'
// import Loader from '../components/Loader';

import Button from "@mui/material/Button";
import  TextField from "@mui/material/TextField";
import { useLoginFormControls } from "../hooks/useLoginFormControls";
import Box from '@mui/material/Box';



    const inputFieldValues = [
        {
            name: "email",
            label: "Email",
            id: "email",
            type:"email",
            
        },
        {
            name: "password",
            label: "Password",
            id: "password",
            type: "password"
        },
        ];


export default function LoginScreen(){

    const {
        handleInputValue,
        handleFormSubmit,
        formIsValid,
        errors
    } = useLoginFormControls();


  return (

        <>
    <FormContainer>  
        <h1>Sign In</h1>
        <br />
   
    <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
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
                helperText: errors[inputFieldValue.name]
                })}
            />
            );
        })}
        <br />
        <br />
        <Button
            variant="contained"
            type="submit"
            disabled={!formIsValid()}
        >
            Sign In
        </Button>
        {/* </form> */}
    </Box>
    <br />
    <div>
        New user? <Link to='/register'> Register</Link>
    </div>

        {/* <div>{ isLoading && <Loader />}</div> */}
    </FormContainer>
    </>
    
  );
}





