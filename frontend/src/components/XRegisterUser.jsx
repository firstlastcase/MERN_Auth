import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
// import {Button, Form, Row, Col} from 'react-bootstrap'
import {toast} from 'react-toastify'
import Loader from "./Loader"
import { useRegisterMutation } from "../store/slices/usersApiSlice"
import { useSelector } from "react-redux"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormContainer from "./FormContainer"
import Box from '@mui/material/Box';


export default function XRegisterUser({account}) {

    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    // const [role,setRole]= useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [register, {isLoading}] = useRegisterMutation()

    // const dispatch = useDispatch()
    const navigate = useNavigate()

    const {userInfo} = useSelector(state=>state.auth)

    // useEffect(()=>{
    //     if(userInfo){
    //         navigate('/new');
    //     }
    // },[navigate,userInfo])


     const handleSubmit = async(event)=>{
        event.preventDefault();
        if(password!==confirmPassword){
            toast.error('Passwords do not match')
        }else{
            if(userInfo&&userInfo.role.toString()===import.meta.env.VITE_SA_ROLE){
            try{
                
                const res = await register({email, name, password, account}).unwrap();
                res&&navigate('/login')
                res?toast.success('Registration successful'):res&&toast.success('User created successfully')
            }catch(err){
                toast.error(err?.data?.message || err.error)
            }       
            
        }else{

            toast.error('You are not authorized to register')
        }
        }
    }

    const notReadyToRegister = email===''|| name===''|| password===''|| account===''

  return (
    <>
      <FormContainer>

        <h1>Sign Up</h1>
        {/* <Form onSubmit={handleSubmit}> */}
            {/* <Form.Group className="my-2" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder="Enter your name"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type='email'
                placeholder="Enter Email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
            ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder="Enter Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder="Enter Password again"
                    value={confirmPassword}
                    onChange={e=>setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group> */}

            
            {/* { isLoading && <Loader />}
            <Button type='submit' variant='primary' className='mt-3'>
                Sign Up
            </Button> */}

          {/* <Row className="py-3">
                <Col>
                    Existing user? <Link to='/login'> Login</Link>
                </Col>

            </Row> */}
        {/* </Form> */}

            {/* Material UI */}

            


        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
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
              label="Password"
              id="password"
              type="password"
              value={password}
              size="small"
              onChange={e=>setPassword(e.target.value)}
            />
            <TextField
              required
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              size="small"
              onChange={e=>setConfirmPassword(e.target.value)}
            />
           
          </div>
          <Button disabled={notReadyToRegister}
          type='submit' variant='contained' className='mt-3'>
              Add User
          </Button>
          { isLoading && <Loader />}
          <div>Existing user? <Link to='/login'> Login</Link></div>
          
        </Box>
              </FormContainer>

    </>
  )
}

 