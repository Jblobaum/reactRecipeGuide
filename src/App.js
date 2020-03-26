import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar } from "react-bootstrap";


// import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Routes from './Routes'

import './App.css';


const App = () => (
  <MemoryRouter>

    <Navbar className="justify-content-between" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>Recipe Guide</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
        <LinkContainer to="/signup">
        <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
            <Nav.Link>Log In</Nav.Link>
            </LinkContainer>
        </Nav>

        <Button pullRight variant="outline-info">Log Out</Button>
      </Navbar.Collapse>
    </Navbar>

    <Routes />
  </MemoryRouter>
);



export default App;

