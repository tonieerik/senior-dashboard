import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import moment from 'moment';
import 'moment/min/locales';

import AnalogClock from "./AnalogClock";
import useInterval from "./useInterval";

import darkTheme from './themes/dark'
import lightTheme from './themes/light'

import './App.css';

const BACKEND_URL = 'https://sennu-backend.herokuapp.com/';
const REFRESH_INTERVAL = 6*60*60*1000; // milliseconds

moment.locale('fi');

const finnishMonths = [
  "TAMMI",
  "HELMI",
  "MAALIS",
  "HUHTI",
  "TOUKO",
  "KESÄ",
  "HEINÄ",
  "ELO",
  "SYYS",
  "LOKA",
  "MARRAS",
  "JOULU"
];

const finnishDays = [
  "SUNNUNTAI",
  "MAANANTAI",
  "TIISTAI",
  "KESKIVIIKKO",
  "TORSTAI",
  "PERJANTAI",
  "LAUANTAI"
];

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
}

const isNight = now => timeOfTheDay(now) === 'YÖ';

const App = () => {
  const [sennuEvents, setSennuEvents] = React.useState([]);
  const [tick, setTick] = React.useState(0);

  const getCalendarEvents = () =>
    fetch(BACKEND_URL)
      .then(response => response.json())
      .then(json => setSennuEvents(JSON.parse(json)))
      .catch(e => console.error(e));

  useInterval(() => { setTick(tick+1); }, 10000);
  useInterval(getCalendarEvents, REFRESH_INTERVAL);

  ! sennuEvents.length && getCalendarEvents();

  const now = new Date();
  const finnishDay = finnishDays[now.getDay()];
  const finnishDate =
    now.getDate() +
    ". " +
    finnishMonths[now.getMonth()] +
    "KUUTA " +
    now.getFullYear();

  const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.textColor};
    }
  `

  const TimeOfDay = styled.div`
    background-color: ${props => props.theme.colors.infoPillBgColor};
    border: 1px solid ${props => props.theme.colors.infoPillBorderColor};
    border-radius: 15px;
    color: ${props => props.theme.colors.infoPillColor};
    margin: auto;
    padding: 5px; 
    width: 50%;
  `

  const SectionTitle = styled.div`
    background-color: ${props => props.theme.colors.calendarHeaderBgColor};
    border-radius: 10px;
    color: ${props => props.theme.colors.calendarHeaderColor};
    font-size: 28px;
    padding: 10px;
    text-align: left;
  `

  const Time = styled.td`
    color: ${props => props.theme.colors.calendarTextColor};
    min-width: 180px;
  `

  const TimeTo = styled.span`
    background-color: ${props => props.theme.colors.infoPillBgColor};
    border: 1px solid ${props => props.theme.colors.infoPillBorderColor};
    border-radius: 5px;
    color: ${props => props.theme.colors.infoPillColor};
    font-size: 14px;
    padding: 5px;
  `

  const EventHeader = styled.span`
    color: ${props => props.theme.colors.calendarTextColor};
  `

  const EventDescription = styled.span`
    color: ${props => props.theme.colors.calendarDetailTextColor};
    font-size: 18px;
  `

  return (
    <ThemeProvider theme={isNight(now) ? darkTheme : lightTheme}>
      <div id="AppContainer">
        <GlobalStyle />
        <div id="left">
          <TimeOfDay>NYT ON {timeOfTheDay(now)}</TimeOfDay>
          <AnalogClock
            faceColor={isNight(now) ? "#e5e5e5" : undefined}
            height={300}
            width={300}
            now={now}
            showTicks />
          <div className="dayInfo">
            {finnishDay}<br />{finnishDate}<br />
            kello {now.getHours()}.{('0'+now.getMinutes()).slice(-2)}
          </div>
        </div>
        <div id="right">
          <SectionTitle>KALENTERI</SectionTitle>
          <table><tbody>
          {
            sennuEvents.map((event, i) => 
              <tr key={i}>
                <Time>
                  {moment(event.start).format("D")}. {finnishMonths[moment(event.start).format("M")-1]}KUUTA<br />
                  KELLO {moment(event.start).format("HH.mm")}<br />
                  <TimeTo>{moment(event.start).fromNow()}</TimeTo>
                </Time>
                <td>
                  <EventHeader>{event.title} {event.location ? '/' : ''} {event.location}</EventHeader>
                  <br />
                  <EventDescription>{event.description}</EventDescription>
                </td>
              </tr>
            )
          }
          </tbody></table>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
