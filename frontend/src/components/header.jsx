import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
// import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt,FaPhoneSquareAlt } from 'react-icons/fa';
// import { IconContext } from 'react-icons/lib';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../store/slices/usersApiSlice';
import { logout } from '../store/slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
        // console.log('logged out')
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>

          <LinkContainer to={userInfo?'/home':'/'}>
            <Navbar.Brand>
              {/* <IconContext.Provider value={{ color: "00bbff"}}> */}
                <FaPhoneSquareAlt style={{color: "00bbff", marginRight:"8px"}} size="30px"
                /> Auto Dialler
              {/* </IconContext.Provider> */}
            </Navbar.Brand>
          </LinkContainer>

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
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
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