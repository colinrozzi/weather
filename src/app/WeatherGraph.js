// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineGraph = ({ data, graphSettings, tickValues, yMin, yMax, timePeriod }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 100, right: 110, bottom: 50, left: 60 }}
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
    axisLeft={graphSettings.axisLeft ? graphSettings.axisLeft :
      {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -40,
        legendPosition: 'middle',
        truncateTickAt: 0
      }}
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
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
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
const RightAxisLine = ({ data, yMin, yMax }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{
      type: 'point'
    }}
    yScale={{
      type: 'linear',
      min: yMin,
      max: yMax,
      stacked: true,
      reverse: false
    }}
    curve="natural"
    axisTop={null}
    axisRight={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'temperature',
      legendOffset: 50,
      legendPosition: 'middle',
      truncateTickAt: 0
    }}
    axisBottom={null}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    lineWidth={3}
    enablePoints={false}
    pointSize={10}
    useMesh={true}
    legends={
      [
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
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
  const graphPeriod = timePeriod.split('-');
  const startTime = convertTo24Hour(graphPeriod[0]);
  const endTime = convertTo24Hour(graphPeriod[1]);

  console.log(weatherData);
  const data = makeData(weatherData, graphSettings.lines, startTime, endTime);

  const tickModifier = Math.ceil((endTime - startTime) / 5);
  const tickValues = data[0].data.map((d, i) => { if (i % tickModifier === 0) return d.x; else return false; }).filter(x => x !== false);

  console.log(weatherData);
  console.log(data);
  return (
    <div style={{ height: 500, width: 500 }}>
      <div style={{ position: 'absolute', width: 500, height: 500 }}>
        <LineGraph graphSettings={graphSettings} data={data} tickValues={tickValues} yMin={0} yMax={100} timePeriod={graphPeriod} />
      </div>
    </div>
  )
}