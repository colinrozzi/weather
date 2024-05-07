// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'
import styles from './weatherApp.module.css'
import { useEffect, useState } from 'react';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineGraph = ({ data, graphSettings, tickValues, yMin, yMax, timePeriod }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 10, right: 15, bottom: 100, left: 15 }}
    xScale={{
      type: 'point',
    }}
    yScale={{
      type: 'linear',
      min: yMin,
      max: yMax,
      stacked: false,
      reverse: false
    }}
    curve="natural"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickValues: tickValues,
      legendOffset: 40,
      legendPosition: 'middle',
    }}
    axisLeft={null}
    enableGridX={true}
    gridXValues={timePeriod}
    enableGridY={false}
    lineWidth={3}
    enablePoints={false}
    pointSize={10}
    useMesh={true}
    legends={
      [
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 50,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 75,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 5,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
  />
)

function convertDatetime(dateString) {
  const parts = dateString.split(':');
  const hour = Number(parts[0]);
  if (hour < 12) {
    if (hour === 0) return '12AM';
    return hour + 'AM';
  } else {
    if (hour === 12) return '12PM';
    return hour - 12 + 'PM';
  }
}

function makeData(weatherData, lineObj, startTime, endTime) {
  const data = [];

  lineObj.forEach(({ metric, id, color }) => {
    const metricData = weatherData.days[0].hours.map(hour => {
      if (hour.datetime.split(':')[0] >= (startTime - 1) && hour.datetime.split(':')[0] <= (endTime + 1)) {
        return {
          x: convertDatetime(hour.datetime),
          y: hour[metric]
        }
      } else {
        return false;
      }
    }).filter(x => x !== false);
    data.push({
      id: id,
      color: color,
      data: metricData
    });
  });

  return data;
}

function convertTo24Hour(time) {
  const signifier = time.slice(-2);
  const hour = Number(time.slice(0, -2));
  if (signifier === 'AM') {
    if (hour === 12) return 0;
    return hour;
  } else {
    if (hour === 12) return 12;
    return hour + 12;
  }
}

export default function WeatherGraph({ weatherData, timePeriod, graphSettings }) {
  const [graph, setGraph] = useState(null);

  const graphPeriod = timePeriod.split('-');
  const startTime = convertTo24Hour(graphPeriod[0]);
  const endTime = convertTo24Hour(graphPeriod[1]);

  console.log(weatherData);
  const data = makeData(weatherData, graphSettings.lines, startTime, endTime);

  const tickModifier = Math.ceil((endTime - startTime) / 5);
  const tickValues = data[0].data.map((d, i) => { if (i % tickModifier === 0) return d.x; else return false; }).filter(x => x !== false);

  // there is an error that it is somehow not updating on state changes anymore
  useEffect(() => {
    setGraph(<LineGraph graphSettings={graphSettings} data={data} tickValues={tickValues} yMin={0} yMax={100} timePeriod={graphPeriod} />);
  }, [weatherData, timePeriod, graphSettings]);

  console.log(weatherData);
  console.log(data);
  return (
    <div className={styles.weatherGraphContainer}>
      <div className={styles.weatherGraphBox}>
        {graph ? graph : 'Loading...'}
      </div>
    </div>
  )
}