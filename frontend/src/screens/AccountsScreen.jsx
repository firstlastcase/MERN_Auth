import {Button} from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Loader from "../components/Loader"
import {toast} from 'react-toastify'
import IdleTimeout from "../components/IdleTimeout"
import useIdleLogout from "../hooks/useIdleLogout"
import {useFetchAccountsQuery, useDeleteAccountMutation} from "../store/slices/accountApiSlice"
import { useFetchUsersQuery } from '../store/slices/usersApiSlice';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AppModal from '../components/AppModal';
import AccountEdit from '../components/AccountEdit';
import AccountAdd from '../components/AccountAdd';

export default function AccountsScreen(){




    const {data:accounts, error, isLoading} = useFetchAccountsQuery()
    const {data:users,error:usersError,isLoading:usersLoading} = useFetchUsersQuery()
    const [deleteAccount, results]=useDeleteAccountMutation()

    const handleX=async (accountId)=>{
            // the following line is just to prevent delete at this stage till i 
            // implement a way to check if there are users associated with the account

            const associatedUsers = users.filter(user=>(user.account===accountId))
            if(associatedUsers.length>0) {toast.error('account has users associated with it', accountId); return null}

            const res= await deleteAccount(accountId)
            !res.error?toast.success("Account deleted successfully"):toast.error(res.error?.data?.message)

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
                {accounts.map(account => {
                    return(
                <Row  className="my-2 d-flex justify-content-between align-items-start"
                        key={account._id}>
                    <Col sm={4}>{account._id}</Col>
                    <Col sm={2}>{account.name}</Col>
                    <Col sm={2}>{account.number}</Col>
                    <Col sm={2}>{account.status}</Col>
                   
                    <Col sm={2}>
                            <Button variant="danger" className='mx-2' onClick={()=>handleX(account._id)}>X</Button>
                            <AppModal 
                                buttonText='✏️'
                                title={`Editing Account: ${account.name}`} 
                                modalContent={<AccountEdit account={account}/>}
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
        <h2>Accounts</h2>
        <br />
        <div className=' py-5'>
            <Container>
                <Row  className="my-2 d-flex justify-content-between align-items-start">
                    <Col sm={4}><strong>ID</strong></Col>
                    <Col sm={2}><strong>Account Name</strong></Col>
                    <Col sm={2}><strong>Number</strong></Col>
                    <Col sm={2}><strong>Status</strong></Col>
                    <Col sm={2}><strong>Actions</strong></Col>
               </Row>
               <hr />
                {content}
            </Container>
            <br />
            <AppModal
                buttonText='Add New Account'
                buttonAttributes={{variant:"secondary"}}
                title={'Add New Account'} 
                modalContent={<AccountAdd/>}
                />


        </div>

    </>
  )
}







