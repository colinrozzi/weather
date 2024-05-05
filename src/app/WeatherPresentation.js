import TextWeather from "./TextWeather"
import WeatherGraph from "./WeatherGraph"
import GraphSettings from "./GraphSettings"
import styles from './weatherApp.module.css'
import { useState } from 'react'

export default function WeatherPresentation({ weatherData, timePeriod }) {
  const [graphSettings, setGraphSettings] = useState({ lines: [{ id: 'Temperature', color: 'hsl(0, 70%, 50%)', metric: 'temp' }] });
  return (
    <div className={styles.weatherPresentation}>
      <TextWeather weatherData={weatherData} />
      <WeatherGraph weatherData={weatherData} timePeriod={timePeriod} graphSettings={graphSettings} />
      <GraphSettings graphSettings={graphSettings} setGraphSettings={setGraphSettings} />
    </div>
  )
}