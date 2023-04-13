import axios from "axios"
import { CONFIRM_DISPONIBILITY_FAIL, CONFIRM_DISPONIBILITY_REQUEST, CONFIRM_DISPONIBILITY_SUCCESS, CREATE_DISPONIBILITY_FAIL,
         CREATE_DISPONIBILITY_REQUEST, 
         CREATE_DISPONIBILITY_SUCCESS, 
         DELETE_DISPONIBILITY_FAIL, 
         DELETE_DISPONIBILITY_REQUEST, 
         DELETE_DISPONIBILITY_SUCCESS, 
         EDIT_DISPONIBILITY_FAIL, 
         EDIT_DISPONIBILITY_REQUEST, 
         EDIT_DISPONIBILITY_SUCCESS, 
         LIST_DISPONIBILITIES_FAIL, 
         LIST_DISPONIBILITIES_REQUEST, 
         LIST_DISPONIBILITIES_SUCCESS, 
         RESERVE_DISPONIBILITY_FAIL, 
         RESERVE_DISPONIBILITY_REQUEST,
         RESERVE_DISPONIBILITY_SUCCESS} from "../Constants/disponibilityConstants"


//Get all disponibilities
export const listDisponibilities =() => async(dispatch)=>{
    try {
        dispatch({type:LIST_DISPONIBILITIES_REQUEST})
        const {data} = await axios.get('/api/Disponibility')
        dispatch({ 
            type:LIST_DISPONIBILITIES_SUCCESS,
            payload : data})
    } catch (error) {
        dispatch({
            type:LIST_DISPONIBILITIES_FAIL,
            payload : error.response && error.response.data.message
            ? error.response.data.message : error.message })
    }  
}

//Get disponibilities by userId
export const listDisponibilitiesByUserId =(userId) => async(dispatch)=>{
    try {
        dispatch({type:LIST_DISPONIBILITIES_REQUEST})
        const {data} = await axios.get(`/api/Disponibility/GetDisponibilitiesByUserId/${userId}`)
        dispatch({ 
            type:LIST_DISPONIBILITIES_SUCCESS,
            payload : data})
    } catch (error) {
        dispatch({
            type:LIST_DISPONIBILITIES_FAIL,
            payload : error.response && error.response.data.message
            ? error.response.data.message : error.message })
    }  
}

//Add new Disponibility
export const addDisponibility =(disponibilityInfos,navigate) => async(dispatch)=>{
    try {
        dispatch({type:CREATE_DISPONIBILITY_REQUEST})
        console.log(disponibilityInfos);
        const {data} = await axios.post('/api/Disponibility',disponibilityInfos)
        dispatch({ 
            type:CREATE_DISPONIBILITY_SUCCESS,
            payload : data})
            navigate('/')
    } catch (error) {
        dispatch({
            type:CREATE_DISPONIBILITY_FAIL,
            payload : error.response && error.response.data.message
            ? error.response.data.message : error.message })
    }  
}

//Edit existing Disponibility
export const editDisponibility=(id,disponibilityInfos,navigate) => async(dispatch) => {
    try {
        dispatch({type : EDIT_DISPONIBILITY_REQUEST})
        const {data} = await axios.put(`/api/Disponibility/${id}`,disponibilityInfos)
        dispatch({ 
            type:EDIT_DISPONIBILITY_SUCCESS,
            payload : data}) 
            navigate('/')
            window.location.reload()
           
    } catch (error) {
        dispatch({
        type:EDIT_DISPONIBILITY_FAIL,
        payload:error.response.data})
    }
}

//Delete existing Disponibility
export const deleteDisponibility=(id,navigate) => async(dispatch) => {
    try {
        dispatch({type : DELETE_DISPONIBILITY_REQUEST})
        const {data} = await axios.delete(`/api/Disponibility/${id}`)
        dispatch({ 
            type:DELETE_DISPONIBILITY_SUCCESS,
            payload : data}) 
            window.location.reload()    
    } catch (error) {
        dispatch({
        type:DELETE_DISPONIBILITY_FAIL,
        payload:error.response.data})
    }
}

//Reserve Disponibility
export const reserveDisponibility=(id,disonibility,navigate) => async(dispatch) => {
    try {
        dispatch({type : RESERVE_DISPONIBILITY_REQUEST})
        const {data} = await axios.put(`/api/Disponibility/${id}`,disonibility)
        dispatch({ 
            type:RESERVE_DISPONIBILITY_SUCCESS,
            payload : data}) 
            navigate('/')
            window.location.reload()
           
    } catch (error) {
        dispatch({
        type:RESERVE_DISPONIBILITY_FAIL,
        payload:error.response.data})
    }
}

//Decline Disponibility
export const declineDisponibility=(id,disonibility,navigate) => async(dispatch) => {
    try {
        dispatch({type : RESERVE_DISPONIBILITY_REQUEST})
        const {data} = await axios.put(`/api/Disponibility/${id}`,disonibility)
        dispatch({ 
            type:RESERVE_DISPONIBILITY_SUCCESS,
            payload : data}) 
            navigate('/')
            window.location.reload()
           
    } catch (error) {
        dispatch({
        type:RESERVE_DISPONIBILITY_FAIL,
        payload:error.response.data})
    }
}

export const confirmReservationDisponibility=(id,disponibility,navigate) => async(dispatch) => {
    try {
        console.log('dispo',disponibility);
        dispatch({type : CONFIRM_DISPONIBILITY_REQUEST})
        const {data} = await axios.put(`/api/Disponibility/${id}`,disponibility)
        dispatch({ 
            type:CONFIRM_DISPONIBILITY_SUCCESS,
            payload : data}) 
            navigate('/')
            // window.location.reload()
           
    } catch (error) {
        dispatch({
        type:CONFIRM_DISPONIBILITY_FAIL,
        payload:error.response.data})
    }
}