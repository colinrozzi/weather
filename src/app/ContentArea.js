'use client';
import styles from './weatherApp.module.css';
import LocationInput from './LocationInput';
import TimeInput from './TimeInput';
import { useState, useEffect } from 'react';
import WeatherPresentation from './WeatherPresentation';

export default function ContentArea() {

  const [locationString, setLocationString] = useState('33 Main St, Boston, MA');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [timePeriod, setTimePeriod] = useState('5PM-9PM');
  const [weatherData, setWeatherData] = useState(null);

  function makeWeatherRequestURL(location, date1) {
    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
    url = url + '/' + location;
    url = url + '/' + date1;
    url = url + '?key=VKC3G5F2AEAV3XV6TWPAGVZUW'
    console.log(url);
    return url;
  }

  function getData() {
    const url = makeWeatherRequestURL(locationString, '2024-03-05');
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      });
  }

  async function getSampleData() {
    const url = '/api';
    const res = await fetch(url)
    const data = await res.json();
    console.log(data);
    setWeatherData(data);
  }

  useEffect(() => {
    console.log('getting new data');
    getSampleData();
  }, [locationString, dayOfWeek]);

  function printEverything() {
    console.log('locationString: ' + locationString);
    console.log('dayOfWeek: ' + dayOfWeek);
    console.log('timePeriod: ' + timePeriod);
    console.log('weatherData: ' + weatherData);
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
      <div className={styles.weatherDisplay}>
        <div className={styles.weatherBox}>
          {weatherData && <WeatherPresentation weatherData={weatherData} timePeriod={timePeriod} />}
        </div>
      </div>
    </div>
  )
}