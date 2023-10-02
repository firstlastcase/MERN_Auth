import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {Button, Form} from 'react-bootstrap'
import { useSelector} from 'react-redux'
import FormContainer from "../components/FormContainer"
import {toast} from 'react-toastify'
import IdleTimeout from "../components/IdleTimeout"
import useIdleLogout from "../hooks/useIdleLogout"

// import TableView from "./XTestFileTable"


export default function Campaign(){

    const [phoneNumId,setPhoneNumId]= useState('')
    const [contactNumber,setContactNumber] = useState('')

    const navigate = useNavigate();


    const {userInfo} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/campaign')
        }
    },[navigate,userInfo])

    const runCampaign = async (event)=>{
        event.preventDefault();
        try{
           toast.info('running the campaign! placeholder for the code!!')
            // navigate('/')
        }catch(err){
            toast.error(err?.data?.message || err.error)
        }
    }

//######################

// #####################################

    // // const {userInfo} = useSelector(state=>state.auth)
    // const {campaigns} = useSelector(state=>state.campaign)
    // // const {currentName, currentEmail, currentPassword} = accountInfo

    // const [name,setName]= useState('')
    // const [number,setNumber]= useState('')
    // const [accountStatus,setAccountStatus] = useState('')
    // // const [getAccount, {isLoading}] = useGetAccountQuery()

    // const dispatch = useDispatch()
    // // const navigate = useNavigate()



    // useEffect(()=>{
    //   setName(accountInfo.name)
    //   setNumber(accountInfo.number)
    //   setAccountStatus(accountInfo.status)
              
    // },[accountInfo.name,accountInfo.number])
    // // },[])

    // const handleSubmit = async(event)=>{
    //     event.preventDefault();
    //     try{
    //         // const res = await getAccount({id:userInfo.account});
    //         // dispatch(setAccount({...res}))
    //         dispatch(setAccount({name:"hello Account",number:44444,status:999}))
    //         // navigate('/')
    //         toast.success('User profile updated successfully!')
    //     }catch(err){
    //         toast.error(err?.data?.message || err.error)

    //     }
    // }




//######################
    const {handleTimeout} = useIdleLogout()

  return (

    <>
    <IdleTimeout timeout={1800000} onTimeout={handleTimeout} />
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
                Submit
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
            <Button type='submit' variant='primary' className='mt-3'>
                Add number
            </Button>

           
        </Form>
            
    </FormContainer>

    </>
  )
}