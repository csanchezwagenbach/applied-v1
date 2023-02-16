import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import cologo from '../assets/applied-logo.png';


import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar className="appliednavcolor" expand='lg'>
        <Container fluid>
          <Navbar.Brand className="appliednavtext" as={Link} to='/'>
            
            <img className="complogo" alt="Applied logo"
              src={cologo}
            />


          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>

            

              {/* if user is logged in show dashboard, search, create app and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link reloadDocument className="appliednavtext" as={Link} to='/userdash'>
                    Dashboard
                  </Nav.Link>

                  <Nav.Link className="appliednavtext" as={Link} to='/create'>
                Create App
              </Nav.Link>

              <Nav.Link className="appliednavtext" as={Link} to='/search'>
                Search
              </Nav.Link>

                  <Nav.Link className="appliednavtext" onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link className="appliednavtext" onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
        className="primaryModal"
        closeVariant="white">
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
