import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/Header.css';

const NavbarInstance = () => (
  <Navbar className="header" >
    <Navbar.Header>
        <Navbar.Brand className="header-brand">
         Smash Up!
        </Navbar.Brand>     
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Randomizer</NavItem>
        </LinkContainer>
        <LinkContainer to="/sets">
          <NavItem>Sets</NavItem>
        </LinkContainer>
        <LinkContainer to="/history">
          <NavItem>Randomizer History</NavItem>
        </LinkContainer>
        <LinkContainer to="/draftmode">
          <NavItem>Draft Mode</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavbarInstance;