import {combineReducers} from '@reduxjs/toolkit';
import userReducer from '@app/redux/reducers/User';
import offlineDataReducer from './offlineDataSlice'; // ریدوسر جدید

const rootReducer = combineReducers({
  user: userReducer,
  offlineData: offlineDataReducer,
});

export default rootReducer;
