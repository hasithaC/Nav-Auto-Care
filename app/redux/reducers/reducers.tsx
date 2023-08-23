import createReducer from '../../helper/createReducer';
import {SET_ALERT_BOX_VISIBILITY, SET_SPINNER_VISIBLE} from '../action/type';

// Initial State
const initialState = {
  spinnerVisibility: false,
  alertBoxVisibility: {
    visible: false,
    title: '',
    description: '',
    button: '',
    onPress: () => {},
  },
};

export const commonReducer = createReducer(initialState, {
  [SET_SPINNER_VISIBLE](state: any, action: {payload: object}) {
    return {
      ...state,
      spinnerVisibility: action.payload,
    };
  },
  [SET_ALERT_BOX_VISIBILITY](state: any, action: {payload: object}) {
    return {
      ...state,
      alertBoxVisibility: action.payload,
    };
  },
});
