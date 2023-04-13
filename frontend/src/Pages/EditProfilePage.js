import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../Actions/userActions'

import Loader from '../Components/Loader'
import Message from '../Components/Message'
const EditProfilePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,errors,isAuth, userInfo} = useSelector(state=>state.authUser)
    const [editUserInput, setEditUserInput] = useState({
        id : userInfo.id,
        firstName : userInfo.firstName,
        lastName : userInfo.lastName,
        email : userInfo.email,
        password : userInfo.password
    })
    
    console.log('uinfo',userInfo);
    const handleChange = (e) => { 
        setEditUserInput({...editUserInput, [e.target.name] : e.target.value})
     }

const handleSubmit = (e) => { 
    e.preventDefault()
    dispatch(editUser(userInfo.id,editUserInput,navigate))
}

  return (
    <Container style={{width:'50%'}} className='mt-3'>
               <Row className='mb-2 mx-1'>
    <Col>
      <h3 className='float-center mx-3 px-0 my-4'>Mon profil</h3>
    </Col>
    </Row>
    <Form>
        <Row>
    <Col md={12}>
    <Form.Group className="mb-3" controlId="formBasicFirstName">
      <Form.Label>Prénom</Form.Label>
      <Form.Control type="text" value={userInfo.firstName} name="firstName" onChange={handleChange} placeholder="Enter first name" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicLastName">
      <Form.Label>Nom</Form.Label>
      <Form.Control type="text" value={userInfo.lastName} name="lastName" onChange={handleChange} placeholder="Enter last name" />
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" value={userInfo.email} name="email" onChange={handleChange} placeholder="Enter email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Mot de passe</Form.Label>
      <Form.Control type="password" value={userInfo.password} name="password" onChange={handleChange} placeholder="Password" />
    </Form.Group>

    </Col>
    </Row>
    {errors && <Message variant='danger'>{errors}</Message>}
    <Button variant="primary" type="submit" onClick={handleSubmit}>
     {loading ? <Loader/> : "Modifier"}
    </Button>
  </Form>
  </Container>
    
  )
}

export default EditProfilePage