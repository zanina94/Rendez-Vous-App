import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { confirmReservationDisponibility } from '../Actions/disponibilityActions'

const ConfirmDisponibilityPage = ({show,handleClose,disponibility}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
const handleClick =  e =>{
    dispatch(confirmReservationDisponibility(disponibility.id,{...disponibility,isRequested : false, isReserved : true},navigate))
}
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirmer Reservation de Disponibilité </Modal.Title>
    </Modal.Header>
    <Modal.Body>Vous etes surs, vous voulez confirmer la reservation de <b>la disponibilité {disponibility.id}</b> ??</Modal.Body>
    <Modal.Footer>
    <Button variant="primary" onClick={(e)=>{handleClose();handleClick(e);window.location.reload()}}>
        CONFIRMER
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        FERMER
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ConfirmDisponibilityPage