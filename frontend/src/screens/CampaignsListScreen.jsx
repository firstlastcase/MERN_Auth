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
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import {LinkContainer} from "react-router-bootstrap"

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
            // <div>
            //     {data.map(campaign => (
            //         <div key={campaign._id}>
            //             <h3>{campaign.name}</h3>
            //             <p>{campaign.purpose}</p>
            //         </div>
            //     ))}
            // </div>
            // ###############
        <div>
        {data.map(campaign => (

             <Row key={campaign._id}>
                <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item >
                            <Nav.Link eventKey={campaign._id}>{campaign.name}</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={5}>
                    <Tab.Content>
                                            {/* <LinkContainer to='/campaign'> */}
                        <Tab.Pane eventKey={campaign._id}><strong>Purpose:</strong> {campaign.purpose}</Tab.Pane>
                                                {/* </LinkContainer> */}
                    </Tab.Content>
                </Col>
            </Row>
            
              ))}
        </div>
        )
        }
    

    useEffect(()=>{
        if(userInfo){
            navigate('/campaignslist')
        }
    },[navigate,userInfo])


//######################
    const {handleTimeout} = useIdleLogout()

  return (

    <>
    <IdleTimeout timeout={1800000} onTimeout={handleTimeout} />
    
        <h2>Campains</h2>
        {/* <FormContainer>
            {content}
        </FormContainer> */}

    <Tab.Container defaultActiveKey="first">      
        {/* <Row> */}
            {content}
        {/* </Row> */}
    </Tab.Container>

      
      
    </>
  )
}