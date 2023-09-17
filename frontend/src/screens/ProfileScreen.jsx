import { useState, useEffect } from "react"
// import {useNavigate } from "react-router-dom"
import {Button, Form} from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from "../components/Loader"
import { useUpdateUserMutation } from "../store/slices/usersApiSlice"
import { setCredentials } from "../store/slices/authSlice"
import useIdleLogout from "../hooks/useIdleLogout"
import IdleTimeout from "../components/IdleTimeout"


export default function ProfileScreen() {

    const {userInfo} = useSelector(state=>state.auth)
    // const {currentName, currentEmail, currentPassword} = userInfo

    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [updateProfile, {isLoading}] = useUpdateUserMutation()

    const dispatch = useDispatch()
    // const navigate = useNavigate()



    useEffect(()=>{
      setName(userInfo.name)
      setEmail(userInfo.email)
              
    },[userInfo.name,userInfo.email])

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(password!==confirmPassword){
            toast.error('Passwords do not match')
        }else{
            try{
            const res = await updateProfile({_id:userInfo._id, name, password}).unwrap();
            dispatch(setCredentials({...res}))
            // navigate('/')
            toast.success('User profile updated successfully!')
        }catch(err){
            toast.error(err?.data?.message || err.error)

        }
        }
        
    }
    const {handleTimeout} = useIdleLogout()

  return (

    <>
    <IdleTimeout timeout={1800000} onTimeout={handleTimeout} />
    <FormContainer>  
        <h1>Update Profile</h1>
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
                disabled
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
                Update details
            </Button>

      
        </Form>
    </FormContainer>
    </>
  )
}

 