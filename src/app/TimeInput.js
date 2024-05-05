import styles from './weatherApp.module.css';

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
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
          <path d="m18.602 81.398c0.89844 0.89844 0.89844 2.3477 0 3.25-0.89844 0.89844-2.3477 0.89844-3.25 0-4.5078-4.5078-8.1445-9.9062-10.637-15.918-2.3945-5.7812-3.7188-12.109-3.7188-18.73 0-13.531 5.4844-25.777 14.352-34.648 8.8672-8.8672 21.117-14.352 34.648-14.352s25.777 5.4844 34.648 14.352c8.8672 8.8672 14.352 21.117 14.352 34.648s-5.4844 25.777-14.352 34.648c-8.8672 8.8672-21.117 14.352-34.648 14.352-1.2695 0-2.2969-1.0273-2.2969-2.2969s1.0273-2.2969 2.2969-2.2969c12.262 0 23.363-4.9727 31.402-13.004 8.0352-8.0352 13.004-19.137 13.004-31.402 0-12.262-4.9727-23.363-13.004-31.402-8.0352-8.0352-19.137-13.004-31.402-13.004-12.262 0-23.363 4.9727-31.402 13.004-8.0352 8.0352-13.004 19.137-13.004 31.402 0 6.0312 1.1953 11.766 3.3555 16.988 2.2422 5.418 5.543 10.305 9.6484 14.41zm29.102-61.422c0-1.2695 1.0273-2.2969 2.2969-2.2969s2.2969 1.0273 2.2969 2.2969v23.59c0 2.4414-0.61719 4.7344-1.7734 6.7305-1.1484 1.9922-2.8242 3.6719-4.9531 4.8984l0.003907 0.003907-13.84 7.9883c-1.0938 0.63281-2.4961 0.26172-3.1328-0.83594-0.63281-1.0938-0.26172-2.5 0.83594-3.1328l13.84-7.9883 0.003906 0.007812 0.007812-0.007812c1.4141-0.81641 2.5234-1.918 3.2734-3.2148 0.74219-1.2891 1.1445-2.8047 1.1445-4.4531v-23.59z" />
        </svg>

        <select value={dayOfWeek} onChange={updateDayOfWeek}>
          <option value='Monday'>Every Monday</option>
          <option value='Tuesday'>Every Tuesday</option>
          <option value='Wednesday'>Every Wednesday</option>
          <option value='Thursday'>Every Thursday</option>
          <option value='Friday'>Every Friday</option>
          <option value='Saturday'>Every Saturday</option>
          <option value='Sunday'>Every Sunday</option>
        </select>
      </div>
      <select value={timePeriod} onChange={updateTimePeriod}>
        <option value='8AM-12PM'>Morning</option>
        <option value='12PM-5PM'>Afternoon</option>
        <option value='5PM-9PM'>Evening</option>
        <option value='1AM-10PM'>All Day</option>
      </select>
    </div>
  )
}