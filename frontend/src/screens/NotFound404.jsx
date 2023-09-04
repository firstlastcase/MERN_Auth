import { Container, Image, Card, Button} from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';

export default function NotFound404(){
  return (
    <>    
    <div className=' py-0'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-0 d-flex flex-column align-items-center hero-card bg-light w-75'>
            <Image src="/not-found-error-alert.svg" fluid style={{maxWidth:"100%"}}/>
            <div>
            <LinkContainer to='/'>
                <Button className='my-4' variant='primary'>
                Home
                </Button>
            </LinkContainer>
            </div>
        </Card>
      </Container>
    </div>
    </>
  )
}