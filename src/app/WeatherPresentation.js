import TextWeather from "./TextWeather"
import WeatherGraph from "./WeatherGraph"
import GraphSettings from "./GraphSettings"
import styles from './weatherApp.module.css'
import { useEffect, useState } from 'react'

export default function WeatherPresentation({ day, locationString, timePeriod }) {
  console.log('day in WeatherPresentation: ', day);
  const [graphSettings, setGraphSettings] = useState({
    lines: [
      { metric: 'temp', id: 'Temp', color: 'hsl(0, 70%, 50%)' },
      { metric: 'humidity', id: 'Humidity', color: 'hsl(120, 70%, 50%)' },
      { metric: 'windspeed', id: 'Wind Speed', color: 'hsl(240, 70%, 50%)' },
      { metric: 'cloudcover', id: 'Cloud Cover', color: 'hsl(60, 70%, 50%)' },
      { metric: 'precip', id: 'Precip', color: 'hsl(300, 70%, 50%)' }
    ]
  });
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
    const url = makeWeatherRequestURL(locationString, day);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      });
  }

  useEffect(() => {
    getData();
    console.log('getting new data');
    console.log('location: ', locationString)
    console.log('day: ', day)
  }, [locationString, day]);

  let content;

  if (weatherData) {
    content = (<div className={styles.weatherPresentation}>
      <TextWeather weatherData={weatherData} />
      <WeatherGraph weatherData={weatherData} timePeriod={timePeriod} graphSettings={graphSettings} />
      <GraphSettings graphSettings={graphSettings} setGraphSettings={setGraphSettings} />
    </div>)
  } else {
    content = <p>Loading...</p>
  }

  console.log(content);

  return content;
}