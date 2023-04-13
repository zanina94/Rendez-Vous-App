import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteDisponibility } from '../Actions/disponibilityActions'

const DeleteDisponibilityPage = ({show,handleClose,disponibility}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
const handleClick =  e =>{
    dispatch(deleteDisponibility(disponibility.id,navigate))
}
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Supprimer Disponibilité</Modal.Title>
    </Modal.Header>
    <Modal.Body>Vous etes surs, vous voulez suprimez  <b>la disponibilité {disponibility.id}</b> ??</Modal.Body>
    <Modal.Footer>
    <Button variant="primary" onClick={(e)=>{handleClose();handleClick(e);window.location.reload()}}>
        SUPPRIMER
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        FERMER
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default DeleteDisponibilityPage