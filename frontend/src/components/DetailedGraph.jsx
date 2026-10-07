import './DetailedGraph.css'

// Temporary data used while developing the HMI. Later this will be replaced by historical data from the NextGen backend.

const graphData = {
  '24 Hours': {
    labels: ['12 AM','4 AM','8 AM','12 PM','4 PM','8 PM','Now'],
    'Battery Voltage': [53.8, 53.9, 54.0, 54.2, 54.1, 54.0, 54.2],
    'Battery Current': [18, 20, 22, 21, 24, 23, 24.5],
    'Battery State of Charge': [82, 81, 80, 79, 78, 77, 76],
    'Load Current': [20, 22, 21, 24, 23, 25, 24.5],
    'Rectifier Current': [25, 27, 26, 28, 30, 29, 31]
  },

  '12 Hours': {
    labels: ['12 Hr','10 Hr','8 Hr','6 Hr','4 Hr','2 Hr','Now'],
    'Battery Voltage': [54.0, 53.9, 54.1, 54.2, 54.0, 54.1, 54.2],
    'Battery Current': [21, 22, 23, 22, 24, 25, 24.5],
    'Battery State of Charge': [80, 79, 79, 78, 77, 77, 76],
    'Load Current': [21, 23, 22, 24, 26, 25, 24.5],
    'Rectifier Current': [27, 28, 27, 29, 30, 30, 31]
  },

  '10 Minutes': {
    labels: ['10 min','8 min','6 min','4 min','2 min','1 min','Now'],
    'Battery Voltage': [54.0, 54.1, 54.0, 54.2, 54.1, 54.3, 54.2],
    'Battery Current': [23, 24, 23.5, 24, 25, 24.8, 24.5],
    'Battery State of Charge': [76.2, 76.2, 76.1, 76.1, 76.0, 76.0, 76.0],
    'Load Current': [23, 24, 25, 24, 26, 25, 24.5],
    'Rectifier Current': [29, 30, 29, 31, 30, 32, 31]
  }
}

// ============================================================
// DETAILED GRAPH COMPONENT
// ============================================================

function DetailedGraph({
  selectedMeasurements,
  setSelectedMeasurements,
  xAxis,
  setXAxis
}) {

  // Currently selected Y-axis measurement
  const selectedMeasurement = selectedMeasurements[0]

  // SELECT DATA FOR CURRENT TIME RANGE

  const currentData =
    graphData[xAxis] || graphData['24 Hours']
  const values =
    currentData[selectedMeasurement] || []
  const labels =
    currentData.labels

  // CREATE GRAPH POINTS
  // Find minimum and maximum values so the selected measurement fits inside the graph.
  const minimumValue = Math.min(...values)
  const maximumValue = Math.max(...values)

  // Add a little space above and below the data.
  const rawRange = maximumValue - minimumValue || 1

  // Choose clean step size for Y-axis
  const roughStep = rawRange / 4
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)))
  const normalizedStep = roughStep / magnitude
  let niceStep
  if (normalizedStep <= 1) {
    niceStep = 1*magnitude
  } else if (normalizedStep <= 2) {
    niceStep = 2*magnitude
  } else if (normalizedStep <= 5) {
    niceStep = 5*magnitude
  } else {
    niceStep = 10*magnitude
  }

  // Round the graph limits to clean values
  const graphMinimum = Math.floor(minimumValue / niceStep) * niceStep
  const graphMaximum = Math.ceil(maximumValue / niceStep) * niceStep 
  const valueRange = graphMaximum - graphMinimum || 1  

  //Unit for the currently selectd measurement
  const measurementUnits = {
    'Battery Voltage' : 'V',
    'Battery Current' : 'A',
    'Battery State of Charge' : '%',
    'Load Current' : 'A',
    'Rectifier Current' : 'A'
  }
  const unit = measurementUnits[selectedMeasurement] || ''

  //Create 5 Y-axis labels from maximum to minimum
  const yAxisValues = Array.from({length: 5}, (_, index) => {
    return graphMaximum - (index*valueRange) / 4
  })

  // Convert the simulated values into SVG X/Y coordinates.
  const graphPoints = values
    .map((value, index) => {
      const x =
        60 +
        (index * 610) /
        (values.length - 1)
      const y =
        230 -
        ((value - graphMinimum) / valueRange) * 170
      return `${x},${y}`
    })
    .join(' ')
  return (
    <section className="detailed-graph">
      <h2>System Graph</h2>

      {/* Y-AXIS DROPDOWN */}

      <div className="y-axis-selector">
        <label htmlFor="y-axis">
          Y-Axis
        </label>
        <select
          id="y-axis"
          value={selectedMeasurement}
          onChange={(event) =>
            setSelectedMeasurements([
              event.target.value
            ])
          }
        >
          <option value="Battery Voltage">
            Battery Voltage
          </option>
          <option value="Battery Current">
            Battery Current
          </option>
          <option value="Battery State of Charge">
            Battery State of Charge
          </option>
          <option value="Load Current">
            Load Current
          </option>
          <option value="Rectifier Current">
            Rectifier Current
          </option>
        </select>
      </div>

      {/* GRAPH AREA */}
      <div className="detailed-graph-area">
        <svg
          className="detailed-graph-svg"
          viewBox="0 0 700 300"
          preserveAspectRatio="none"
        >
          {/* Horizontal grid lines */}
          <line x1="60" y1="40" x2="670" y2="40" />
          <line x1="60" y1="90" x2="670" y2="90" />
          <line x1="60" y1="140" x2="670" y2="140" />
          <line x1="60" y1="190" x2="670" y2="190" />
          <line x1="60" y1="240" x2="670" y2="240" />

          {/* Y-Axis value labels */}
          {yAxisValues.map((value, index) => {
            const y = 40 + index * 50
            return (
              <text
                key = {index}
                x = "52"
                y = {y+4}
                textAnchor = "end"
                className = "detailed-y-label"
              >
                {value.toFixed(1)} {unit}
              </text>
            )
          })}

          {/* Y-axis */}
          <line
            className="detailed-axis"
            x1="60"
            y1="25"
            x2="60"
            y2="250"
          />

          {/* X-axis */}
          <line
            className="detailed-axis"
            x1="60"
            y1="250"
            x2="670"
            y2="250"
          />

          {/* ACTUAL GRAPH LINE */}
          <polyline
            className="detailed-data-line"
            points={graphPoints}
          />

          {/* X-AXIS LABELS */}
          {labels.map((label, index) => {
            const x =
              60 +
              (index * 610) /
              (labels.length - 1)
            return (
              <text
                key={label}
                x={x}
                y="275"
                textAnchor="middle"
                className="detailed-x-label"
              >
                {label}
              </text>
            )
          })}
        </svg>
      </div>

      {/* X-AXIS TIME RANGE */}
      <div className="x-axis-selector">
        <label htmlFor="detailed-x-axis">
          X-Axis - Time
        </label>
        <select
          id="detailed-x-axis"
          value={xAxis}
          onChange={(event) =>
            setXAxis(event.target.value)
          }
        >
          <option value="24 Hours">
            24 Hours
          </option>
          <option value="12 Hours">
            12 Hours
          </option>
          <option value="10 Minutes">
            10 Minutes
          </option>
        </select>
      </div>
    </section>
  )
}

export default DetailedGraph