import { useState, useEffect } from "react"
// import {useNavigate } from "react-router-dom"
import {Button, Form} from 'react-bootstrap'
import FormContainer from "../components/Common_Components/FormContainer"
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from "../components/Common_Components/Loader"
import { useGetAccountQuery } from "../store/slices/accountApiSlice"
import { setAccount } from "../store/slices/accountSlice"
import useIdleLogout from "../hooks/useIdleLogout"
import IdleTimeout from "../components/Common_Components/IdleTimeout"


export default function AccountScreen() {

    const {userInfo} = useSelector(state=>state.auth)
    const {accountInfo} = useSelector(state=>state.account)
    // const {currentName, currentEmail, currentPassword} = accountInfo

    // const [name,setName]= useState('')
    // const [number,setNumber]= useState('')
    // const [accountStatus,setAccountStatus] = useState('')

    const {data, error, isLoading} = useGetAccountQuery({_id:userInfo.account})
    //data is the account object {name, number, accountStatus}

    // if(error){
    //     toast.error(`could not get account details ${error.data.message}`)
    // }
    // if (data) {
    //     try{
    //     setName(data.name)
    //     setNumber(data.number)
    //     setAccountStatus(data.status)

    //     }catch(e){
    //         toast.error(`could not get account details ${e.message}`)
    //     }
    // }

    const dispatch = useDispatch()
    // const navigate = useNavigate()



    useEffect(()=>{
        try{
            if (data){
            dispatch(setAccount({...data}))
            // toast.success('Account info refreshed!')
            }
        }catch(err){
            toast.error(err?.data?.message || err.error)

        }
    //   setName(accountInfo.name)
    //   setNumber(accountInfo.number)
    //   setAccountStatus(accountInfo.status)

    //    setName(data.name)
    //     setNumber(data.number)
    //     setAccountStatus(data.status)
              
    // },[data])
    },[accountInfo.name,accountInfo.number,accountInfo.status])
    // },[])

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            if (data){
            dispatch(setAccount({...data}))
            toast.success('Account info refreshed!')
            }
        }catch(err){
            toast.error(err?.data?.message || err.error)

        }
    }
        
    
    const {handleTimeout} = useIdleLogout()

  return (

    <>
    <IdleTimeout timeout={3600000} onTimeout={handleTimeout} />
    <FormContainer>  
        <h1>Account Details</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId='name'>
                <Form.Label>Account Name</Form.Label>
                <Form.Control
                    type='name'
                    value={accountInfo.name}
                    // onChange={e=>setName(e.target.value)}
                    disabled
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId='number'>
            <Form.Label>Account Number</Form.Label>
            <Form.Control
                disabled
                type='text'
                value={accountInfo.number}
                // onChange={e=>setNumber(e.target.value)}
            ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId='accountStatus'>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    disabled
                    type='text'
                    value={accountInfo.status}
                    // onChange={e=>setAccountStatus(e.target.value)}
                ></Form.Control>
            </Form.Group>
            { isLoading && <Loader />}
            <Button  type='submit' variant='primary' className='mt-3'>
                Refresh Account info
            </Button>

      
        </Form>
    </FormContainer>
    </>
  )
}

 