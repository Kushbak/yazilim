// reducers/countryReducer
import {} from "../types";
import {DEPARTMENT_SET, CATEGORY_SET} from "../constants";

const initialCategoryState = {
    categoryList: [] as any,
    departmentList: undefined as any,
};

const categoryReducer = (state= initialCategoryState, action: any) => {
    switch(action.type) {
        case CATEGORY_SET:
            return {
                ...state,
                categoryList: action.payload
            };
        case DEPARTMENT_SET:
            return {
                ...state,
                departmentList: action.payload
            }
        default:
            return state;
    }
};

export default categoryReducer;



