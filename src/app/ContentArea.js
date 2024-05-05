'use client';
import styles from './weatherApp.module.css';
import LocationInput from './LocationInput';
import TimeInput from './TimeInput';
import { useState, useEffect } from 'react';
import WeatherPresentation from './WeatherPresentation';
import Other from './Other';

export default function ContentArea() {

  const [locationString, setLocationString] = useState('33 Main St, Boston, MA');
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [timePeriod, setTimePeriod] = useState('5PM-9PM');
  const [curWeek, setCurWeek] = useState(0);

  let weeks = getWeeks(dayOfWeek);

  function getWeeks(dayOfWeek) {
    let today = new Date();
    let day = today.getDay();
    let targetDate = today.getDate() + (dayOfWeek - day);
    let weeks = [];
    for (let i = 0; i < 3; i++) {
      let date = new Date();
      date.setDate(targetDate + 7 * i);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();
      let dateString = year + '-' + month + '-' + day;
      weeks.push(dateString);
    }
    console.log(weeks)
    return weeks;
  }

  useEffect(() => {
    weeks = getWeeks(dayOfWeek);
  }, [dayOfWeek]);

  function backArrow() {
    if (curWeek > 0) {
      setCurWeek(curWeek - 1);
    }
  }

  function frontArrow() {
    if (curWeek < weeks.length - 1) {
      setCurWeek(curWeek + 1);
    }
  }

  function printEverything() {
    console.log('locationString: ' + locationString);
    console.log('dayOfWeek: ' + dayOfWeek);
    console.log('timePeriod: ' + timePeriod);
  }

  return (
    <div className={styles.contentArea}>
      <div className={styles.inputArea}>
        <div className={styles.locationInput}>
          <LocationInput
            locationString={locationString}
            setLocationString={setLocationString}
          />
        </div>
        <div className={styles.timeInput}>
          <TimeInput
            dayOfWeek={dayOfWeek}
            setDayOfWeek={setDayOfWeek}
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
          />
        </div>
      </div>
      <div className={styles.controlArea}>
        <div className={styles.backArrow}>
          <button onClick={backArrow}>Back</button>
        </div>
        <div className={styles.frontArrow}>
          <button onClick={frontArrow}>Front</button>
        </div>
      </div>
      <div className={styles.weatherDisplay}>
        <div className={styles.weatherBox}>
          {weeks && <WeatherPresentation day={weeks[curWeek]} locationString={locationString} timePeriod={timePeriod} />}
        </div>
      </div>
    </div>
  )
}