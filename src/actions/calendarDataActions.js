import * as types from '../constants/actionTypes';
import calendarAPI from '../api/calendarAPI';

export function setCalendarData(calendarData) {
  return {
    type: types.SET_CALENDAR,
    calendarData
  };
}

export function setCalendarNews(newsCalendar) {
  return {
    type: types.SET_NEWS_CALENDAR,
    newsCalendar
  };
}

export function loadEventsSuccess(events) {
  return {
    type: types.LOAD_EVENTS_SUCCESS,
    events
  };
}

export function loadNewsSuccess(news) {
  return {
    type: types.LOAD_NEWS_SUCCESS,
    news
  };
}

export function loadCalendarListSuccess(list) {
  return {
    type: types.LOAD_CALENDAR_LIST_SUCCESS,
    list
  };
}
export function loadCalendarNewsListSuccess(list) {
  return {
    type: types.LOAD_CALENDAR_NEWS_LIST_SUCCESS,
    list
  };
}

// thunk
export function loadNews(calendarId, timeMin, timeMax) {
  return function(dispatch) {
    calendarAPI.getEvents(calendarId, timeMin, timeMax).then(response => {
      const events = response.result.items;
      dispatch(loadNewsSuccess(events))
    }).catch(error => {
      throw(error)
    });
  }
}

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
      // filter primary calendars
      const calendarList = response.result.items.filter(calendar => calendar.id != calendar.summary);
      // filter news calendars
      const newsCalendarList = response.result.items.filter(calendar => calendar.summary.includes('News'));

      dispatch(loadCalendarListSuccess(calendarList))
      dispatch(loadCalendarNewsListSuccess(newsCalendarList))
    }).catch(error => {
      throw(error)
    });
  }
}

