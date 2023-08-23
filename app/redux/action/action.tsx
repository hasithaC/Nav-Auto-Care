import {SET_ALERT_BOX_VISIBILITY, SET_SPINNER_VISIBLE} from './type';

export const setSpinnerVisible = (visibility: boolean) => {
  return {
    type: SET_SPINNER_VISIBLE,
    payload: visibility,
  };
};

export const setAlertBoxVisibility = (visibility: object) => {
  return {
    type: SET_ALERT_BOX_VISIBILITY,
    payload: visibility,
  };
};
