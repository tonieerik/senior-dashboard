import React from 'react';
import axios from 'axios';
import moment from 'moment';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import AnalogClock from "./AnalogClock";
import useInterval from "./useInterval";

import darkTheme from './themes/dark'
import lightTheme from './themes/light'

import './App.css';

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
  } else if (now.getHours() < 16) {
    return "PÄIVÄ";
  } else if (now.getHours() < 23) {
    return "ILTA";
  } else {
    return "YÖ";
  }
}

const isNight = now => timeOfTheDay(now) === 'YÖ';

const App = () => {
  const [dummy, setDummy] = React.useState(0);
  useInterval(() => {
    setDummy(dummy + 1);
  }, 10000);

  const [sennuEvents, setSennuEvents] = React.useState([]);

  const now = new Date();
  const finnishDay = finnishDays[now.getDay()];
  const finnishDate =
    now.getDate() +
    ". " +
    finnishMonths[now.getMonth()] +
    "KUUTA " +
    now.getFullYear();

  ! sennuEvents.length && axios
    .get('https://sennu-backend.herokuapp.com/')
    .then(response => {setSennuEvents(JSON.parse(response.data))})
    .catch(e => console.err(e));

  const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.textColor};
    }
  `

  const AppContainer = styled.div`
    font-family: 'Varela Round', sans-serif;
    font-size: 24px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 20px;
    width: 100%;
  `

  const SectionTitle = styled.div`
    color: ${props => props.theme.colors.calendarTextColor};
    margin-bottom: 30px;
    text-align: left;
  `

  const Time = styled.td`
    color: ${props => props.theme.colors.calendarTextColor};
    min-width: 180px;
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
      <AppContainer>
        <GlobalStyle />
        <div id="left">
          NYT ON {timeOfTheDay(now)}<br />
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
                  {moment(event.start).format("D")}. {finnishMonths[moment(event.start).format("M")-1]}KUUTA
                  <br />
                  KELLO {moment(event.start).format("HH.mm")}
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
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
