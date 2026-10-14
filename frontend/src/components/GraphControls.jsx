function GraphControls({
    selectedMeasurements, setSelectedMeasurements, timeRange, setTimeRange
}) {

  // Available measurements
  const measurements = [
    {name: 'Battery Current', color: '#2563eb'}, 
    {name: 'Battery Voltage', color: '#16a34a'},
    {name: 'Battery State of Charge', color: '#d97706'},
    {name: 'Rectifier Current', color: '#9333ea'},
    {name: 'Load Current', color: '#dc2626'},
    {name: 'Battery Discharge', color: '#e5f508'},
  ]

  // Select or deselect measurements
  const handleMeasurementChange = (measurement) => {
    if (selectedMeasurements.includes(measurement)) {
        setSelectedMeasurements(
            selectedMeasurements.filter((item) => item !== measurement)
        )
    } else {
        setSelectedMeasurements ([
            ...selectedMeasurements, 
            measurement
        ])
    }
  }

  return (
    <div className="graph-controls">
      <h3>Y-Axis Measurements</h3>
      <div className="graph-legend">
        {measurements.map((measurement) => (
          <label key={measurement.name}>
            <span 
                style={{
                    display: 'inline-block',
                    width: '18px',
                    height: '5px',
                    backgroundColor: measurement.color,
                    borderRadius: '3px'
                }}
            />
            <input
              type="checkbox"
              checked={selectedMeasurements.includes(measurement.name)}
              onChange={() => handleMeasurementChange(measurement.name)}
            />
            {measurement.name}
          </label>
        ))}
      </div>
      <h3>X-Axis Time Range</h3>
      <div className="graph-time-options">
        <label>
            <input 
                type="radio"
                name="overview-time-range"
                checked={timeRange === '24 Hours'}
                onChange={() => setTimeRange('24 Hours')}
            />
            24 Hours
        </label>
        <label>
            <input 
                type="radio"
                name="overview-time-range"
                checked={timeRange === '12 Hours'}
                onChange={() => setTimeRange('12 Hours')}
            />
            12 Hours
        </label>
        <label>
            <input 
                type="radio"
                name="overview-time-range"
                checked={timeRange === '10 Minutes'}
                onChange={() => setTimeRange('10 Minutes')}
            />
            10 Minutes
        </label>
      </div>
    </div>
  )
}

export default GraphControls