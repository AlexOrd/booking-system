import * as types from '../constants/actionTypes';
import eventsAPI from '../api/calendarEventsAPI';

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

export function loadEvents() {
  return function(dispatch) {
    eventsAPI.getEvents().then(response => {
      const events = response.result.items;
      dispatch(loadEventsSuccess(events))
    }).catch(error => {
      throw(error)
    });
  }
}

export function getCalendarList() {
  return function(dispatch) {
    eventsAPI.calendarList().then(response => {
      const list = response.result.items;
      dispatch(loadCalendarListSuccess(list))
    }).catch(error => {
      throw(error)
    });
  }
}

