import styles from './weatherApp.module.css';
import { clockSVG } from './Icons';

export default function TimeInput({ dayOfWeek, setDayOfWeek, timePeriod, setTimePeriod }) {
  function updateDayOfWeek(e) {
    setDayOfWeek(e.target.value);
  }
  function updateTimePeriod(e) {
    setTimePeriod(e.target.value);
  }
  return (
    <div className={styles.timeInput}>
      <div className={styles.dayOfWeekInput}>
        {clockSVG}
        <select value={dayOfWeek} onChange={updateDayOfWeek} style={{}}>
          <option value={0}>Every Sunday</option>
          <option value={1}>Every Monday</option>
          <option value={2}>Every Tuesday</option>
          <option value={3}>Every Wednesday</option>
          <option value={4}>Every Thursday</option>
          <option value={5}>Every Friday</option>
          <option value={6}>Every Saturday</option>
        </select>
      </div>
      <select value={timePeriod} onChange={updateTimePeriod} style={{}}>
        <option value='8AM-12PM'>Morning</option>
        <option value='12PM-5PM'>Afternoon</option>
        <option value='5PM-9PM'>Evening</option>
        <option value='1AM-10PM'>All Day</option>
      </select>
    </div >
  )
}