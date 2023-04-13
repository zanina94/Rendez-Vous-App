import axios from "axios"
import { USER_LOGIN_REQUEST,
         USER_LOGIN_SUCCESS,
         USER_LOGIN_FAIL,
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAIL,
        USER_LOGOUT, 
        LIST_USERS_REQUEST,
        LIST_USERS_SUCCESS,
        LIST_USERS_FAIL,
        EDIT_USER_REQUEST,
        EDIT_USER_SUCCESS,
        EDIT_USER_FAIL} from "../Constants/userConstants"

//action register new user
        export const registerUser = (userInfo,navigate) => async(dispatch) => { 
            try {
                dispatch({type : USER_REGISTER_REQUEST})
                const res = await axios.post('/api/User/Register',userInfo)
                dispatch({type : USER_REGISTER_SUCCESS, payload : res.data})
                navigate('/Login')
            } catch (error) {
                dispatch({type: USER_REGISTER_FAIL, payload:error.response.data}) 
            }
         }         

//action login user
        export const loginUser = (userInfo,navigate) => async(dispatch) => { 
            try {
                dispatch({type : USER_LOGIN_REQUEST})
                console.log('infos',userInfo);
                const {data} = await axios.post('/api/User/Login',userInfo)
                dispatch({type : USER_LOGIN_SUCCESS, payload : data})
         navigate('/') 
           } catch (error) {
            console.log('error',error);
               dispatch({type: USER_LOGIN_FAIL, payload:error.response.data}) 
           }
          }

//action logout user          
          export const logoutUser = () => {
            return {type : USER_LOGOUT}
         }

//action edit profile
export const editUser = (id,userInfo,navigate) => async(dispatch) => { 
    try {
        console.log('uinfos',userInfo);
        dispatch({type : EDIT_USER_REQUEST})
        const res = await axios.put(`/api/User/Edit/${id}`,userInfo)
        dispatch({type : EDIT_USER_SUCCESS, payload : res.data})
        navigate('/Login')
    } catch (error) {
        dispatch({type: EDIT_USER_FAIL, payload:error.response.data}) 
    }
 }         

//action get all users
export const getAllUsers =() => async(dispatch)=>{
    try {
        dispatch({type:LIST_USERS_REQUEST})
        const {data} = await axios.get('/api/users/getAllUsers')
        dispatch({ 
            type:LIST_USERS_SUCCESS,
            payload : data})
    } catch (error) {
        dispatch({
            type:LIST_USERS_FAIL,
            payload : error.response && error.response.data.message
            ? error.response.data.message : error.message })
    }  
}