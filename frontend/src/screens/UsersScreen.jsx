import {Button} from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Loader from "../components/Loader"
import {toast} from 'react-toastify'
import IdleTimeout from "../components/IdleTimeout"
import useIdleLogout from "../hooks/useIdleLogout"
import {useFetchUsersQuery, useDeleteUserMutation} from "../store/slices/usersApiSlice"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AppModal from '../components/AppModal';
import UserEdit from '../components/UserEdit';
import UserAdd from '../components/UserAdd';
import useGetAccountFromId from '../hooks/useGetAccountFromId';

export default function UsersScreen(){




    const {data, error, isLoading} = useFetchUsersQuery()
    const [deleteUser, results]=useDeleteUserMutation()


    

    const handleX=async (userId)=>{
            const res= await deleteUser(userId)
            !res.error?toast.success("User deleted successfully"):toast.error(res.error?.data?.message)
            // console.log(res)

    };

    let content;
    if(isLoading){
        content = <Loader/>
    } else if(error){
        content = <div>Error: {error?.data?.message}</div>
        toast.error(error?.data?.message)
    } else {
        content = (
            <div>
                {data.map(user => {

                    return(


                <Row  className="my-2 d-flex justify-content-between align-items-start"
                        // horizontal='lg'
                        key={user._id}>
                    <Col sm={2}>{user.name}</Col>
                    <Col sm={2}>{user.email}</Col>
                    <Col sm={2}>{user.role||null}</Col>
                    <Col sm={3}>{user.account||null}</Col>
                    {/* <Col sm={3}>{accountId||null}</Col> */}
                   
                    <Col sm={2}>
                            <Button variant="danger" className='mx-2' onClick={()=>handleX(user._id)}>X</Button>
                            <AppModal 
                                buttonText='✏️'
                                title={`Editing User: ${user.name}`} 
                                modalContent={<UserEdit user={user}/>}
                                />

                    </Col>

                    
                        
                </Row>

                )})}
            </div>
        )
        }
    
    const {handleTimeout} = useIdleLogout()



  return (

    <>
        <IdleTimeout timeout={1800000} onTimeout={handleTimeout} />
        <h2>Users</h2>
        <br />
        <div className=' py-5'>
            <Container>
                <Row  className="my-2 d-flex justify-content-between align-items-start">
                    <Col sm={2}><strong>User Name</strong></Col>
                    <Col sm={2}><strong>Email</strong></Col>
                    <Col sm={2}><strong>Role</strong></Col>
                    <Col sm={3}><strong>Account #</strong></Col>
                    <Col sm={2}><strong> Action </strong></Col>
               </Row>
               <hr />
                {content}
            </Container>
            <br />
            <AppModal
                buttonText='Add New User'
                buttonAttributes={{variant:"secondary"}}
                title={'Add New User'} 
                modalContent={<UserAdd/>}
                />


        </div>

    </>
  )
}







