import {API_URL, CATEGORY_GET, CATEGORY_SET, DEPARTMENT_SET} from "../constants";
import axios from 'axios'

export const setCategoryList = (categoryList: any) => {

    return (dispatch:any) => {
        dispatch({type: CATEGORY_SET,payload: categoryList})
    }
}

export const setDepartmentList = (departmentList: any) => {
    return (dispatch:any) => {
        dispatch({type:DEPARTMENT_SET, payload: departmentList})
    }
}

export function getCategoryList(categoryList: any) {
    return{
        type: CATEGORY_GET,
        payload: categoryList
    }
}
