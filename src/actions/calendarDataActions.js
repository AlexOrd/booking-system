import * as types from '../constants/actionTypes';
import calendarAPI from '../api/calendarAPI';

export function setCalendarData(calendarData) {
  return {
    type: types.SET_CALENDAR,
    calendarData
  };
}

export function loadEventsSuccess(events) {
  return {
    type: types.LOAD_EVENTS_SUCCESS,
    events
  };
}

export function loadCalendarListSuccess(list) {
  return {
    type: types.LOAD_CALENDAR_LIST_SUCCESS,
    list
  };
}

// thunk

export function loadEvents(calendarId, timeMin, timeMax) {
  return function(dispatch) {
    calendarAPI.getEvents(calendarId, timeMin, timeMax).then(response => {
      const events = response.result.items;
      dispatch(loadEventsSuccess(events))
    }).catch(error => {
      throw(error)
    });
  }
}

export function getCalendarList() {
  return function(dispatch) {
    calendarAPI.calendarList().then(response => {
      // filter primary calendar
      const list = response.result.items.filter(calendar => calendar.id != calendar.summary);
      dispatch(loadCalendarListSuccess(list))
    }).catch(error => {
      throw(error)
    });
  }
}

