import { Container, Card, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from'react-redux';
import useIdleLogout from '../hooks/useIdleLogout';
import IdleTimeout from '../components/IdleTimeout';
import { useGetAccountQuery } from '../store/slices/accountApiSlice';
import { setAccount } from '../store/slices/accountSlice';



const HomeLoggedInScreen = () => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const {handleTimeout} = useIdleLogout()
    const {accountInfo} = useSelector(state=>state.account)
    const {data, error, isLoading} = useGetAccountQuery(userInfo.account)

  useEffect(() => {
     if (data){
            dispatch(setAccount({...data}))
            console.log('account info updated')
            }
},[data])

  return (

    <>
    <IdleTimeout timeout={1800000} onTimeout={handleTimeout} />
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Welcome {userInfo.name}</h1>
          <p className='text-center mb-4'>
            This is an application that allows you to run an automated outbound calling 
            campaigns using Zendesk Talk 🔥
            Click Get Started to create your first campaign and start auto-dialling!!
          </p>
          <div className='d-flex'>
            <LinkContainer to='/campaign'>
                <Button variant='success' className='me-3'>
                  Get Started
                </Button>
            </LinkContainer>
            <LinkContainer to='/login'>
                <Button variant='primary' className='me-3'>
                  More Details
                </Button>
            </LinkContainer>

          </div>
        </Card>
      </Container>
    </div>

    </>
  )
}

export default HomeLoggedInScreen