import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { declineDisponibility } from '../Actions/disponibilityActions'

const DeclineDisponibilityPage = ({show,handleClose,disponibility}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
const handleClick =  e =>{
    dispatch(declineDisponibility(disponibility.id,{...disponibility,isRequested : false, isReserved : false, userId:null},navigate))
}
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Reserver Disponibilité </Modal.Title>
    </Modal.Header>
    <Modal.Body>Vous etes surs, vous voulez decliner la réservation<b>la disponibilité {disponibility.id}</b> ??</Modal.Body>
    <Modal.Footer>
    <Button variant="primary" onClick={(e)=>{handleClose();handleClick(e);window.location.reload()}}>
        DECLINER
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        FERMER
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default DeclineDisponibilityPage