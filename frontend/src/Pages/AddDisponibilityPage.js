import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { addDisponibility } from '../Actions/disponibilityActions';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { DatePicker, DateTimeField, MobileDateTimePicker } from '@mui/x-date-pickers'

const AddDisponibilityPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,errors} = useSelector(state=>state.manageDisponibilities)
    const [disponibilityInput, setDisponibilityInput] = useState({})
    const [date, setDate] = useState()
    const [hourBegin, setHourBegin] = useState()
    const [hourEnd, setHourEnd] = useState()
    const handleChange = (e) => { 
        setDisponibilityInput({...disponibilityInput, [e.target.name] : e.target.value})
     }
  

const handleSubmit = (e) => { 
    e.preventDefault()
    dispatch(addDisponibility({...disponibilityInput, date: date, hourBegin:hourBegin, hourEnd: hourEnd},navigate))
}

  return (
    <Container style={{width:'50%'}} className='mt-5'>
    <Form>
        <Row>
    <Col md={12}>
    <Form.Group className="mb-3" controlId="formBasicDate">
    <DemoItem label="Date">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker value={date} onChange={(newValue) => setDate(newValue)} />
    </LocalizationProvider>
    </DemoItem>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicHourBegin">
    <DemoItem label="Heure de début">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MobileTimePicker value={hourBegin} onChange={(newValue) => setHourBegin(newValue)} defaultValue={dayjs('2022-04-17T08:00')} />
    </LocalizationProvider>
    </DemoItem>
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicHourEnd">
    <DemoItem label="Heure de fin">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MobileTimePicker value={hourEnd} onChange={(newValue) => setHourEnd(newValue)} defaultValue={dayjs('2022-04-17T08:00')} />
    </LocalizationProvider>
    </DemoItem>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control type="text"  name="Description" onChange={handleChange} placeholder="Entrer la description" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email"  name="email" onChange={handleChange} placeholder="Entrer l'adresse émail" />
    </Form.Group>
    </Col>
    </Row>
    {errors && <Message variant='danger'>{errors}</Message>}
    <Button style={{width:'150px'}} className='mt-3' variant="primary" type="submit" onClick={handleSubmit}>
     {loading ? <Loader/> : 'AJOUTER'}
    </Button>
  </Form>
  </Container>
    
  )
}


export default AddDisponibilityPage