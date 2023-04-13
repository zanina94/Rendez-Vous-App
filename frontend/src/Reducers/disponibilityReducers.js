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


const listDisponibilitiesState = {
    loading : false,
    disponibilities : [],
    errors : null,
}

export const listDisponibilitiesReducer = (state = listDisponibilitiesState , action) => {
    switch (action.type) {
        case LIST_DISPONIBILITIES_REQUEST:
            return({...state, loading:true})    
        case LIST_DISPONIBILITIES_SUCCESS:{
            return ({...state,loading:false,disponibilities:action.payload,})
        }
        case LIST_DISPONIBILITIES_FAIL:
            return ({...state,loading : false, errors : action.payload})
        default:
            return(state)
    }
}

const manageDisponibilitiesState = {
    loading : false,
    disponibility : {},
    errors : null,
    isSuccess : false
}

export const manageDisponibilitiesReducer = (state = manageDisponibilitiesState, action) =>{
    switch(action.type) {
        case CREATE_DISPONIBILITY_REQUEST: 
        return ({loading : true , disonibility : {}})
        case CREATE_DISPONIBILITY_SUCCESS:
        return ({loading : false , disonibility : action.payload, isSuccess : true})
        case CREATE_DISPONIBILITY_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        case EDIT_DISPONIBILITY_REQUEST: 
        return ({loading : true , disonibility : {}})
        case EDIT_DISPONIBILITY_SUCCESS:
        return ({loading : false , disonibility : action.payload, isSuccess : true})
        case EDIT_DISPONIBILITY_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        case DELETE_DISPONIBILITY_REQUEST: 
        return ({loading : true , disonibility : {}})
        case DELETE_DISPONIBILITY_SUCCESS:
        return ({loading : false , disonibility : {}, isSuccess : true})
        case DELETE_DISPONIBILITY_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        case RESERVE_DISPONIBILITY_REQUEST: 
        return ({loading : true , disonibility : {}})
        case RESERVE_DISPONIBILITY_SUCCESS:
        return ({loading : false , disonibility : {}, isSuccess : true})
        case RESERVE_DISPONIBILITY_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        case CONFIRM_DISPONIBILITY_REQUEST: 
        return ({loading : true , disonibility : {}})
        case CONFIRM_DISPONIBILITY_SUCCESS:
        return ({loading : false , disonibility : {}, isSuccess : true})
        case CONFIRM_DISPONIBILITY_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        default:
            return state
    }
}