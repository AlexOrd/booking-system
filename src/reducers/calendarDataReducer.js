import {LOAD_EVENTS_SUCCESS} from '../constants/actionTypes';
import objectAssign from 'object-assign';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

export default function calendarDataReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_EVENTS_SUCCESS:
      return objectAssign({}, state, {events: action.events});

    default:
      return state;
  }
}
