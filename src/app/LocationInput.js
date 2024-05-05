import styles from './weatherApp.module.css';
import { useState } from 'react';
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
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{}} viewBox="-5.0 -10.0 110.0 135.0">
        <g>
          <path d="m48.672 94.77c-0.070313-0.10938-7.0586-11.379-13.953-24.379-9.3438-17.617-14.082-29.91-14.082-36.535 0-7.8711 3.1133-15.277 8.6016-20.766 14.723-14.723 39.719-9.8164 47.816 9.3359 1.5312 3.6211 2.3086 7.4688 2.3086 11.43 0 13.773-20.844 49.195-28.035 60.914-0.625 0.99219-2.0547 0.97266-2.6562 0zm1.3281-87.152c-14.469 0-26.242 11.77-26.242 26.242 0 12.508 19.719 46.312 26.238 57.094 6.5742-10.863 26.238-44.625 26.238-57.094 0.003906-14.473-11.766-26.242-26.234-26.242z" />
          <path d="m50 48.602c-9.168 0-16.66-7.4141-16.66-16.66 0-9.1875 7.4375-16.66 16.66-16.66 9.2031 0 16.66 7.4531 16.66 16.66 0 9.1758-7.418 16.66-16.66 16.66zm0-30.195c-7.4609 0-13.535 6.0703-13.535 13.535s6.0703 13.535 13.535 13.535 13.535-6.0703 13.535-13.535-6.0742-13.535-13.535-13.535z" />
        </g>
      </svg>
      <input style={{ fontSize: '1.17rem', border: 'none', height: '25px' }} type="text" value={inputValue} onChange={updateInputValue} onBlur={updateLocationString} />
    </div>
  )
}