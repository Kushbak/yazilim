// reducers/settings

import {
  LANG_CHANGE,
  BOTTOM_NAV_BADGE_CHANGE,
} from '../constants';

const initialState = {
  lan: 'ru',
};

const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case LANG_CHANGE:
    return {
      ...state,
      lan: action.payload || 'ru',
    };
    case BOTTOM_NAV_BADGE_CHANGE:
    return {
      ...state,
      ['badge'+action.payload.type]: action.payload.badge || 0,
    };
    default:
      return state;
  }
}

export default reducer;



