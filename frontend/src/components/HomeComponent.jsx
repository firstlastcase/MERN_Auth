import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomeComponent = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Auto Dialer</h1>
          <p className='text-center mb-4'>
            This is an application that allows you to run an automated outbound calling 
            campaigns using Zendesk Talk 🔥
            Click Get Started to create your first campaign and start auto-dialling!!
          </p>
          <div className='d-flex'>
            <LinkContainer to='/login'>
                <Button variant='success' className='me-3'>
                  Get Started
                </Button>
            </LinkContainer>
            <LinkContainer to='/login'>
                <Button variant='primary' className='me-3'>
                  More Details
                </Button>
            </LinkContainer>
        {/* Temporarily removing the register option */}
            <LinkContainer to='/register'>
                <Button variant='secondary'>
                Register
                </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default HomeComponent;