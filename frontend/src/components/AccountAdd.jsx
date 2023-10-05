import { useState} from "react"
// import {useNavigate } from "react-router-dom"
import {Button, Form} from 'react-bootstrap'
// import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from "./Common_Components/Loader"
import { useAddAccountMutation } from "../store/slices/accountApiSlice"



export default function AccountAdd() {

    // const {currentName, currentEmail, currentPassword} = accountInfo

    // is there a better way to write this? check Stephen Grider's lesson #393 of course: Modern React with Redux

    const [name,setName]= useState('')
    const [number,setNumber]= useState(0)
    const [status,setStatus]= useState(0)
    

    const [addAccount, {isLoading}] = useAddAccountMutation()

    // const dispatch = useDispatch()


    const handleSubmit = async(event)=>{
        event.preventDefault();
      
        try{
            const res = await addAccount({name, number,status}).unwrap();
            !res.error?toast.success("New account created successfully"):toast.error(res.error?.data?.message)

        }catch(err){
            toast.error(err?.data?.message || err.error)

        }
      
        
    }

  return (

    <>
    {/* <FormContainer>   */}
        {/* <h5>Updating Account{account.name}</h5> */}
        <Form onSubmit={handleSubmit}>

            <Form.Group className="my-2" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='name'
                    value={name}
                    onChange={e=>setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='number'>
            <Form.Label>Number</Form.Label>
            <Form.Control
                type='number'
                value={number}
                onChange={e=>setNumber(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='status'>
            <Form.Label>Status</Form.Label>
            <Form.Control
                type='number'
                value={status}
                onChange={e=>setStatus(e.target.value)}
            ></Form.Control>
            </Form.Group>

            {/* <Form.Group className="my-2" controlId='accountId'>
            <Form.Label>Id</Form.Label>
            <Form.Control
                disabled
                type='text'
                value={account._id}
                // onChange={e=>setAccount(e.target.value)}
            ></Form.Control>
            </Form.Group> */}

            { isLoading && <Loader />}

            <Button type='submit' variant='primary' className='mt-3'>
                Create new account
            </Button>

      
        </Form>
    {/* </FormContainer> */}
    </>
  )
}

 