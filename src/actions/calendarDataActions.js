import * as types from '../constants/actionTypes';
import eventsAPI from '../api/calendarEventsAPI';

export function loadEventsSuccess(events) {
  return {
    type: types.LOAD_EVENTS_SUCCESS,
    events
  };
}

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
export const setCalendarData = calendar => ({
  type: types.SET_CALENDAR,
  calendar
});
