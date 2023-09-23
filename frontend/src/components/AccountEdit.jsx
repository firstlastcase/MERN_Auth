import { useState} from "react"
// import {useNavigate } from "react-router-dom"
import {Button, Form} from 'react-bootstrap'
// import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from "./Loader"
import { useUpdateAccountMutation } from "../store/slices/accountApiSlice"



export default function AccountEdit({account}) {

    // const {currentName, currentEmail, currentPassword} = accountInfo

    // is there a better way to write this? check Stephen Grider's lesson #393 of course: Modern React with Redux

    const [name,setName]= useState(account.name)
    const [number,setNumber]= useState(account.number)
    const [status,setStatus]= useState(account.status)
    

    const [updateAccount, {isLoading}] = useUpdateAccountMutation()

    // const dispatch = useDispatch()


    const handleSubmit = async(event)=>{
        event.preventDefault();
      
        try{
            const res = await updateAccount({_id:account._id, name, number,status}).unwrap();
            !res.error?toast.success("Account updated successfully"):toast.error(res.error?.data?.message)
            console.log(res)

        }catch(err){
            toast.error(err?.data?.message || err.error)

        }
      
        
    }

  return (

    <>
    {/* <FormContainer>   */}
        {/* <h5>Updating Account{account.name}</h5> */}
        <Form onSubmit={handleSubmit}>

            <Form.Group className="my-2" controlId='accountId'>
            <Form.Label>Id</Form.Label>
            <Form.Control
                disabled
                type='text'
                value={account._id}
                // onChange={e=>setAccount(e.target.value)}
            ></Form.Control>
            </Form.Group>

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
                type='text'
                value={status}
                onChange={e=>setStatus(e.target.value)}
            ></Form.Control>
            </Form.Group>

            { isLoading && <Loader />}

            <Button type='submit' variant='primary' className='mt-3'>
                Update Account details
            </Button>

      
        </Form>
    {/* </FormContainer> */}
    </>
  )
}

 