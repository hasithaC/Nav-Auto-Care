import {
  GET_SPOTS_NEAR_USER,
  SET_ALERT_BOX_VISIBILITY,
  SET_SELECTED_SPOT,
  SET_SPINNER_VISIBLE,
  SET_SPOTS_AVAILABILITY,
  SET_SPOTS_NEAR_USER,
} from './type';

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

export const setNearSpots = (spots: []) => {
  return {
    type: SET_SPOTS_NEAR_USER,
    payload: spots,
  };
};

export const getNearSpots = (url: string) => {
  return {
    type: GET_SPOTS_NEAR_USER,
    payload: url,
  };
};

export const setSpotsAvalability = (avalability: boolean) => {
  return {
    type: SET_SPOTS_AVAILABILITY,
    payload: avalability,
  };
};

export const setSelectedSpot = (avalability: object) => {
  return {
    type: SET_SELECTED_SPOT,
    payload: avalability,
  };
};
