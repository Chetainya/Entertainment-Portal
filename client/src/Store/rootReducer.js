import { combineReducers } from 'redux';
import authReducer from './authSlice'; // your auth reducer


const rootReducer = combineReducers({
  auth: authReducer,

});

export default rootReducer;
