'use client';
import styles from './weatherApp.module.css';
import LocationInput from './LocationInput';
import TimeInput from './TimeInput';
import { useState, useEffect } from 'react';
import WeatherPresentation from './WeatherPresentation';
import { backArrowSVG, forwardArrowSVG } from './Icons.js';

export default function ContentArea() {

  const [locationString, setLocationString] = useState('33 Main St, Boston, MA');
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [timePeriod, setTimePeriod] = useState('5PM-9PM');
  const [curWeek, setCurWeek] = useState(0);
  const [screenRatio, setScreenRatio] = useState(1);

  function getScreenRatio() {
    return Math.max(Math.floor(window.innerWidth / window.innerHeight), 1);
  }


  useEffect(() => {
    const handleResize = () => {
      setScreenRatio(getScreenRatio());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  let weeks = getWeeks(dayOfWeek);

  function getWeeks(dayOfWeek) {
    let today = new Date();
    let targetDate = today.getDate() + (dayOfWeek - today.getDay());
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
    console.log('backArrow')
    if (curWeek > 0) {
      console.log('moving back')
      setCurWeek(curWeek - 1);
    }
  }

  function frontArrow() {
    console.log('frontArrow')
    if (curWeek + (screenRatio - 1) < weeks.length - 1) {
      console.log('moving forward')
      setCurWeek(curWeek + 1);
    }
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
          {weeks ? (
            Array.from({ length: screenRatio }, (_, i) => i).map((i) => {
              return (
                <WeatherPresentation key={i} locationString={locationString} day={weeks[curWeek + i]} timePeriod={timePeriod} screenRatio={screenRatio} />
              )
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  )
}