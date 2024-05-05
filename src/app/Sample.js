import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';



export default function WeatherPresentation({ weatherData }) {
  const temps = weatherData.days[0].hours.map(hour => hour.temp);
  const humidity = weatherData.days[0].hours.map(hour => hour.humidity);
  const times = weatherData.days[0].hours.map(hour => hour.datetime);

  const data = {
    labels: times,
    datasets: [
      {
        label: 'Temperature',
        data: temps,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Humidity',
        data: humidity,
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y-axis-2',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'hA',
          },
        },
      },
      'y-axis-1': {
        type: 'linear',
        display: true,
        position: 'left',
      },
      'y-axis-2': {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}