import { Component, useState } from "react";
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
import './bigCalendar.css'

export function BigCalendar() {
    const [count, setCount] = useState(0);
    const localizer = dayjsLocalizer(dayjs);
  return (
    <div>
      <Calendar 
        style={{ height: 800, width: 1700 }}
        localizer={localizer}
      />
    </div>
  );
}

