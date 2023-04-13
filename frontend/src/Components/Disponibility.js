import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { confirmReservationDisponibility } from '../Actions/disponibilityActions'
import ConfirmDisponibilityPage from '../Pages/ConfirmDisponibilityPage'
import DeclineDisponibilityPage from '../Pages/DeclineDisponibilityPage'
import DeleteDisponibilityPage from '../Pages/DeleteDisponibilityPage'
import EditDisponibilityPage from '../Pages/EditDisponibilityPage'
import ReserveDisponibilityPage from '../Pages/ReserveDisponibilityPage'

const Disponibility = ({disponibility,forUser}) => {
    const {isAuth, userInfo} = useSelector((state)=>state.authUser)
    const [showEdit, setShowEdit] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

const handleCloseEdit = () => setShowEdit(false);
const handleShowEdit = () => setShowEdit(true);


const [showDelete, setShowDelete] = useState(false);

const handleCloseDelete = () => setShowDelete(false);
const handleShowDelete = () => setShowDelete(true);

const [showReserve, setShowReserve] = useState(false);

const handleCloseReserve = () => setShowReserve(false);
const handleShowReserve = () => setShowReserve(true);

const [showDecline, setShowDecline] = useState(false);

const handleCloseDecline = () => setShowDecline(false);
const handleShowDecline = () => setShowDecline(true);

const [showConfirm, setShowConfirm] = useState(false);

const handleCloseConfirm = () => setShowConfirm(false);
const handleShowConfirm = () => setShowConfirm(true);

// const handleConfirm = (e) => {
//     e.preventDefault()
//     dispatch(confirmReservationDisponibility(disponibility.id,{...disponibility, isReserved : true, isRequested : false }, navigate))
// }

// const handleReserve = (e) => {
//     e.preventDefault()
//     dispatch(confirmReservationDisponibility(disponibility.id,{ isRequested : true }, navigate))
// }

  return (
    <tr>
    <td>{disponibility.id}</td>
    <td>{new Date(disponibility.date).toLocaleString('fr-FR').split(' ')[0]}</td>
    <td>{new Date(disponibility.hourBegin).toLocaleString('fr-FR').split(' ')[1]}</td>
    <td>{new Date(disponibility.hourEnd).toLocaleString('fr-FR').split(' ')[1]}</td>
    <td>{disponibility.description}</td>
    <td>{disponibility.email}</td> 
    <td>{disponibility.isRequested === true ? <span className="badge bg-warning fs-4">Demandée</span> : 
                          disponibility.isReserved === true? <span className="badge bg-success fs-4">Reservée</span> :
                          <span className="badge bg-info fs-4">Libre</span>}</td>
   {forUser === false && <td>{disponibility.user !== null ? disponibility.user.firstName+' '+ disponibility.user.lastName : ''}</td> }                      
    <td> {(isAuth && userInfo.role ==='Admin') && <i style={{cursor : 'pointer'}} onClick={handleShowEdit} className='fs-3 fas fa-edit'></i>}  
   &nbsp;{(isAuth && userInfo.role ==='Admin') &&<i style={{cursor : 'pointer'}} onClick={handleShowDelete} className='fs-3 fas fa-trash'></i>}
   &nbsp;{disponibility.isRequested === true && (isAuth && userInfo.role ==='Admin') && <Button onClick={handleShowConfirm} className='btn btn-success'>Confirmer</Button>}
   &nbsp;{disponibility.isRequested === false && disponibility.isReserved === false && (isAuth && userInfo.role ==='User') && <Button onClick={handleShowReserve} className='btn btn-info'>Réserver</Button>}
   &nbsp;{disponibility.isRequested === true && disponibility.isReserved === false && (isAuth && userInfo.role ==='User') && (disponibility.userId === userInfo.id) && <Button onClick={handleShowDecline} className='btn btn-danger'>Décliner</Button>}
   </td>
   <EditDisponibilityPage show={showEdit} handleClose={handleCloseEdit} disponibility={disponibility}/>
   <DeleteDisponibilityPage show={showDelete} handleClose={handleCloseDelete} disponibility={disponibility} />
   <ReserveDisponibilityPage show={showReserve} handleClose={handleCloseReserve} disponibility={disponibility} />
   <ConfirmDisponibilityPage show={showConfirm} handleClose={handleCloseConfirm} disponibility={disponibility} />
   <DeclineDisponibilityPage show={showDecline} handleClose={handleCloseDecline} disponibility={disponibility} /> 
    </tr>
  )
}

export default Disponibility