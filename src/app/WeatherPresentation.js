import TextWeather from "./TextWeather"
import WeatherGraph from "./WeatherGraph"
import GraphSettings from "./GraphSettings"
import styles from './weatherApp.module.css'
import { useEffect, useState } from 'react'

export default function WeatherPresentation({ day, locationString, timePeriod, screenRatio }) {

  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);

  console.log('day in WeatherPresentation: ', day);
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

    console.log('response: ', response)
    console.log('status', response.status === 200)

    if (response.status == 200) {
      const data = await response.json();
      console.log('setting data');
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

  useEffect(() => {
    if (weatherData) {
      setContent(<div className={styles.weatherPresentation}>
        <TextWeather weatherData={weatherData} />
        <WeatherGraph weatherData={weatherData} timePeriod={timePeriod} graphSettings={graphSettings} screenRatio={screenRatio} />
        <GraphSettings graphSettings={graphSettings} setGraphSettings={setGraphSettings} />
      </div>)
    } else {
      if (error) {
        setContent(<div className={styles.weatherError}>{error}</div>)
      } else {
        setContent(<p>Loading...</p>)
      }
    }
  }, [weatherData, graphSettings, error, screenRatio]);

  console.log(content);

  return content;
}