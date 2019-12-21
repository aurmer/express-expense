import React from 'react'

import { Nav, Navbar } from 'react-bootstrap'

const AppNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="light" variant="light" fixed="top">
      <Navbar.Brand href="#home"><img alt="logo" height="30" className="d-inline-block align-top" src="/images/logo.png"></img></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link href="#new-expense">New Expense</Nav.Link>
          <Nav.Link href="#pricing">Dashboard</Nav.Link>
          <Nav.Link href="#settings">Settings</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavbar


