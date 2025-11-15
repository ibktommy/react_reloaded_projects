import { useState } from "react";

const CalendarApp = () => {
  // Define variables
  const days_of_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months_of_year = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();

  // Set states
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  // Get first day of each month and number of days in a month
  const days_in_month = new Date(currentYear, currentMonth + 1, 0).getDate();
  const first_day_of_month = new Date(currentYear, currentMonth, 1).getDay();

  // Handle getting previous month, previous year, next month and next year
  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  // Handle clicking current day and next days
  const handleDayClick = (day) => {
    const clicked_date = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clicked_date >= today || isSameDay(clicked_date, today)) {
      setSelectedDate(clicked_date);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
      setEditingEvent(null);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Handle event submission
  const handleEventSubmit = () => {
    const new_event = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };

    let updated_events = [...events];
    if (editingEvent) {
      updated_events = updated_events.map((event) =>
        event.id === editingEvent.id ? new_event : event
      );
    } else {
      updated_events.push(new_event);
    }
    // sort events item according to date stamps in the array
    updated_events.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(updated_events);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  // Handle event edits
  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(":")[0],
      minutes: event.time.split(":")[1],
    });
    setEventText(event.text);
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  // Handle delete event
  const handleDeleteEvent = (event_id) => {
    const updated_events = events.filter((event) => event.id !== event_id);
    setEvents(updated_events);
  };

  // Handle time format change
  const handleTimeFormatChange = (e) => {
    const { name, value } = e.target;
    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    }));
  };

  return (
    <div className="calendar_app">
      <div className="calendar">
        <h1 className="heading">Calendar</h1>
        <div className="navigate_date">
          <h2 className="month">{months_of_year[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx  bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx  bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>

        <div className="weekdays">
          {days_of_week.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="days">
          {[...Array(first_day_of_month).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(days_in_month).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth == currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current_day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>

      <div className="events">
        {showEventPopup && (
          <div className="event_popup">
            <div className="time_input">
              <div className="event_popup_time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={handleTimeFormatChange}
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={eventTime.minutes}
                onChange={handleTimeFormatChange}
              />
            </div>
            <textarea
              placeholder="Enter Event Text (Maximum 60 Characters)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>
            <button className="event_popup_btn" onClick={handleEventSubmit}>
              {editingEvent ? "Update Event" : "Add Event"}
            </button>
            <button
              className="close_event_popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}

        {events.map((event, index) => (
          <div key={index} className="event">
            <div className="event_date_wrapper">
              <div className="event_date">{`${
                months_of_year[event.date.getMonth()]
              } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
              <div className="event_time">{event.time}</div>
            </div>

            <div className="event_text">{event.text}</div>
            <div className="event_buttons">
              <i
                className="bx  bxs-edit-alt"
                onClick={() => handleEditEvent(event)}
              ></i>
              <i
                className="bx  bxs-message-edit"
                onClick={() => handleDeleteEvent(event.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarApp;
