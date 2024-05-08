import TextWeather from "./TextWeather"
import WeatherGraph from "./WeatherGraph"
import GraphSettings from "./GraphSettings"
import styles from './weatherApp.module.css'
import { useEffect, useState } from 'react'

export default function WeatherPresentation({ day, locationString, timePeriod, screenRatio }) {

  const [error, setError] = useState(null);

  const [graphSettings, setGraphSettings] = useState({
    lines: [
      { metric: 'temp', id: 'Temp', color: 'hsl(0, 70%, 50%)' },
    ]
  });
  const [weatherData, setWeatherData] = useState(null);

  async function getData() {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locationString: locationString, day: day })
    });

    console.log('api response: ', response)

    if (response.status == 200) {
      const data = await response.json();
      console.log('setting data');
      console.log(data)
      setWeatherData(data);
    } else {
      console.log('failed ')
      setError('Failed to fetch data')
    }
  }

  useEffect(() => {
    try {
      getData();
    } catch (e) {
      console.log('error')
      console.log(e);
      setError(e);
    }
  }, [locationString, day]);

  if (weatherData) {
    return (<div className={styles.weatherPresentation}>
      <TextWeather weatherData={weatherData} />
      <WeatherGraph weatherData={weatherData} timePeriod={timePeriod} graphSettings={graphSettings} screenRatio={screenRatio} />
      <GraphSettings graphSettings={graphSettings} setGraphSettings={setGraphSettings} />
    </div>)
  } else {
    if (error) {
      return <div className={styles.weatherError}>{error}</div>
    } else {
      return <p>Loading...</p>
    }
  }
}