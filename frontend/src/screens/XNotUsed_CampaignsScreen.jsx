import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {Button, Form} from 'react-bootstrap'
import { useSelector} from 'react-redux'
import Loader from "../components/Loader"
import {toast} from 'react-toastify'
import IdleTimeout from "../components/IdleTimeout"
import useIdleLogout from "../hooks/useIdleLogout"
import { useFetchCampaignsQuery } from "../store/slices/campaignApiSlice"
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
// import Tab from 'react-bootstrap/Tab';
import AppModal from '../components/Common_Components/AppModal'
import CampaignAdd from "../components/CampaignAdd"

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SkeletonLoader from "../components/SkeletonLoader"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5 }}>
          <Typography>{children}</Typography>
        </Box>
       )} 
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function CampaignsScreen(){

    // const [phoneNumId,setPhoneNumId]= useState('')
    // const [contactNumber,setContactNumber] = useState('')

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };


    const navigate = useNavigate();


    const {userInfo} = useSelector(state=>state.auth)
    const {accountInfo} = useSelector(state=>state.account)
    // const {campaign} = useSelector(state=>state.campaign)

    const {data:campaigns, error, isLoading} = useFetchCampaignsQuery(accountInfo._id)
    
    // let campaignsArray = [...campaigns]

    // console.log(data ||error)

    let content1=[], content2=[];
    if(isLoading){
        content1=<Loader/>
        content2 = <SkeletonLoader/>
    } else if(error){
        content1 = content2 = <div>Error: {error?.data?.message}</div>
    } else {
        for(let c of campaigns){
            content1.push(<Tab key={campaigns.indexOf(c)} label={c.name} {...a11yProps(campaigns.indexOf(c))} />)
    }

        for(let c of campaigns){
            content2.push(<TabPanel key={campaigns.indexOf(c)} value={value} index={campaigns.indexOf(c)}>
                    <h3>{c.name}</h3>
                    {/* <strong>Purpose: </strong> <p>{c.purpose}</p> */}
                    <strong>Purpose: </strong> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</p>
                    <strong>Status: </strong> <p>{c.status}</p>

                </TabPanel>)
        }
        console.log(content2)

    }
    

    useEffect(()=>{
        if(userInfo){
            navigate('/campaignslist')
        }
    },[navigate,userInfo])


//######################


//######################
    const {handleTimeout} = useIdleLogout()

  return (

    <>
        <IdleTimeout timeout={1800000} onTimeout={handleTimeout} />
        <div className=' py-3 d-flex justify-content-between'>
            <h2>Campains</h2>
            <AppModal
                buttonText='Add New Campaign'
                buttonAttributes={{variant:"secondary"}}
                title={'Add New Campaign'} 
                modalContent={<CampaignAdd accountNumber={accountInfo.number}/>}
            />
        </div>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
    <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >

      {content1}

      </Tabs>
      {content2}
      
    </Box>








        {/* <Tab.Container defaultActiveKey="first">      
                {content}
        </Tab.Container> */}
        {/* <br /> */}
    </>
  )
}