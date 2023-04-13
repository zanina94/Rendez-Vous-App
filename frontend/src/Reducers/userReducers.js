import { EDIT_DISPONIBILITY_FAIL, EDIT_DISPONIBILITY_REQUEST, EDIT_DISPONIBILITY_SUCCESS } from "../Constants/disponibilityConstants";
import { USER_LOGIN_REQUEST,
         USER_LOGIN_SUCCESS,
         USER_LOGIN_FAIL,
         USER_REGISTER_FAIL, 
         USER_REGISTER_REQUEST, 
         USER_REGISTER_SUCCESS, 
         USER_LOGOUT,
         LIST_USERS_REQUEST,
         LIST_USERS_SUCCESS,
         LIST_USERS_FAIL,
        } from "../Constants/userConstants";

const initialState = {
    token : localStorage.getItem('token') || null,
    userInfo : JSON.parse(localStorage.getItem('userInfo')) || {},
    loading :false,
    isAuth : Boolean(localStorage.getItem('isAuth')) || false,
    errors : null
}

export const authUserReducer = (state =initialState,action) =>{
   switch (action.type) {
    case USER_REGISTER_REQUEST:
        return({...state,loading: true})  
    case USER_REGISTER_SUCCESS:
        return ({...state, token : action.payload.token, userInfo : {
            "id": action.payload.id,
            "firstName": action.payload.firstName,
            "lastName": action.payload.lastName,
            "email": action.payload.email,
            "role": action.payload.role,
            "password": action.payload.password}, loading: false, errors : null})
    case USER_REGISTER_FAIL:
        return({...state,loading:false, errors : action.payload})
    case USER_LOGIN_REQUEST:
        return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('isAuth', true);
        localStorage.setItem('userInfo', JSON.stringify({
            "id": action.payload.id,
            "firstName": action.payload.firstName,
            "lastName": action.payload.lastName,
            "email": action.payload.email,
            "role": action.payload.role,
            "password": action.payload.password}));
        return {
              ...state,
              loading: false,
              token: action.payload.token,
              userInfo: {
                "id": action.payload.id,
                "firstName": action.payload.firstName,
                "lastName": action.payload.lastName,
                "email": action.payload.email,
                "role": action.payload.role,
                "password": action.payload.password},
              errors: null,
              isAuth: true,
            };
    case USER_LOGIN_FAIL:
        return { ...state, loading: false, errors: action.payload };
    case USER_LOGOUT :
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('isAuth')
        return { ...state, loading:false, errors: null, userInfo : {} , token : null, isAuth:false}
    default:
        return state
   } 
}

const listUsersState = {
    loading : false,
    users : [],
    admins : [],
    errors : null,
}

export const listUsersReducer = (state = listUsersState , action) => {
    switch (action.type) {
        case LIST_USERS_REQUEST:
            return({...state, loading:true})    
        case LIST_USERS_SUCCESS:{
            const arrUsers = []
            const arrAdmins = []
            for(var i =0 ; i<action.payload.length ; i++){
                action.payload[i].Role ==="User" ? arrUsers.push({value : action.payload[i]._id, label : action.payload[i].FirstName}) :
                arrAdmins.push({value : action.payload[i]._id, label : action.payload[i].FirstName})
            }
            return ({...state,loading:false,  users: arrUsers, admins : arrAdmins })
    }
        case LIST_USERS_FAIL:
            return ({...state,loading : false, errors : action.payload})
        default:
            return(state)
    }
}

const editUserState = {
    loading : false,
    user : {},
    errors : null,
    isSuccess : false
}

export const editUserReducer = (state = editUserState, action) =>{
    switch(action.type) {
        case EDIT_DISPONIBILITY_REQUEST: 
        return ({loading : true , user : {}})
        case EDIT_DISPONIBILITY_SUCCESS:
        return ({loading : false , user : action.payload, isSuccess : true})
        case EDIT_DISPONIBILITY_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        default:
            return state
    }
}