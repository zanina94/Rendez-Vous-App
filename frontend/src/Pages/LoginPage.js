import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../Actions/userActions'
// import { loginUser } from '../Actions/userActions'


const LoginPage = () => {
  const [loginInput, setLoginInput] = useState({})
  const {loading , errors} = useSelector((state) => state.authUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => { 
      setLoginInput({...loginInput, [e.target.name] : e.target.value})
   }

   const handleSubmit = (e) => { 
      e.preventDefault()
      dispatch(loginUser(loginInput,navigate))
  }
  

return (
  <Container style={{ width:'30%'}} className='mt-3'>
                   <Row className='mb-2 mx-1'>
    <Col>
      <h3 className='float-center mx-3 px-0 my-4'>Se Connecter</h3>
    </Col>
    </Row>
<Form>

<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Email</Form.Label>
<Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter email" />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Mot de passe</Form.Label>
<Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" />
</Form.Group>

{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
<Form.Check type="checkbox" label="Check me out" />
</Form.Group> */}
{errors && <Message variant='danger'>{errors}</Message>}
<Button className='mt-1' variant="primary" type="submit" onClick={handleSubmit}>
{loading ? <Loader/> : 'Se connecter'}
</Button>
</Form>
</Container>
)
}

export default LoginPage