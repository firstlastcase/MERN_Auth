import { Link, useNavigate } from "react-router-dom"
import FormContainer from "./Common_Components/FormContainer"
import { useRegisterMutation } from "../store/slices/usersApiSlice"
import {toast} from 'react-toastify'
import Loader from './Common_Components/Loader';

import Button from "@mui/material/Button";
import  TextField from "@mui/material/TextField";
import { useFormControls } from "../hooks/useFormControls";
import Box from '@mui/material/Box';



    const inputFieldValues = [
        {
            name: "name",
            label: "Name",
            id: "name"
            
        },
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
        {
            name: "confirmPassword",
            label: "confirmPassword",
            id: "confirmPassword",
            type: "password"
        },
        ];

        const initialFormValues = {
            name:"",
            email: "",
            password:'',
            confirmPassword:"",
            formSubmitted: false,
            success: false
        };


export default function RegisterUser({account}){

    const navigate = useNavigate();

  
    const [register, {isLoading}] = useRegisterMutation()



    const onFormSubmit= async (v)=>{
          const name=v.name;
          const email=v.email;
          const password = v.password;
          try{
            const res = await register({email, name, password, account}).unwrap();
            res&&navigate('/login')
            res?toast.success('Registration successful'):res&&toast.success('User created successfully')
        }catch(err){
            toast.error(err?.data?.message || err.error)
        }       
    }

        const {
        handleInputValue,
        handleFormSubmit,
        formIsValid,
        errors
    } = useFormControls(initialFormValues,onFormSubmit);



  return (

        <>
    <FormContainer>  
        <h1>Register</h1>
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
            Sign Up
        </Button>
        {/* </form> */}
    </Box>
    <br />
    <div>
        Existing user? <Link to='/login'> Login</Link>
    </div>

        <div>{ isLoading && <Loader />}</div>
    </FormContainer>
    </>
    
  );
}





