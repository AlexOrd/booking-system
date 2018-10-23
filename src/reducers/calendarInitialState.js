export default {
  events: JSON.parse(localStorage.getItem('events')) || [],
  news: JSON.parse(localStorage.getItem('news')) || [],
  calendarList: JSON.parse(localStorage.getItem('calendarList')) || [],
  calendarNewsList: JSON.parse(localStorage.getItem('calendarNewsList')) || [],
  newsCalendar: JSON.parse(localStorage.getItem('newsCalendar')) || {},
  calendar: JSON.parse(localStorage.getItem('calendar')) || {},
};
