import React from "react";
import moment from "moment";
import "moment/min/locales";

import {
  Calendar,
  Cell,
  CurrentCell,
  CurrentEventCell,
  EventCell,
  HeadCell,
  Header,
  Table
} from "./calendarStyles";

import { DATE_FORMAT, finnishMonths } from "./const";

moment.locale("fi");

const getMonthDaySlots = (date, eventDates) => {
  const month = date.month();
  const year = date.year();
  const blankSlots = [];
  const daySlots = [];

  if (date.format() === "Invalid date") {
    return [];
  }

  const firstDayOfMonth = date.startOf("month").weekday();

  for (let i = 0; i < firstDayOfMonth; i++) {
    blankSlots.push(<Cell />);
  }

  for (let d = 1; d <= date.daysInMonth(); d++) {
    const slotDate = moment([year, month, d]).format(DATE_FORMAT);

    daySlots.push(
      slotDate === moment().format(DATE_FORMAT) ? (
        eventDates.includes(slotDate) ? (
          <CurrentEventCell key={d}>{d}</CurrentEventCell>
        ) : (
          <CurrentCell key={d}>
            <b>{d}</b>
          </CurrentCell>
        )
      ) : eventDates.includes(slotDate) ? (
        <EventCell key={d}>{d}</EventCell>
      ) : (
        <Cell key={d}>{d}</Cell>
      )
    );
  }

  return [...blankSlots, ...daySlots];
};

export default ({ date, events }) => {
  const rows = [];
  let cells = [];

  const eventDates = events.map(e => moment(e.start).format(DATE_FORMAT));
  const allSlots = getMonthDaySlots(date, eventDates);

  allSlots.forEach((slot, i) => {
    if (i % 7 !== 0) {
      cells.push(slot);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(slot);
    }

    if (i === allSlots.length - 1) {
      rows.push(cells);
    }
  });

  if (!rows.length) {
    return null;
  }

  return (
    <Calendar>
      <Header>{finnishMonths[moment(date).month()]}</Header>
      <Table>
        <tbody>
          <tr>
            {moment.weekdaysShort(true).map(day => (
              <HeadCell key={day}>{day}</HeadCell>
            ))}
          </tr>
          {rows.map((row, i) => (
            <tr key={i}>{row}</tr>
          ))}
        </tbody>
      </Table>
    </Calendar>
  );
};
