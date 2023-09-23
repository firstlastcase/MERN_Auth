import { useState } from "react"
import {Button, Form} from 'react-bootstrap'
import {toast} from 'react-toastify'
import Loader from "./Loader"
import { useUpdateUserRoleMutation } from "../store/slices/usersApiSlice"



export default function UserEdit({user}) {

    // const {currentName, currentEmail, currentPassword} = userInfo

    // is there a better way to write this? check Stephen Grider's lesson #393 of course: Modern React with Redux

    const [name,setName]= useState(user.name)
    const [email,setEmail]= useState(user.email)
    const [role,setRole]= useState(user.role)
    const [account,setAccount]= useState(user.account)
    const [password,setPassword] = useState('')

    const [updateUser, {isLoading}] = useUpdateUserRoleMutation()

    // const dispatch = useDispatch()


    const handleSubmit = async(event)=>{
        event.preventDefault();
        // console.log('name: ',name,' - email: ', email,' - role:',role,' - account:',account)
      
        try{
            const res = await updateUser({_id:user._id, account,name, email, role}).unwrap();
            !res.error?toast.success("User profile updated successfully!"):toast.error(res.error?.data?.message)
        }catch(err){
            toast.error(err?.data?.message || err.error)

        }
      
        
    }

  return (

    <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='name'
                    value={name}
                    onChange={e=>setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type='email'
                value={email}
                onChange={e=>setEmail(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='role'>
            <Form.Label>Role</Form.Label>
            <Form.Control
                type='text'
                value={role}
                onChange={e=>setRole(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='account'>
            <Form.Label>Account</Form.Label>
            <Form.Control
                disabled
                type='text'
                value={account}
                onChange={e=>setAccount(e.target.value)}
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
            { isLoading && <Loader />}
            <Button type='submit' variant='primary' className='mt-3'>
                Update details
            </Button>

      
        </Form>
    </>
  )
}

 