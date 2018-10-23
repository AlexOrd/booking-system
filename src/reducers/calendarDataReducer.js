import {
  LOAD_EVENTS_SUCCESS,
  LOAD_NEWS_SUCCESS,
  SET_CALENDAR,
  SET_NEWS_CALENDAR,
  GET_CALENDAR,
  LOAD_CALENDAR_LIST_SUCCESS,
  LOAD_CALENDAR_NEWS_LIST_SUCCESS
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from "./calendarInitialState";

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function calendarDataReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS_SUCCESS:
      return objectAssign({}, state, { events: action.events });
    case LOAD_NEWS_SUCCESS:
      return objectAssign({}, state, { news: action.news });
    case LOAD_CALENDAR_LIST_SUCCESS:
      return objectAssign({}, state, { calendarList: action.list });
    case LOAD_CALENDAR_NEWS_LIST_SUCCESS:
      return objectAssign({}, state, { calendarNewsList: action.list });
    case SET_CALENDAR:
      return objectAssign({}, state, { calendar: action.calendarData });
    case SET_NEWS_CALENDAR:
      return objectAssign({}, state, { newsCalendar: action.newsCalendar });
    case GET_CALENDAR:
      return state.calendar;
    default:
      return state;
  }
}
