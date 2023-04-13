import React from 'react'
// import { Link } from 'react-router-dom'
import {Navbar,Container, Nav} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { logoutUser } from '../Actions/userActions'
// import { logoutUser } from '../Actions/userActions'

const Header = () => {
  const {isAuth, userInfo} = useSelector((state)=>state.authUser)
  const dispatch = useDispatch()
  const logOut =()=>{
    dispatch(logoutUser())
  }
  return (
    <header>    
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">RENDEZ-VOUS APP</Navbar.Brand>
          <Nav className="header-navbar me-auto">
          <LinkContainer to="/">
          <Nav.Link ><i className='fas fa-diagram-project'></i> Disponibilités</Nav.Link>
          </LinkContainer>
          {isAuth && userInfo.role==='User' && <>
          <LinkContainer to="/ListUserReservations">
          <Nav.Link ><i class="fas fa-file-invoice"></i> Mes Réservations</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/EditProfile">
          <Nav.Link ><i className='fas fa-user'></i> Profil</Nav.Link>
          </LinkContainer>
          </>}
          </Nav>
          <Nav className="header-navbar">
          {isAuth ? (
            <>
            <span className='text-light' style={{cursor : 'pointer'}}>{userInfo.firstName}</span>&nbsp;&nbsp;&nbsp;
            <span className='text-light' style={{cursor : 'pointer'}} onClick={logOut}>Se Déconnecter</span>
            </>
          ) :
          <>
          <LinkContainer to='/Register'>
            <Nav.Link><i className='fas fa-id-card'></i> S'inscrire</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/Login'>
            <Nav.Link><i className='fas fa-user'></i> Se connecter</Nav.Link>
          </LinkContainer>
          </>
          }
          </Nav>
        </Container>
      </Navbar>
  </header>
  )
}

export default Header 
