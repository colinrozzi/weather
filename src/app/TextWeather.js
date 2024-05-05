import styles from './weatherApp.module.css';
import { sunSvg, cloudSvg, rainSvg } from './Icons';

function formatDate(date) {
  date.setDate(date.getDate() + 1);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[date.getDay()];

  let dateOfMonth = date.getDate();
  let suffix = 'th';

  if (dateOfMonth === 1 || dateOfMonth === 21 || dateOfMonth === 31) {
    suffix = 'st';
  } else if (dateOfMonth === 2 || dateOfMonth === 22) {
    suffix = 'nd';
  } else if (dateOfMonth === 3 || dateOfMonth === 23) {
    suffix = 'rd';
  }

  return `${dayOfWeek} the ${dateOfMonth}${suffix}`;
}

export default function TextWeather({ weatherData }) {

  const conditions = weatherData.days[0].conditions;
  const temperature = weatherData.days[0].temp;
  const wind = weatherData.days[0].windspeed;
  const rainChance = weatherData.days[0].precipprob;

  let rainString;
  if (weatherData.days[0].precipprob === 0) { rainString = 'no rain'; }
  else { rainString = rainChance + '% chance rain'; }

  const dateString = formatDate(new Date(weatherData.days[0].datetime));


  let selectedIcon;
  if (weatherData.days[0].icon === 'rain') {
    selectedIcon = rainSvg;
  } else if (weatherData.days[0].icon === 'cloud') {
    selectedIcon = cloudSvg;
  } else {
    selectedIcon = sunSvg;
  }

  const dateElement = <h3>{dateString}</h3>
  const tempConditionsElement = <p>{conditions} {temperature}℉</p>
  const windElement = <p style={{ fontSize: '0.75rem' }}>winds {wind}mph</p>
  const rainElement = <p style={{ fontSize: '0.75rem' }}>{rainString}</p>
  const weatherIcon = <div style={{ width: '50px', height: '50px' }}>{selectedIcon}</div>

  return (
    <div className={styles.textWeather}>
      <div className={styles.dateElement}>
        {dateElement}
      </div>
      <div className={styles.weatherContent}>
        <div className={styles.weatherLogo}>
          {weatherIcon}
        </div>
        <div className={styles.weatherInfo}>
          {tempConditionsElement}
          {windElement}
          {rainElement}
        </div>
      </div>
    </div>
  );
}