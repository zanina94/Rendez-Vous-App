import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reserveDisponibility } from '../Actions/disponibilityActions'

const ReserveDisponibilityPage = ({show,handleClose,disponibility}) => {
    const {isAuth, userInfo} = useSelector((state)=>state.authUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
const handleClick =  e =>{
    dispatch(reserveDisponibility(disponibility.id,{...disponibility,isRequested : true, isReserved : false, userId:userInfo.id},navigate))
}
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Reserver Disponibilité </Modal.Title>
    </Modal.Header>
    <Modal.Body>Vous etes surs, vous voulez reserver  <b>la disponibilité {disponibility.id}</b> ??</Modal.Body>
    <Modal.Footer>
    <Button variant="primary" onClick={(e)=>{handleClose();handleClick(e);window.location.reload()}}>
        RESERVER
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        FERMER
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ReserveDisponibilityPage