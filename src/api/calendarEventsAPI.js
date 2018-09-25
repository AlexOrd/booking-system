class calendarEventsAPI {
  static getEvents() {
    return !window.gapi ? Promise.resolve([]) : window.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    })
  }

  static calendarList() {
    return !window.gapi ? Promise.resolve([]) : window.gapi.client.calendar.calendarList.list({
      'minAccessRole': 'owner'
    })
  }
}

export default calendarEventsAPI;
