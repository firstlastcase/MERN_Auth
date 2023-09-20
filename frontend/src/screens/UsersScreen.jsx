import {Button, Form} from 'react-bootstrap'
// import { useSelector} from 'react-redux'
import Container from 'react-bootstrap/Container';
import Loader from "../components/Loader"
import {toast} from 'react-toastify'
import IdleTimeout from "../components/IdleTimeout"
import useIdleLogout from "../hooks/useIdleLogout"
import {useFetchUsersQuery, useDeleteUserMutation} from "../store/slices/usersApiSlice"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function UsersScreen(){





    // const navigate = useNavigate();

    // const [users,setUsers] = useState([])

    // const {userInfo} = useSelector(state=>state.auth)
    // const {accountInfo} = useSelector(state=>state.account)


    // const {campaign} = useSelector(state=>state.campaign)
    const {data, error, isLoading} = useFetchUsersQuery()
    const [deleteUser, results]=useDeleteUserMutation()

    const handleX=async (userId)=>{
        // try{
            const res= await deleteUser(userId)
            !res.error?toast.success("User deleted successfully"):toast.error(res.error?.data?.message)
            console.log(res)
        // }catch(err){
        
        // }
    
    };
    const handleEdit=()=>{toast.info('Edit was clicked')};


    let content;
    if(isLoading){
        content = <Loader/>
    } else if(error){
        content = <div>Error: {error?.data?.message}</div>
        toast.error(error?.data?.message)
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
                            <Button variant="danger" className='mx-2' onClick={()=>handleX(user._id)}>X</Button>
                            <Button variant="dark" onClick={()=>handleEdit(user._id)}>✏️</Button>
                    </Col>
                    
                        
                </Row>

                ))}
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
                    {content}
            </Container>
        </div>

    </>
  )
}







