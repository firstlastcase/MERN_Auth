import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {Button, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from "../components/FormContainer"
import { useLoginMutation } from "../store/slices/usersApiSlice"
import { setCredentials } from "../store/slices/authSlice"
import {toast} from 'react-toastify'
import Loader from '../components/Loader';






export default function Campaign(){

    const [phoneNumId,setPhoneNumId]= useState('')
    const [contactNumber,setContactNumber] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/campaign')
        }
    },[navigate,userInfo])

    const runCampaign = async (event)=>{
        event.preventDefault();
        try{
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}))
            // navigate('/')
        }catch(err){
            toast.error(err?.data?.message || err.error)

        }
    }

  return (

    <>

    <FormContainer>
        <h1>Campain settings</h1>
        <Form onSubmit={runCampaign}>
            <Form.Group className="my-2" controlId='phoneNumId'>
              <Form.Label>Dial from (Your business Phone number)</Form.Label>
              <Form.Control
                  type='text'
                  placeholder="Zendesk Phone number ID"
                  value={phoneNumId}
                  onChange={e=>setPhoneNumId(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button disabled={phoneNumId===''} type='submit' variant='primary' className='mt-3'>
                Submit { isLoading && <Loader />}
            </Button>
            {/* { isLoading && <Loader />} */}

        </Form>
            
    </FormContainer>

    <FormContainer>
        <h3>Add contacts</h3>
        <Form onSubmit={runCampaign}>
            <Form.Group className="my-2" controlId='contactNumber'>
                <Form.Label>contactNumber</Form.Label>
                <Form.Control
                    type='text'
                    placeholder="Enter contactNumber"
                    value={contactNumber}
                    onChange={e=>setContactNumber(e.target.value)}
                ></Form.Control>
            </Form.Group>
            { isLoading && <Loader />}
            <Button type='submit' variant='primary' className='mt-3'>
                Add number
            </Button>

           
        </Form>
            
    </FormContainer>
    <div>{ isLoading && <Loader />}</div>
    </>
  )
}