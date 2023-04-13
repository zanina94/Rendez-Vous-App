import { DatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Form, Modal, Row, ToggleButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editDisponibility } from '../Actions/disponibilityActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const EditDisponibilityPage = ({show,handleClose,disponibility}) => {
    const {loading,errors} = useSelector(state=>state.manageDisponibilities)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [editDisponibilityInput,setEditDisponibilityInput] = useState({
        description : disponibility.description,
        email : disponibility.email
    })
    const [date , setDate] = useState(dayjs(disponibility.date))
    const [hourBegin , setHourBegin] = useState(dayjs(disponibility.hourBegin))
    const [hourEnd , setHourEnd] = useState(dayjs(disponibility.hourEnd)) 
    const [isRequested , setIsRequested] = useState(disponibility.isRequested)
    const [isReserved , setIsReserved] = useState(disponibility.isReserved)
    
    const status = isRequested === true ? 'b' : isReserved === true ? 'c' : 'a'
    const [radioValueStatus, setRadioValueStatus] = useState(status);

    const radiosStatus = [
      { name: 'Libre', value: 'a' },
      { name: 'Demandée', value: 'b' },
      { name: 'Reservée', value: 'c' },
    ];

    const handleChange = (e) => { 
        setEditDisponibilityInput({...editDisponibilityInput, [e.target.name] : e.target.value})
     }

    const handleSubmit = (e) => { 
        dispatch(editDisponibility(disponibility.id,({...editDisponibilityInput,id : disponibility.id, date : date, hourBegin : hourBegin, 
            hourEnd : hourEnd, isRequested : isRequested, isReserved : isReserved}),navigate))                                         
     console.log('rq',isRequested);
     console.log('rv',isReserved);
      }

    const handleChangeStatus = async (e) => {
        await setRadioValueStatus(e.target.value) 
        console.log(e.target.value);
        switch (e.target.value) {
            case 'a':
                 setIsRequested(false)
                 setIsReserved(false)
                break;
            case 'b':
                setIsRequested(true)
                setIsReserved(false)
                break;
            case 'c':
                setIsRequested(false)
                setIsReserved(true)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
    }, [isRequested, isReserved]);

    
  return (
    <Modal scrollable={true} size='lg' show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modifier Disponibilité {disponibility.id}</Modal.Title>
    </Modal.Header>
    <Modal.Body >
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
    <MobileTimePicker value={hourBegin} onChange={(newValue) => setHourBegin(newValue)}  />
    </LocalizationProvider>
    </DemoItem>
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicHourEnd">
    <DemoItem label="Heure de fin">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MobileTimePicker value={hourEnd} onChange={(newValue) => setHourEnd(newValue)}  />
    </LocalizationProvider>
    </DemoItem>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" value={disponibility.description} name="description" onChange={handleChange} placeholder="Entrer la description" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" value={disponibility.email}  name="email" onChange={handleChange} placeholder="Entrer l'adresse émail" />
    </Form.Group>

    {/* <Form.Group className="mb-3" controlId="formBasicStatus">
    <Form.Label>Status</Form.Label>
    <br />
    <ButtonGroup>
        {radiosStatus.map((radio, idx) => (
          <ToggleButton
            style={{width:'140px'}}
            key={idx}
            id={`radioStatus-${idx}`}
            type="radio"
            variant={'outline-primary'}
            name="radioStatus"
            value={radio.value}
            checked={radioValueStatus === radio.value}
            onChange={(e)=>handleChangeStatus(e)}
          >
            {radio.name}
          </ToggleButton>
         
        ))}
      </ButtonGroup>
      </Form.Group> */}

    </Col>
    </Row>
  </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="info" onClick={(e)=>{handleSubmit(e)}}>
     {loading ? <Loader/> : 'VALIDER'}
     </Button>
     <Button variant="danger" onClick={handleClose}>
      FERMER
     </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default EditDisponibilityPage