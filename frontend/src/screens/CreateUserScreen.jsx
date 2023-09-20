import { useState, useEffect } from "react"
import {Button, Form} from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import {useSelector} from 'react-redux'
// import {toast} from 'react-toastify'
// import Loader from "../components/Loader"
import { useRegisterMutation } from "../store/slices/usersApiSlice"
import AccountFind from "../components/AccountFind"
// import { useGetAccountQuery } from "../store/slices/accountApiSlice"
import RegisterUser from "../components/RegisterUser"


// maybe i should create a custom hook to get the accountQuery details from the db/server??
// i should also consider configuring tags properly.


export default function RegisterScreen() {

    // const [role,setRole] = useState(100)
    const [accountQuery,setAccountQuery] = useState('')
    
    const [accountNumInput,setAccountNumInput] = useState('')
    // const [register, results] = useRegisterMutation()

    // const dispatch = useDispatch()

    // const {userInfo} = useSelector(state=>state.auth)



    const handleAccountFormSubmit = async(event)=>{
                event.preventDefault();
                if (!accountNumInput||accountNumInput.length===0) return;
                setAccountQuery({number:accountNumInput})

    }


// delay firing up the search api call for the accountQuery
    useEffect(() => {
        if(accountNumInput!==''){
            const timeOutId = setTimeout(() => setAccountQuery({number:accountNumInput}), 1000);
            return () => clearTimeout(timeOutId);
            
            // const timeOutId = setTimeout(() => setAccountNumInput(accountNumInput), 1000);
            // return () => clearTimeout(timeOutId);
        }
    }, [accountNumInput]);


  return (
<>
    <h1>New User</h1>
    <FormContainer>  
        <Form onSubmit={handleAccountFormSubmit}>
        {/* <Form> */}
            <Form.Group className="my-2" controlId='account'>
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                    type='text'
                    placeholder="Enter the account number"
                    value={accountNumInput}
                    onChange={e=>setAccountNumInput(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>
                Find Account
            </Button>
        </Form>
        {accountQuery&&accountNumInput!==''&&<AccountFind accountQuery={accountQuery} />}
    </FormContainer>

    <br />
    <br />

</>
  )
}

 