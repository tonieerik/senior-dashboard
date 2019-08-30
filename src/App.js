import React from 'react';
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
  const [dummyState, setDummyState] = React.useState(0);
  useInterval(() => {
    setDummyState(dummyState + 1);
  }, 5000);

  const now = new Date();
  const finnishDay = finnishDays[now.getDay()];
  const finnishDate =
    now.getDate() +
    ". " +
    finnishMonths[now.getMonth()] +
    "kuuta " +
    now.getFullYear();

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
      
      </div>
    </div>
  );
}

export default App;
