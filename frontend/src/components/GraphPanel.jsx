import './GraphPanel.css'
import {simulatedHistory} from '../data/simulatedHistory'

// ============================================================
// MEASUREMENT CONFIGURATION
// ============================================================
// These are temporary simulated ranges. Replace them with confirmed hardware ranges later.

const measurementConfig = {
  'Battery Voltage': {key: 'voltage', min: 48, max: 60, unit: 'V', color: '#16a34a'},
  'Battery Current': {key: 'current', min: 0, max: 50, unit: 'A', color: '#2563eb'},
  'Battery State of Charge': {key: 'soc', min: 0, max: 100, unit: '%', color: '#d97706'},
  'Rectifier Current': {key: 'rectifierCurrent', min: 0, max: 50, unit: 'A', color: '#9333ea'},
  'Load Current': {key: 'loadCurrent', min: 0, max: 50, unit: 'A', color: '#dc2626'},
  'Battery Discharge': {key: 'batteryDischarge', min: 0, max: 20, unit: 'A', color: '#e5f508'}
}

// SIMULATED GRAPH DATA
// Define the duration of each time-range selection
const timeRangeMinutes = {
  '24 Hours': 24 * 60,
  '12 Hours': 12 * 60,
  '10 Minutes': 10
}

// ============================================================
// ACTIVITY GRAPH COMPONENT
// ============================================================

function GraphPanel({ selectedMeasurements = [], timeRange = '24 Hours' }) {
  // Use the latest recorded reading as the reference time
// while testing with our fixed simulated history.
  const latestTimestamp = Math.max(
    ...simulatedHistory.map((item) =>
      new Date(item.timestamp).getTime()
    )
  )

  // Calculate the beginning of the selected time range
  const selectedDuration = timeRangeMinutes[timeRange] ?? 24 * 60
  const rangeStart = latestTimestamp - selectedDuration * 60 * 1000

  // Keep only readings within the selected time range
  const graphData = simulatedHistory.filter((item) => {
    const readingTime = new Date(item.timestamp).getTime()
    return (
     readingTime >= rangeStart &&
      readingTime <= latestTimestamp
    )
  })

  // X-axis time intervals
  // Maximum number of points displayed on the graph
  const maxGraphPoints = 25

  //Select evenly spaced readings from the chosen time range
  const sampledGraphData =
    graphData.length <= maxGraphPoints
      ? graphData
        : Array.from({ length:maxGraphPoints }, (_, index) => {
          const dataIndex = Math.round((index / (maxGraphPoints - 1)) * (graphData.length - 1))
          return graphData[dataIndex]
        })
  // Convert the sampled timestamps into readable lines
  const graphDataWithTime = graphData.map((item) => {
    const timestamp = new Date(item.timestamp)
    return {
      ...item,
      time: timestamp.toLocaleTimeString('en-US', {
       hour: '2-digit',
       minute: '2-digit',
       hour12: false
      })
    }
  })
  console.log('Selected Time Range:', timeRange)
  // ============================================================
  // GRAPH DIMENSIONS
  // ============================================================

  const graphLeft = 55
  const graphRight = 485
  const graphTop = 25
  const graphBottom = 180
  const graphHeight = graphBottom - graphTop
  const graphWidth = graphRight - graphLeft
  // Get the selected measurement configurations
  const activeMeasurements = selectedMeasurements
    .filter((name) => measurementConfig[name])
    .map((name) => ({
      name,
      ...measurementConfig[name]
    }))
  // Display up to two numerical Y-axes. Additional measurements retain their own scaling and display their ranges in the legend below the graph.
  const leftAxis = activeMeasurements[0]
  const rightAxis = activeMeasurements[1]

  // CALCULATE GRAPH COORDINATES
  const getGraphPoints = (measurement) => {
    const values = graphDataWithTime.map(
    (item) => item[measurement.key]
  )
  const actualMin = Math.min(...values)
  const actualMax = Math.max(...values)
  const min = Math.min(measurement.min, actualMin)
  const max = Math.max(measurement.max, actualMax)
  const range = max - min || 1
  return graphDataWithTime
    .map((item, index) => {
      const x =
        graphLeft +
        (index / (graphDataWithTime.length - 1)) * graphWidth
      const normalizedValue =
        (item[measurement.key] - min) / range
      const y =
        graphBottom - normalizedValue * graphHeight
      return `${x},${y}`
    })
    .join(' ')
  }

  // Generate five labels for each Y-axis
  const getAxisLabels = (measurement) => {
    if (!measurement) return []
    const values = graphDataWithTime.map((item) => item[measurement.key])
    const min = Math.min(measurement.min, ...values)
    const max = Math.max(measurement.max, ...values)
    return Array.from({ length: 5 }, (_, index) => {
      const value = max - (index/4)*(max-min)
      const y = graphTop + (index / 4) * graphHeight
      return {
        value: Number(value.toFixed(2)),
        y
      }
    })
  }
  
  // RENDER GRAPH
  
  return (
    <section className="graph-section">
      <div className="graph-header">
        <h2>Activity</h2>
      </div>
      <div className="graph-container">
        <svg
          className="system-graph"
          viewBox="0 0 540 220"
          preserveAspectRatio="none"
        >
          {/* Horizontal grid lines */}
          {Array.from({ length: 5 }, (_, index) => {
            const y = graphTop + (index / 4) * graphHeight
            return (
              <line
                key={`grid-${index}`}
                x1={graphLeft}
                y1={y}
                x2={graphRight}
                y2={y}
              />
            )
          })}
          {/* Vertical grid lines aligned with X-axis timestamps */}
          {Array.from({length: 5}, (_, index) => {
            const x = graphLeft + (index / 4) * graphWidth
            return (
              <line
                key={`vertical-grid-${index}`}
                className="graph-grid-line"
                x1={x}
                y1={graphTop}
                x2={x}
                y2={graphBottom}
              />
            )
          })}
          {/* Left Y-axis */}
          <line
            className="graph-axis"
            x1={graphLeft}
            y1={graphTop}
            x2={graphLeft}
            y2={graphBottom}
          />
          {/* Right Y-axis */}
          <line
            className="graph-axis"
            x1={graphRight}
            y1={graphTop}
            x2={graphRight}
            y2={graphBottom}
          />
          {/* X-axis */}
          <line
            className="graph-axis"
            x1={graphLeft}
            y1={graphBottom}
            x2={graphRight}
            y2={graphBottom}
          />
          {/* Left Y-axis numerical labels */}
          {getAxisLabels(leftAxis).map((label, index) => (
            <text
              key={`left-${index}`}
              x="47"
              y={label.y + 4}
              fontSize="11"
              textAnchor="end"
              fill={leftAxis.color}
            >
              {label.value}
            </text>
          ))}
          {/* Right Y-axis numerical labels */}
          {getAxisLabels(rightAxis).map((label, index) => (
            <text
              key={`right-${index}`}
              x="493"
              y={label.y + 4}
              fontSize="11"
              textAnchor="start"
              fill={rightAxis.color}
            >
              {label.value}
            </text>
          ))}
          {/* Draw all selected measurement lines */}
          {activeMeasurements.map((measurement) => (
            <polyline
              key={measurement.name}
              fill="none"
              stroke={measurement.color}
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={getGraphPoints(measurement)}
            />
          ))}
        </svg>
        {/* X-axis timestamps */}
        <div className="graph-time-labels">
          {Array.from({length: 5}, (_, index) => {
            const dataIndex = Math.round(
              (index/4) * (graphDataWithTime.length - 1)
            )
            const item = graphDataWithTime[dataIndex]
            return (
              <span key={index}>
                {item?.time ?? '--:--'}
              </span>
            )
          })}
        </div>
        {/* Measurement ranges and units */}
        <div className="graph-measurement-scales">
          {activeMeasurements.map((measurement) => (
            <div
              key={measurement.name}
              className="graph-scale-item"
            >
              <span
                className="graph-scale-indicator"
                style={{
                  backgroundColor: measurement.color
                }}
              />
              <span>
                {measurement.name}:
                {' '}
                {measurement.min}–{measurement.max}
                {' '}
                {measurement.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GraphPanel