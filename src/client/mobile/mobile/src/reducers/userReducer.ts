// reducers/userReducer

import {
    SET_USER, RESET_USER
} from '../constants';
import { IAuthor } from '../types';

interface IUserState{
    user: IAuthor
}

const initialState : IUserState = {
    //@ts-ignore
    user: undefined
};

const userReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case RESET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;



