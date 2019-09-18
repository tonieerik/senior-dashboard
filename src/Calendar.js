import React from 'react';
import moment from 'moment';

const weekdayshort = moment.weekdaysShort();

let weekdayshortname = weekdayshort.map(day => {
  return (
    <th key={day} className="week-day">
     {day}
    </th>
  );
});

export default () => {
  const [dateObject, setDateObject] = React.useState(moment());

  const firstDayOfMonth = () => {
    let firstDay = moment(dateObject)
                 .startOf("month")
                 .format("d"); 
   return firstDay;
  };

  return (
    <div>
      <h2>Calendar</h2>
      {weekdayshortname}
      {firstDayOfMonth()}
      {moment().startOf('month').format('d')}
    </div>
  );
}
