import axios from '../helper/axios-api';
import {API_URL, FETCH_POSTER_SUCCESS} from '../constants';
export const FETCH_POSTER_REQUEST = 'FETCH_POSTER_REQUEST';

export const fetchPosters = () => {
    return async (dispatch:any) => {
        try{
            const response = await axios.get(`${API_URL}posters`);
            dispatch({type: FETCH_POSTER_SUCCESS, payload: response.data})
        }
        catch(e){
            console.log(e)
        }
    }
};


