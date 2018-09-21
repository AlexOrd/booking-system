import * as types from '../constants/actionTypes';

export function getCalendarEvents() {
  return {
    type: types.GET_EVENTS
  };
}

export const setCalendarData = calendar => ({
  type: types.SET_CALENDAR,
  calendar
});
