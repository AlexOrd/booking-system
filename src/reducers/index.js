import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import calendarData from './calendarDataReducer';

const rootReducer = combineReducers({
  fuelSavings,
  calendarData
});

export default rootReducer;
