import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {Button, Form} from 'react-bootstrap'
import { useSelector} from 'react-redux'
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import {toast} from 'react-toastify'
import IdleTimeout from "../components/IdleTimeout"
import useIdleLogout from "../hooks/useIdleLogout"
import { useGetCampaignsQuery } from "../store/slices/campaignApiSlice"

export default function CampaignsListScreen(){

    // const [phoneNumId,setPhoneNumId]= useState('')
    // const [contactNumber,setContactNumber] = useState('')

    const navigate = useNavigate();


    const {userInfo} = useSelector(state=>state.auth)
    const {accountInfo} = useSelector(state=>state.account)
    const {campaign} = useSelector(state=>state.campaign)

    const {data, error, isLoading} = useGetCampaignsQuery(accountInfo._id)

    // console.log(data ||error)

    let content;
    if(isLoading){
        content = <Loader/>
    } else if(error){
        content = <div>Error: {error?.data?.message}</div>
    } else {
        content = (
            <div>
                {data.map(campaign => (
                    <div key={campaign._id}>
                        <h3>{campaign.name}</h3>
                        <p>{campaign.purpose}</p>
                    </div>
                ))}
            </div>
        )
    }

    useEffect(()=>{
        if(userInfo){
            navigate('/campaignslist')
        }
    },[navigate,userInfo])

    // const runCampaign = async (event)=>{
    //     event.preventDefault();
    //     try{
    //        toast.info('running the campaign! placeholder for the code!!')
    //         // navigate('/')
    //     }catch(err){
    //         toast.error(err?.data?.message || err.error)
    //     }
    // }

//######################

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
    
        <h1>Campains</h1>
        <FormContainer>
            {content}
        </FormContainer>

      
      
    </>
  )
}