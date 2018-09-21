import {GET_EVENTS, SET_CALENDAR, GET_CALENDAR} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from "./calendarInitialState";

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function calendarDataReducer(state = initialState, action) {

  const data = {
    events: {
      a: 'hello',
      b: 'buy'
    }
  };

  switch (action.type) {
    case GET_EVENTS:
      return objectAssign({}, state, data);
    case SET_CALENDAR:
      return objectAssign({}, state, {calendar: action.calendar});
    case GET_CALENDAR:
      return state.calendar;
    default:
      return state;
  }
}
