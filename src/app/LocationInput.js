import styles from './weatherApp.module.css';
import { useState } from 'react';
import { locationSVG } from './Icons';

export default function LocationInput({ locationString, setLocationString }) {
  const [inputValue, setInputValue] = useState(locationString);

  function updateInputValue(e) {
    setInputValue(e.target.value);
  }

  function updateLocationString(e) {
    setLocationString(inputValue);
  }
  return (
    <div className={styles.locationInput}>
      {locationSVG}
      <input type="text" value={inputValue} onChange={updateInputValue} onBlur={updateLocationString} />
    </div>
  )
}