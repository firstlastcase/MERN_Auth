import { useState } from "react"
// import {Button, Form, Row, Col} from 'react-bootstrap'
import {toast} from 'react-toastify'
import Loader from "./Common_Components/Loader"
import { useRegisterMutation } from "../store/slices/usersApiSlice"
import { useSelector } from "react-redux"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";


export default function RegisterUserByAdmin({account}) {

    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [role,setRole]= useState('')
    const [password,setPassword] = useState('')
    // const [confirmPassword,setConfirmPassword] = useState('')
    const [register, {isLoading}] = useRegisterMutation()


    const {userInfo} = useSelector(state=>state.auth)


     const handleSubmit = async(event)=>{
        event.preventDefault();
        // if(password!==confirmPassword){
        //     toast.error('Passwords do not match')
        // }else{
            if(userInfo&&userInfo.role.toString()===import.meta.env.VITE_SA_ROLE){
            try{
                const res = await register({email, name, password, role, account}).unwrap();
                res&&toast.success('User created successfully')
            }catch(err){
                toast.error(err?.data?.message || err.error)
            }       
            
        }else{

            toast.error('You are not authorized to register')
        }
        // }
    }

  const notReadyToRegister = email===''|| name===''|| password===''|| role===''|| account===''


  return (
    <>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '20ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              required
              label="Name"
              id="name"
              value={name}
              size="small"
              onChange={e=>setName(e.target.value)}
            />
            <TextField
            required
              label="Email"
              id="emailAddress"
              type="email"
              value={email}
              size="small"
              onChange={e=>setEmail(e.target.value)}
            />
            <TextField
            required
              label="Role"
              id="role"
              type="number"
              value={role}
              size="small"
              onChange={e=>setRole(e.target.value)}
            />
            <TextField
              required
              label="Password"
              id="password"
              type="password"
              value={password}
              size="small"
              onChange={e=>setPassword(e.target.value)}
            />
           
          </div>
          <Button disabled={notReadyToRegister}
          type='submit' variant='contained' className='mt-3'>
              Add User
          </Button>
          
        </Box>
    </>
  )
}

 