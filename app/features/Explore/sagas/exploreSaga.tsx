import {call, put, select} from 'redux-saga/effects';
import { setSpinnerVisible } from '../../../redux/action/action';

export function* callSpotFetchAPI() {
  //const triggeredScreen = action.payload;

  try {
     //yield put(setSpinnerVisible(true));
    //yield put(setSpinnerVisible(false));
    console.log('FROM SAGA')
  } catch (error) {
    // yield put(setSpinnerVisible(false));
    // yield put(setEndPointErrorVisible(true));

    console.log('EXPLORE_ERROR =>', error);
  }
}
