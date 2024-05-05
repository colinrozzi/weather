'use client'
const opencage = require('opencage-api-client');
const { useState } = require('react');
import InputBar from './InputBar';

export default function Basic() {

  const [locationString, setLocationString] = useState('33 carriage lane, Hanover, NH')
  const [date, setDate] = useState('2024-03-05');
  const [dayOfWeek, setDayOfWeek] = useState('Friday');
  const [timePeriod, setTimePeriod] = useState('Morning');
  const [weatherData, setWeatherData] = useState({});

  return (
    <div>
      <InputBar
        locationString={locationString}
        setLocationString={setLocationString}
        dayOfWeek={dayOfWeek}
        setDayOfWeek={setDayOfWeek}
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
      />
    </div>
  );
}