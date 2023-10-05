import {Button} from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Loader from "../components/Common_Components/Loader"
import {toast} from 'react-toastify'
import IdleTimeout from "../components/Common_Components/IdleTimeout"
import useIdleLogout from "../hooks/useIdleLogout"
import {useFetchUsersQuery, useDeleteUserMutation} from "../store/slices/usersApiSlice"
import { useFetchAccountsQuery } from '../store/slices/accountApiSlice';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AppModal from '../components/Common_Components/AppModal';
import UserEdit from '../components/UserEdit';
import UserAdd from '../components/UserAdd';
// import UserAdd2 from '../components/UserAdd2';
import { useSelector } from 'react-redux'
import SkeletonLoader from '../components/Common_Components/SkeletonLoader';


export default function UsersScreen(){




    const {data:users, error, isLoading} = useFetchUsersQuery()
    const {data:accounts, error:errorAccounts, isLoading:isLoadingAccounts} = useFetchAccountsQuery()
    const [deleteUser, results]=useDeleteUserMutation()
    const {userInfo:loggedInUser} = useSelector(state=>state.auth)


    

    const handleX=async (userId)=>{


            if(userId===loggedInUser._id){
                toast.error('You cannot delete your own user!') 
                return}
            const res= await deleteUser(userId)
            !res.error?toast.success("User deleted successfully"):toast.error(res.error?.data?.message)
            // console.log(res)

    };

    let content;
    let accountNumber;

    if(isLoading|isLoadingAccounts) {
        // content = <Loader/>
        content = <SkeletonLoader lines={4}/>
    } else if(error){
        content = <div>Error: {error?.data?.message}</div>
        toast.error(error?.data?.message)
    } else {
        content = (
            <div>
                {users.map(user => {
                    if(errorAccounts||!accounts) {return}
                    
                    const account= accounts.filter(account=>account._id===user.account)
                    
                    if(account.length===1) {accountNumber=account[0].number}
                    else {accountNumber="unknown"}

                    return(


                <Row  className="my-2 d-flex justify-content-between align-items-start"
                        // horizontal='lg'
                        key={user._id}>
                    <Col sm={2}>{user.name}</Col>
                    <Col sm={2}>{user.email}</Col>
                    <Col sm={2}>{user.role||null}</Col>
                    <Col sm={3}>{accountNumber}</Col>

                   
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
            <div className=' py-3 d-flex justify-content-between'>
                <h2>Users</h2>
                <AppModal
                    buttonText='Add New User'
                    buttonAttributes={{variant:"secondary"}}
                    title={'Add New User'} 
                    modalContent={<UserAdd/>}
                    // modalContent={<UserAdd2/>}
                    />

            </div>
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

        </div>

    </>
  )
}







