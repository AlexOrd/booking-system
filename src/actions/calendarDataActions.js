import * as types from '../constants/actionTypes';

export function getCalendarEvents() {
  return {
    type: types.GET_EVENTS
  };
}
