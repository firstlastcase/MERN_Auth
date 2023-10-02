import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaRocket, FaSignOutAlt,FaPhoneSquareAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector} from 'react-redux';
import useLogout from '../hooks/useLogout';
// import { useEffect } from 'react';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {logoutHandler} = useLogout();


  let saContent = null;
  if (userInfo && userInfo.role && userInfo.role.toString() === import.meta.env.VITE_SA_ROLE) {
   
  // if (userInfo ) {
    
    saContent = (

      <Nav>

      <NavDropdown className="ml-auto" title='Admin' id='admin'>
          <LinkContainer to="/usersadmin">
          <NavDropdown.Item>Users</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/accountsadmin">
          <NavDropdown.Item>Accounts</NavDropdown.Item>
        </LinkContainer>


      </NavDropdown>
      </Nav>
              
    );
  }


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


          {/* <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
  
          </Navbar.Collapse> */}

          {/* ################# */}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {userInfo && (
                  <NavDropdown title='🚀 Campaings' id='campaigns' className="d-flex">
                    <LinkContainer to='/campaignslist'>
                      <NavDropdown.Item>Campaigns List</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/campaign'>
                      <NavDropdown.Item>Campaign</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/contactlists'>
                      <NavDropdown.Item>Contact Lists</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>              
              )}
            </Nav>
            {saContent}
            <Nav>
              {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/account'>
                      <NavDropdown.Item>Account Info</NavDropdown.Item>
                    </LinkContainer>
                    {/* <LinkContainer to='/campaignslist'>
                      <NavDropdown.Item>Campaigns List</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/campaign'>
                      <NavDropdown.Item>Campaign</NavDropdown.Item>
                    </LinkContainer> */}
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  {/* temporarly removing the Register option */}
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
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