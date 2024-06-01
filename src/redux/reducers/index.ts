import { combineReducers } from 'redux';
import jobsReducers from './jobsReducers/jobsReducers';

const rootReducer = combineReducers({
  jobs: jobsReducers,
});

export default rootReducer;