import styles from './weatherApp.module.css';

export default function GraphSettings({ graphSettings, setGraphSettings }) {

  /*
    I want to make this a more general method of managing the graph.
    If you have something you want to modify in the graph, put it here with the possible states, and it will be rendered.
  */

  const lines = [
    { metric: 'temp', id: 'Temp', color: 'hsl(0, 70%, 50%)' },
    { metric: 'humidity', id: 'Humidity', color: 'hsl(120, 70%, 50%)' },
    { metric: 'windspeed', id: 'Wind Speed', color: 'hsl(240, 70%, 50%)' },
    { metric: 'cloudcover', id: 'Cloud Cover', color: 'hsl(60, 70%, 50%)' },
    { metric: 'precip', id: 'Precip', color: 'hsl(300, 70%, 50%)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
      {lines.map(({ metric, id, color }) => (
        <div key={id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
          <button
            className={styles.graphSettingsButton}
            // if the line is already in the graph, remove it
            onClick={e => {
              console.log('button ', id, ' clicked')
              if (graphSettings.lines.some(line => line.id === id)) {
                if (graphSettings.lines.length === 1) {
                  console.log('cannot remove last line')
                  return;
                }
                console.log('removing ', id, ' from graph')
                setGraphSettings({
                  lines: graphSettings.lines.filter(line => line.id !== id)
                });
              } else {
                console.log('adding ', id, ' to graph')
                setGraphSettings({
                  lines: [...graphSettings.lines, { metric, id, color }]
                });
              }
            }}
          >
            {id}
          </button>
        </div>
      ))
      }
      { }
    </div >
  );
}

function GraphCheckBoxes({ lines, graphSettings, setGraphSettings }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {lines.map(({ metric, id, color }) => (
        <div key={id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <input
            type='checkbox'
            checked={graphSettings.lines.some(line => line.id === id)}
            onChange={e => {
              if (e.target.checked) {
                setGraphSettings({
                  lines: [...graphSettings.lines, { metric, id, color }]
                });
              } else {
                setGraphSettings({
                  lines: graphSettings.lines.filter(line => line.id !== id)
                });
              }
            }}
          />
          <label style={{ color: color }}>{id}</label>
        </div>
      ))}
    </div>
  );
}

function GraphButtons({ lines, graphSettings, setGraphSettings }) {
}