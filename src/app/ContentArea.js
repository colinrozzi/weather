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

  const forwardArrowSVG = (
    <svg version="1.1" x="0px" y="0px" viewBox="0 0 64 80" style={{ enableBackground: 'new 0 0 64 64' }}><g><g><path d="M18.47,64c-0.56,0-1.12-0.2-1.56-0.61c-0.95-0.86-1.01-2.33-0.15-3.28L42.39,32L16.76,3.88    c-0.86-0.95-0.79-2.41,0.15-3.28c0.95-0.86,2.41-0.79,3.28,0.15l27.06,29.68c0.81,0.88,0.81,2.24,0,3.12L20.19,63.24    C19.73,63.75,19.1,64,18.47,64z" /></g></g>
    </svg>
  )

  const backArrowSVG = (
    <svg version="1.1" x="0px" y="0px" viewBox="0 0 64 80" style={{ enableBackground: 'new 0 0 64 64;' }} ><g><g><path d="M45.53,64c-0.63,0-1.26-0.26-1.71-0.76L16.76,33.56c-0.81-0.88-0.81-2.24,0-3.12L43.81,0.76    c0.86-0.95,2.33-1.01,3.28-0.15c0.95,0.86,1.01,2.33,0.15,3.28L21.61,32l25.63,28.12c0.86,0.95,0.79,2.41-0.15,3.28    C46.65,63.8,46.09,64,45.53,64z" /></g></g>
    </svg>
  )

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
          <button onClick={backArrow}>{backArrowSVG}</button>
        </div>
        <div className={styles.frontArrow}>
          <button onClick={frontArrow}>{forwardArrowSVG}</button>
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