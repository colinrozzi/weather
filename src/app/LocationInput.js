import styles from './weatherApp.module.css';
import { useState, useEffect, useRef } from 'react';
import { locationSVG } from './Icons';

export default function LocationInput({ locationString, setLocationString }) {
  const [inputValue, setInputValue] = useState(locationString);
  const inputRef = useRef();

  function updateInputValue(e) {
    setInputValue(e.target.value);

  }

  function updateLocationString(e) {
    setLocationString(inputValue);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.target.blur();
      }
    }

    const inputElem = inputRef.current;
    inputElem.addEventListener('keydown', handleKeyDown);

    return () => {
      inputElem.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <div className={styles.locationInput}>
      {locationSVG}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={updateInputValue}
        onBlur={updateLocationString} />
    </div>
  )
}