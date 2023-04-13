import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listDisponibilitiesByUserId } from '../Actions/disponibilityActions';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Disponibility from '../Components/Disponibility';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Col, Row, Table } from 'react-bootstrap';

const ListUserReservationsPage = () => {
const {isAuth, userInfo} = useSelector((state)=>state.authUser)
const {disponibilities,loading,errors} = useSelector(state => state.listDisponibilities)
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(listDisponibilitiesByUserId(userInfo.id))
},[dispatch, userInfo.id])


  return (
 <Fragment>
       <Row className='mb-1 mt-1 mx-1'>
    <Col>
      <h3 className='float-center mx-3 px-0 my-4'>Mes Réservations</h3>
    </Col>
    </Row>
        {loading ? <Loader/> : errors ? <Message variant='danger'>{errors}</Message> : 
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Heure de début</th>
          <th>Heure de fin</th>
          <th>Description</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {disponibilities.map((item)=> {  
       return (    
         <Disponibility disponibility={item} forUser={true}/>
         )  
     }) }
      </tbody>
    </Table>
    }
 </Fragment>
  )
}

export default ListUserReservationsPage