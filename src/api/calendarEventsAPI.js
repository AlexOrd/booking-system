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
}

export default calendarEventsAPI;
