import {IPoster} from '../types';
import {FETCH_POSTER_SUCCESS} from "../constants";
import {FETCH_POSTER_REQUEST} from "../actions";

interface IPosterState {
    posterList: IPoster[];
}

const initialPosterState: IPosterState = {
    //@ts-ignore
    posterList: undefined
}

const posterReducer = (state = initialPosterState, action: any) => {
    switch (action.type) {
        case FETCH_POSTER_SUCCESS:
            return {
                ...state,
                posterList: action.payload,
            }
        default:
            return state;
    }
}

export default posterReducer;
