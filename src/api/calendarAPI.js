class calendarAPI {
  static getEvents(calendarId, timeMin, timeMax) {
    return !window.gapi ? Promise.resolve([]) : window.gapi.client.calendar.events.list({
      calendarId,
      timeMin,
      timeMax
    })
  }

  static createEvent(calendarId, resource) {
    return !window.gapi ? Promise.resolve([]) : window.gapi.client.calendar.events.insert({
      calendarId,
      resource
    });
  }

  static calendarList() {
    return !window.gapi ? Promise.resolve([]) : window.gapi.client.calendar.calendarList.list({
      'minAccessRole': 'owner'
    })
  }
}

export default calendarAPI;
