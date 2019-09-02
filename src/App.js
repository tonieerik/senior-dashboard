import React from 'react';
import axios from 'axios';
import moment from 'moment';
import AnalogClock from "./AnalogClock";
import useInterval from "./useInterval";

import './App.css';

const finnishMonths = [
  "tammi",
  "helmi",
  "maalis",
  "huhti",
  "touko",
  "kesä",
  "heinä",
  "elo",
  "syys",
  "loka",
  "marras",
  "joulu"
];

const finnishDays = [
  "sunnuntai",
  "maanantai",
  "tiistai",
  "keskiviikko",
  "torstai",
  "perjantai",
  "lauantai"
];

const timeOfTheDay = now => {
  if (now.getHours() < 7) {
    return "yö";
  } else if (now.getHours() < 10) {
    return "aamu";
  } else if (now.getHours() < 18) {
    return "päivä";
  } else {
    return "ilta";
  }
}

const App = () => {
  const [sennuEvents, setSennuEvents] = React.useState([]);

  const now = new Date();
  const finnishDay = finnishDays[now.getDay()];
  const finnishDate =
    now.getDate() +
    ". " +
    finnishMonths[now.getMonth()] +
    "kuuta " +
    now.getFullYear();

  ! sennuEvents.length && axios
    .get('https://sennu-backend.herokuapp.com/')
    .then(response => {setSennuEvents(JSON.parse(response.data))})
    .catch(e => console.err(e));

  return (
    <div className="App">
      <div id="left">
        Nyt on {timeOfTheDay(now)}<br />
        <AnalogClock height={300} width={300} now={now} showTicks />
        <div className="dayInfo">
          {finnishDay} {finnishDate}<br />
          kello {now.getHours()}.{('0'+now.getMinutes()).slice(-2)}
        </div>
      </div>
      <div id="right">
        <div className="section-title">Kalenteri</div>
        <table><tbody>
        {
          sennuEvents.map(event => 
            <tr>
              <td className="time">
                {moment(event.start).format("D")}. {finnishMonths[moment(event.start).format("M")-1]}kuuta
                <br />
                kello {moment(event.start).format("HH.mm")}
              </td>
              <td>
                {event.title} {event.location ? '/' : ''} {event.location}
                <br />
                <span className="description">{event.description}</span>
              </td>
            </tr>
          )
        }
        </tbody></table>
      </div>
    </div>
  );
}

export default App;
