import { useState} from "react"
// import {useNavigate } from "react-router-dom"
import {Button, Form} from 'react-bootstrap'
// import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from "./Loader"
import { useAddCampaignMutation } from "../store/slices/campaignApiSlice"



export default function CampaignAdd({accountNumber}) {

    const [name,setName]= useState('')
    const [purpose,setPurpose]= useState('')
    
    const [addCampaign, {isLoading}] = useAddCampaignMutation()

    const handleSubmit = async(event)=>{
        event.preventDefault();
      
        try{
            const res = await addCampaign({name, purpose,accountNumber}).unwrap();
            !res.error?toast.success("New campaign created successfully"):toast.error(res.error?.data?.message)

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

            <Form.Group className="my-2" controlId='purpose'>
            <Form.Label>Purpose</Form.Label>
            <Form.Control
                type='purpose'
                value={purpose}
                onChange={e=>setPurpose(e.target.value)}
            ></Form.Control>
            </Form.Group>


            { isLoading && <Loader />}

            <Button type='submit' variant='primary' className='mt-3'>
                Create new campaign
            </Button>

      
        </Form>
    </>
  )
}

 