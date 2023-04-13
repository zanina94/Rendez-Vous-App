import React, { Fragment, useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Row, ToggleButton } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listDisponibilities } from '../Actions/disponibilityActions';
import Disponibility from '../Components/Disponibility';
import Loader from '../Components/Loader';
import Message from '../Components/Message';


const ListDisponibilitiesPage = () => {
const {isAuth, userInfo} = useSelector((state)=>state.authUser)
const {disponibilities,loading,errors} = useSelector(state => state.listDisponibilities)
const dispatch = useDispatch();
const navigate = useNavigate();


const [radioValue, setRadioValue] = useState('0');

const radios = [
  { name: 'Tous', value: '0' },
  { name: 'Libres', value: '1' },
  { name: 'Demandées', value: '2' },
  { name: 'Reservées', value: '3' },
];


useEffect(()=>{
    dispatch(listDisponibilities())
},[dispatch])

// const [filteredDisponibilities, setFilteredDisponibilities] = useState(disponibilities);

const filterDisponibilities=(e)=>{
    console.log(e.target.value);
    setRadioValue(e.target.value)  
}

var filteredDisponibilities = []
if(radioValue === '0')
  filteredDisponibilities = disponibilities
else if(radioValue ==='1')
  filteredDisponibilities = disponibilities.filter(d=>!d.isRequested && !d.isReserved)
else if(radioValue ==='2')
  filteredDisponibilities = disponibilities.filter(d=>d.isRequested)
else
  filteredDisponibilities = disponibilities.filter(d=>d.isReserved)

  return (
    <Fragment>
    <Row className='mb-1 mt-1 mx-1'>
    <Col>
      <h3 className='float-start mx-0 px-0 my-4'>Liste Des Disponibilités</h3>
    </Col>
    <Col className='my-4'>
    <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            style={{width:'140px'}}
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={'outline-primary'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={filterDisponibilities}
          >
            {radio.name}
          </ToggleButton>
         
        ))}
      </ButtonGroup>
    </Col>

      <Col className='my-3'>
      {(isAuth && userInfo.role ==='Admin') &&
     <Link style={{width:'200px'}} className='btn btn-primary my-2 float-end' to='/AddDisponibility'><i className='fas fa-plus'></i>&nbsp;Ajouter Disponibilité</Link>}
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
          <th>User</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {filteredDisponibilities.map((item)=> {  
       return (    
        <>
         <Disponibility disponibility={item} forUser={false}/>
         </>
         )  
     }) }
      {/* {radioValue === '0'   ?
       disponibilities.map((item)=> {  
       return (    
        <>
         <Disponibility disponibility={item}/>
         </>
         )  
     })
    : radioValue === '1'   ?
       disponibilities.filter(d=>d.isRequested===false && d.isReserved===false).map((item)=> {  
       return (    
        <>
         <Disponibility disponibility={item}/>
         </>
         )  
     })
    : radioValue === '2'  ?
    disponibilities.filter(d=>d.isRequested === true).map((item)=> {  
        return (    
         <>
         <Disponibility disponibility={item}/>
          </>
          )  
      })
    : radioValue === '3'  ?
    disponibilities.filter(d=>d.isReserved === true).map((item)=> {  
        return (    
         <>
        <Disponibility disponibility={item}/>
          </>
          )  
      })
: "...Loading"} */}

      </tbody>
    </Table>
    }

    </Fragment>
  )
}

export default ListDisponibilitiesPage