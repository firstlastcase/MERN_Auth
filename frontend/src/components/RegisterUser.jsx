import { useEffect, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import {Button, Form, Row, Col} from 'react-bootstrap'
import FormContainer from "./FormContainer"
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from "./Loader"
import { useRegisterMutation } from "../store/slices/usersApiSlice"
import { setCredentials } from "../store/slices/authSlice"


export default function RegisterUser({endUser=true, account}) {

    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [role,setRole]= useState('')
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
                
                const res = await register({email, name, password, role, account}).unwrap();
                res&&endUser&&navigate('/login')
                res&&endUser?toast.success('Registration successful'):res&&toast.success('User created successfully')
            }catch(err){
                toast.error(err?.data?.message || err.error)
            }       
            
        }else{

            toast.error('You are not authorized to register')
        }
        }
    }

  return (
    <>
     {/* <FormContainer>   */}
        {endUser&&<h1>Sign Up</h1>}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId='name'>
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
            {!endUser&&<Form.Group className="my-2" controlId='role'>
            <Form.Label>Role</Form.Label>
            <Form.Control
                type='number'
                placeholder="Role"
                value={role}
                onChange={e=>setRole(e.target.value)}
            ></Form.Control>
            </Form.Group>}
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
            </Form.Group>
            { isLoading && <Loader />}
            <Button type='submit' variant='primary' className='mt-3'>
                {endUser?'Sign Up':'Add User'}
            </Button>

            {endUser&&<Row className="py-3">
                <Col>
                    Existing user? <Link to='/login'> Login</Link>
                </Col>

            </Row>}
        </Form>
    {/* </FormContainer> */}
    </>
  )
}

 