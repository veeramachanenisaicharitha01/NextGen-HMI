import './GraphValuesPanel.css'

function GraphValuesPanel({
  selectedMeasurements
}) {
  /* Temporary simulated values. - Later these values will come from the NextGen backend instead of being hardcoded here. */
  const systemValues = {
    Voltage: {
      value: 54.2,
      unit: 'V'
    },
    Current: {
      value: 24.5,
      unit: 'A'
    },
    Temperature: {
      value: 32,
      unit: '°C'
    },
    'Battery Voltage': {
      value: 54.2,
      unit: 'V'
    }
  }

  return (
    <aside className="graph-values-panel">
      <h2>System Values</h2>

      {/* VOLTAGE */}
      <div className="displayed-value">
        <span className="displayed-value-name">
          Voltage
        </span>
        <strong className="displayed-value-number">
          {systemValues.Voltage.value}{' '}
          {systemValues.Voltage.unit}
        </strong>
      </div>

      {/* CURRENT */}
      <div className="displayed-value">
        <span className="displayed-value-name">
          Current
        </span>
        <strong className="displayed-value-number">
          {systemValues.Current.value}{' '}
          {systemValues.Current.unit}
        </strong>
      </div>

      {/* TEMPERATURE */}
      <div className="displayed-value">
        <span className="displayed-value-name">
          Temperature
        </span>
        <strong className="displayed-value-number">
          {systemValues.Temperature.value}{' '}
          {systemValues.Temperature.unit}
        </strong>
      </div>

      {/* BATTERY VOLTAGE */}
      <div className="displayed-value">
        <span className="displayed-value-name">
          Battery Voltage
        </span>
        <strong className="displayed-value-number">
          {systemValues['Battery Voltage'].value}{' '}
          {systemValues['Battery Voltage'].unit}
        </strong>
      </div>
    </aside>
  )
}


export default GraphValuesPanel