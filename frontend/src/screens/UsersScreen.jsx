// import Badge from 'react-bootstrap/Badge';
// import ListGroup from 'react-bootstrap/ListGroup';
// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import {Button, Form} from 'react-bootstrap'
import { useSelector} from 'react-redux'
import Container from 'react-bootstrap/Container';
import Loader from "../components/Loader"
// import {toast} from 'react-toastify'
import IdleTimeout from "../components/IdleTimeout"
import useIdleLogout from "../hooks/useIdleLogout"
import {useFetchUsersQuery} from "../store/slices/usersApiSlice"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function UsersScreen(){



    // const navigate = useNavigate();

    // const [users,setUsers] = useState([])

    const {userInfo} = useSelector(state=>state.auth)
    // const {accountInfo} = useSelector(state=>state.account)


    // const {campaign} = useSelector(state=>state.campaign)
    const {data, error, isLoading} = useFetchUsersQuery()



    let content;
    if(isLoading){
        content = <Loader/>
    } else if(error){
        content = <div>Error: {error?.data?.message}</div>
    } else {
        content = (
            <div>
                {data.map(user => (


                <Row  className="my-2 d-flex justify-content-between align-items-start"
                        // horizontal='lg'
                        key={user._id}>
                    <Col sm={3}>{user.name}</Col>
                    <Col sm={2}>{user.email}</Col>
                    <Col sm={2}>{user.role||null}</Col>
                    <Col sm={2}>{user.account||null}</Col>
                   
                    <Col sm={2}>
                            <Button variant="danger" className='mx-2' >X</Button>
                            <Button variant="dark" >✏️</Button>
                    </Col>
                    
                        
                </Row>



                    // <ListGroup.Item
                    //     // as="li"
                    //     className="my-2 d-flex justify-content-between align-items-start"
                    //     horizontal='lg'
                    //     key={user._id}
                    // >
                    //     {/* <div className="ms-2 me-auto"> */}
                    //         <div className="fw-bold">{user.name}</div>
                    //         <div>{user.email}</div>
                    //         <div>{user.role||null}</div>
                    //     {/* </div> */}
                    //     <div> {user.account||null}</div>
                        
                    //     <Button variant="danger" >
                    //     X
                    //     </Button>
                    //     <Button variant="dark" >
                    //     ✏️
                    //     </Button>
                    // </ListGroup.Item>

                    // <div key={user._id}>
                    //     <h3>{user.name}</h3>
                    //     <p>{user.email}</p>
                    //     <p>{user.role||null}</p>
                    // </div>
                ))}
            </div>
        )
        }
    
    // useEffect(()=>{
    //     if(userInfo){
    //         navigate('/campaignslist')
    //     }
    // },[navigate,userInfo])


//######################
    const {handleTimeout} = useIdleLogout()

  return (

    <>
    <IdleTimeout timeout={1800000} onTimeout={handleTimeout} />
    
        <h2>Users</h2>
        {/* <FormContainer>
            {content}
        </FormContainer> */}

<div className=' py-5'>
      {/* <Container className='d-flex justify-content-center'>   */}
      <Container>
        {/* <Row> */}
            {content}
        {/* </Row> */}
      </Container>
      </div>

      
      
    </>
  )
}







