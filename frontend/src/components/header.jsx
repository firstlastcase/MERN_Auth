import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt,FaPhoneSquareAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector} from 'react-redux';
import useLogout from '../hooks/useLogout';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {logoutHandler} = useLogout();

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>

          <LinkContainer to={userInfo?'/home':'/'}>
            <Navbar.Brand>
                <FaPhoneSquareAlt style={{color: "00bbff", marginRight:"8px"}} size="30px"
                /> Auto Dialler
            </Navbar.Brand>
          </LinkContainer>

{/* replaced code */}
{/* 
          {userInfo? (
          <LinkContainer to='/home'>
            <Navbar.Brand>Auto Dialler</Navbar.Brand>
          </LinkContainer>
          ):(
          <LinkContainer to='/'>
            <Navbar.Brand>Auto Dialler</Navbar.Brand>
          </LinkContainer>
          )} */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/account'>
                      <NavDropdown.Item>Account Info</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/campaignslist'>
                      <NavDropdown.Item>Campaigns List</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/campaign'>
                      <NavDropdown.Item>Campaign</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  {/* temporarly removing the Register option */}
                  {/* <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer> */}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;