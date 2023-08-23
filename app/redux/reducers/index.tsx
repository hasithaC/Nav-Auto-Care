// Imports: Dependencies
import {combineReducers} from 'redux';
import {commonReducer} from './reducers';

// Imports: Reducers

// Redux: Root Reducer
const rootReducer = combineReducers({
  commonReducer,
});

// Exports
export default rootReducer;
