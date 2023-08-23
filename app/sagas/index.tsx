// Imports: Dependencies
import {all} from 'redux-saga/effects';
import {exploreSaga} from '../features/Explore/sagas';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([...exploreSaga]);
}
