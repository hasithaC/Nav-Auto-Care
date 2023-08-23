import {takeLatest} from 'redux-saga/effects';
import * as type from '../../../redux/action/type';
import {callSpotFetchAPI} from './exploreSaga';

export const exploreSaga = [
  takeLatest(type.SET_SPINNER_VISIBLE, callSpotFetchAPI),
];
