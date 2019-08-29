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

function App() {
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
  const dayOrNight = now.getHours() > 6 && now.getHours() < 23 ? "Päivä" : "Yö";

  return (
    <div className="App">
      <div id="left">
        NYT ON {dayOrNight}
        <AnalogClock height={500} width={500} now={now} showTicks />
        <br />
        {finnishDay} {finnishDate}<br />
        klo {now.getHours()}.{('0'+now.getMinutes()).slice(-2)}
      </div>
      <div id="right">
      
      </div>
    </div>
  );
}

export default App;
