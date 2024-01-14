import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <div>
      
      <Navbar className="bg-black">
        <Container>
          <Navbar.Brand className="fw-bolder" >
            <Link to={'/'} style={{textDecoration:'none',color:"white"}}>
            
            <i className='fa-solid fa-layer-group me-2' style={{color:"white"}}></i>
            EMS APPLICATION
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header