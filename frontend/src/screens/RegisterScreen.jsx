import { useEffect, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import {Button, Form, Row, Col} from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from "../components/Loader"
import { useRegisterMutation } from "../store/slices/usersApiSlice"
import { setCredentials } from "../store/slices/authSlice"


export default function RegisterScreen() {

    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [register, {isLoading}] = useRegisterMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {userInfo} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate,userInfo])

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(password!==confirmPassword){
            toast.error('Passwords do not match')
        }else{
            try{
            const res = await register({email, name, password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')
        }catch(err){
            toast.error(err?.data?.message || err.error)

        }
        }
        
    }

  return (

    <FormContainer>  
        <h1>Sign Up</h1>
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
                Sign Up
            </Button>

            <Row className="py-3">
                <Col>
                    Existing user? <Link to='/login'> Login</Link>
                </Col>

            </Row>
        </Form>
    </FormContainer>
  )
}

 