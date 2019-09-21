import React from "react";
import { ThemeProvider } from "styled-components";
import moment from "moment";
import "moment/min/locales";

import Calendar from "./Calendar";
import AnalogClock from "./AnalogClock";
import useInterval from "./useInterval";

import darkTheme from "./themes/dark";
import lightTheme from "./themes/light";

import {
  AppContainer,
  Black,
  CalendarContainer,
  ClockContainer,
  CurrentDateTime,
  Event,
  EventContainer,
  EventDescription,
  EventDetails,
  EventHeader,
  EventTitle,
  GlobalStyle,
  TimeTo
} from "./appStyles";

import {
  BACKEND_URL,
  REFRESH_INTERVAL,
  finnishDays,
  finnishMonths
} from "./const";

moment.locale("fi");

const timeOfTheDay = now => {
  if (now.getHours() < 6) {
    return "YÖ";
  } else if (now.getHours() < 10) {
    return "AAMU";
  } else if (now.getHours() < 17) {
    return "PÄIVÄ";
  } else if (now.getHours() < 23) {
    return "ILTA";
  } else {
    return "YÖ";
  }
};

const isNight = now => timeOfTheDay(now) === "YÖ";

const App = () => {
  const [sennuEvents, setSennuEvents] = React.useState([]);
  const [tick, setTick] = React.useState(0);

  const getCalendarEvents = () =>
    fetch(BACKEND_URL)
      .then(response => response.json())
      .then(json => setSennuEvents(JSON.parse(json)))
      .catch(e => console.error(e));

  useInterval(() => {
    setTick(tick + 1);
  }, 10000);
  useInterval(getCalendarEvents, REFRESH_INTERVAL);

  !sennuEvents.length && getCalendarEvents();

  const now = new Date();
  const finnishDay = finnishDays[now.getDay()];
  const finnishDate =
    now.getDate() +
    ". " +
    finnishMonths[now.getMonth()] +
    "TA " +
    now.getFullYear();

  const renderClockContainer = () => (
    <ClockContainer>
      <AnalogClock
        faceColor={isNight(now) ? "#333333" : undefined}
        height={250}
        now={now}
        showTicks
        strokeColor={isNight(now) ? "#e5e5e5" : undefined}
        width={250}
      />
      <CurrentDateTime>
        <Black>NYT ON {timeOfTheDay(now)}</Black>
        <br />
        kello {now.getHours()}.{("0" + now.getMinutes()).slice(-2)}
        <br />
        {finnishDay} {finnishDate}
      </CurrentDateTime>
    </ClockContainer>
  );

  const renderCalendarContainer = () => (
    <CalendarContainer>
      <div>
        <Calendar date={moment()} events={sennuEvents} />
        <Calendar date={moment().add(1, "month")} events={sennuEvents} />
      </div>
      <EventContainer>
        <EventTitle>KALENTERIMERKINNÄT</EventTitle>
        {sennuEvents.map((event, i) => (
          <Event key={i}>
            {finnishDays[moment(event.start).day()]}{" "}
            {moment(event.start).format("D")}.{" "}
            {finnishMonths[moment(event.start).format("M") - 1]}TA kello{" "}
            {moment(event.start).format("HH.mm")}
            <TimeTo>{moment(event.start).fromNow()}</TimeTo>
            <EventDetails>
              <EventHeader>
                {event.title} {event.location ? "/" : ""} {event.location}
              </EventHeader>
              <br />
              <EventDescription>{event.description}</EventDescription>
            </EventDetails>
          </Event>
        ))}
      </EventContainer>
    </CalendarContainer>
  );

  return (
    <ThemeProvider theme={isNight(now) ? darkTheme : lightTheme}>
      <AppContainer>
        <GlobalStyle />
        {renderClockContainer()}
        {renderCalendarContainer()}
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
