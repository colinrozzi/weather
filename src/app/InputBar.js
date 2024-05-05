import styles from './inputBar.module.css'
import LocationInput from './LocationInput';
import TimeInput from './TimeInput';

export default function InputBar({ locationString, setLocationString, dayOfWeek, setDayOfWeek, timePeriod, setTimePeriod }) {

  function print() {
    console.log(locationString);
  }

  function updateString(e) {
    setLocationString(e.target.value);
  }

  function updateDate(e) {
    setDate(e.target.value);
  }

  function updateTimePeriod(e) {
    setTimePeriod(e.target.value);
  }

  function getCoords(location) {
    opencage
      .geocode({ q: location, key: '7ab51c996d5141eea8317501d9374a5d' })
      .then(data => {
        console.log(JSON.stringify(data));
        if (data.status.code == 200) {
          if (data.results.length > 0) {
            var place = data.results[0];
            console.log(place.formatted);
          }
        } else if (data.status.code == 402) {
          console.log('hit free trial daily limit');
          console.log('become a customer: https://opencagedata.com/pricing');
        } else {
          // other possible response codes:
          // https://opencagedata.com/api#codes
          console.log('error', data.status.message);
        }
      });
  }

  function getWeather(location, date1) {
    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
    url = url + '/' + location;
    url = url + '/' + date1;
    url = url + '?key=VKC3G5F2AEAV3XV6TWPAGVZUW'
    console.log(url);
    return url;
  }

  function offlineWeather() {
    const url = '/api/dataHolder';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(response);
        setWeatherData(data);
      }
      )
  }

  const old = (
    <>
      <p>date:</p>
      <input type="date" onChange={updateDate} />
      <p>time:</p>
      <select value={timePeriod} onChange={updateTimePeriod}>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>
      <button onClick={doit}>Do it</button>
      <button onClick={weather} > weatehr</button >
    </>
  );

  function weather() {
    const url = getWeather(locationString, date);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data)
      });
  }

  function doit() {
    console.log(locationString);
    console.log(date);
    console.log(timePeriod);
  }
  return (
    <div className={styles.inputBox}>
      <LocationInput
        locationString={locationString}
        setLocationString={setLocationString}
      />

      <TimeInput
        dayOfWeek={dayOfWeek}
        setDayOfWeek={setDayOfWeek}
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
      />
    </div>
  );
}