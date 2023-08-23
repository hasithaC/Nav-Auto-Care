import createReducer from '../../helper/createReducer';
import {
  SET_ALERT_BOX_VISIBILITY,
  SET_SELECTED_SPOT,
  SET_SPINNER_VISIBLE,
  SET_SPOTS_AVAILABILITY,
  SET_SPOTS_NEAR_USER,
} from '../action/type';

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
  nearSpots: [],
  spotsAvalability: 'false',
  selectedSpot: {name: '', vicinity: ''},
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
  [SET_SPOTS_NEAR_USER](state: any, action: {payload: object}) {
    return {
      ...state,
      nearSpots: action.payload,
    };
  },
  [SET_SPOTS_AVAILABILITY](state: any, action: {payload: object}) {
    return {
      ...state,
      spotsAvalability: action.payload,
    };
  },
  [SET_SELECTED_SPOT](state: any, action: {payload: object}) {
    return {
      ...state,
      selectedSpot: action.payload,
    };
  },
});
