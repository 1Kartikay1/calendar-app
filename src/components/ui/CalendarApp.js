// src/CalendarApp.js
import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import "./index.css";
import "./App.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CalendarApp = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });
  const [editEvent, setEditEvent] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddEvent = () => {
    const newEvents = [...events, newEvent];
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
    setNewEvent({ title: "", date: "", time: "", description: "" });
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
    setNewEvent(event);
  };

  const handleSaveEvent = () => {
    const newEvents = events.map((event) => {
      if (event === editEvent) {
        return newEvent;
      }
      return event;
    });
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
    setEditEvent(null);
    setNewEvent({ title: "", date: "", time: "", description: "" });
  };

  const handleDeleteEvent = (event) => {
    const newEvents = events.filter((e) => e !== event);
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  };

  const handleToggleExpandEvent = (eventTitle) => {
    setExpandedEvent(expandedEvent === eventTitle ? null : eventTitle);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear());
    const firstDayOfMonth = getFirstDayOfMonth(
      date.getMonth(),
      date.getFullYear()
    );
    const weeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

    const calendar = [];
    for (let i = 0; i < weeks; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        const day = i * 7 + j - firstDayOfMonth + 1;
        if (day > 0 && day <= daysInMonth) {
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

          const eventsOnThisDay = events.filter(
            (event) => event.date === formattedDate
          );

          week.push({ day, events: eventsOnThisDay });
        } else {
          week.push(null);
        }
      }
      calendar.push(week);
    }

    return (
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day) => (
          <span key={day} className="text-sm font-bold">
            {day}
          </span>
        ))}
        {calendar.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, j) => (
              <div
                key={j}
                className="h-20 border border-gray-200 flex flex-col items-center p-1"
              >
                {day !== null && (
                  <>
                    <span className="text-sm font-bold mb-1">{day.day}</span>
                    {day.events.map((event) => (
                      <div
                        key={event.title}
                        className={`text-xs ${
                          expandedEvent === event.title
                            ? "text-blue-700 bg-blue-100"
                            : "text-blue-500 bg-blue-50"
                        } rounded px-2 py-1 mb-1 cursor-pointer`}
                        onClick={() => handleToggleExpandEvent(event.title)}
                        style={{
                          maxWidth: "100%",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace:
                            expandedEvent === event.title ? "normal" : "nowrap",
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-14 mb-4 sm:mb-0 sm:mr-2"
            >
              <defs>
                <style>
                  {`.cls-1{fill:#db5669}.cls-2{fill:#f26674}.cls-3{fill:#dad7e5}.cls-5{fill:#c6c3d8}`}
                </style>
              </defs>
              <g id="calendar_desk" data-name="calendar desk">
                <path className="cls-1" d="M1 6h40v8H1z" />
                <path className="cls-2" d="M41 6v6H9a6 6 0 0 1-6-6z" />
                <path className="cls-3" d="M1 14h40v30H1z" />
                <path
                  d="M41 14v28H7a4 4 0 0 1-4-4V14z"
                  style={{ fill: "#edebf2" }}
                />
                <path
                  className="cls-3"
                  d="M8 8V4a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0zM12 8V4a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0zM32 8V4a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0zM28 8V4a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0z"
                />
                <path
                  className="cls-5"
                  d="M7 19h6v4H7zM18 19h6v4h-6zM29 19h6v4h-6zM7 27h6v4H7zM18 27h6v4h-6zM29 27h6v4h-6zM7 35h6v4H7z"
                />
                <path className="cls-3" d="M13 35v2h-2a2 2 0 0 1-2-2z" />
                <path className="cls-5" d="M18 35h6v4h-6zM29 35h6v4h-6z" />
                <path
                  className="cls-1"
                  d="M47 40h-3l-3 4V6c6.72 38.05 5.32 30.1 6 34z"
                />
                <path
                  className="cls-2"
                  d="M46.65 38H44l-1 1.33v-22L46.65 38z"
                />
                <path
                  className="cls-3"
                  d="M13 27v2h-2a2 2 0 0 1-2-2zM13 19v2h-2a2 2 0 0 1-2-2zM24 35v2h-2a2 2 0 0 1-2-2zM24 27v2h-2a2 2 0 0 1-2-2zM24 19v2h-2a2 2 0 0 1-2-2zM35 35v2h-2a2 2 0 0 1-2-2zM35 27v2h-2a2 2 0 0 1-2-2zM35 19v2h-2a2 2 0 0 1-2-2z"
                />
              </g>
            </svg>
            <CardTitle className="text-center sm:text-left">
              Calendar App
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
            <Button
              variant="secondary"
              onClick={() =>
                handleDateChange(
                  new Date(
                    date.getFullYear(),
                    date.getMonth() - 1,
                    date.getDate()
                  )
                )
              }
              className="mb-2 sm:mb-0"
            >
              Prev
            </Button>
            <span className="text-lg font-bold">
              {months[date.getMonth()]} {date.getFullYear()}
            </span>
            <Button
              variant="secondary"
              onClick={() =>
                handleDateChange(
                  new Date(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    date.getDate()
                  )
                )
              }
              className="mb-2 sm:mb-0"
            >
              Next
            </Button>
          </div>
          {renderCalendar()}
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Add Event</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 htmlFor="title">Title</h3>
            <Input
              id="title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full p-3 text-base"
            />
          </div>
          <div className="mb-4">
            <h3 htmlFor="date">Date</h3>
            <Input
              id="date"
              type="date"
              value={newEvent.date}
              className="w-full p-3 text-base"
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <h3 htmlFor="time">Time</h3>
            <Input
              id="time"
              type="time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
              className="w-full p-3 text-base"
            />
          </div>
          <div className="mb-4">
            <h3 htmlFor="description">Description</h3>
            <Textarea
              id="description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="w-full p-3 text-base"
            />
          </div>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </CardContent>
      </Card>
      {editEvent && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Edit Event</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 htmlFor="title">Title</h3>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="w-full p-3 text-base"
              />
            </div>
            <div className="mb-4">
              <h3 htmlFor="date">Date</h3>
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="w-full p-3 text-base"
              />
            </div>
            <div className="mb-4">
              <h3 htmlFor="time">Time</h3>
              <Input
                id="time"
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
                className="w-full p-3 text-base"
              />
            </div>
            <div className="mb-4">
              <h3 htmlFor="description">Description</h3>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="w-full p-3 text-base"
              />
            </div>
            <Button onClick={handleSaveEvent}>Save Event</Button>
          </CardContent>
        </Card>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Events:</h2>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.title} className="bg-gray-100 p-4 rounded shadow-md">
              <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                <span className="text-lg font-bold">{event.title}</span>
                <span className="text-sm">{event.date}</span>
              </div>
              <p className="text-gray-600">{event.description}</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
                <Button onClick={() => handleEditEvent(event)}>Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteEvent(event)}
                  className="text-black"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarApp;
