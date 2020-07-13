import {SET_USER, RESET_USER} from "../constants";

export const setUser = (user: object) => {
    return (dispatch:any) => {
        try{
            dispatch({type: SET_USER, payload: user})
        }
        catch(e){
            console.log(e)
        }   
    }
};

export const userResetAction = () => {
    return (dispatch:any) => {
        try{
            dispatch({type: RESET_USER, payload: undefined})
        }
        catch(e){
            console.log(e)
        }
    }
}