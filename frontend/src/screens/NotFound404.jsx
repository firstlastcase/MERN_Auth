import { Container, Image, Card, Button} from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';

export default function NotFound404(){
  return (
    <>    
    <div className=' py-2'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
            <Image src="/spiltcoffeeart.jpg" fluid style={{maxWidth:"100%"}}/>
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