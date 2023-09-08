import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "./NavB.css"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

const NavB = () => {
    const {isAuth} = useSelector(state => state.user)
    const dispatch = useDispatch()
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{width: "100%"}}>
    <Container>
    <Link to="/" className="brand"><Navbar.Brand >Todo app</Navbar.Brand></Link>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="link">Home</Link>
            {
                !isAuth ? <>
                          <Link to="/login" className="link">Login</Link>
                          <Link to="/register" className="link">Register</Link>
                </>
                : 
                <Link to="/login" className="link" onClick={ () => dispatch(logout())} >Logout</Link>

            }

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavB