import { useState } from 'react'
import './DetailedGraph.css'

//Dedicated Graph Colors
const measurementColors = {
  'Battery Current': '#2563eb',
  'Battery Voltage': '#16a34a',
  'Battery Temperature': '#ea580c',
  'Battery State of Charge': '#d97706',
  'Battery Discharge': '#ca8a04',
  '48V Bus Voltage': '#0891b2',
  'DC Input Current': '#7c3aed',
  'DC Input Voltage': '#db2777',
  'DC Load Current': '#0d9488',
  'Load Current': '#dc2626',
  'Rectifier Current': '#9333ea',
  'Rectifier Voltage': '#475569'
}
const measurementUnits = {
  'Battery Current': 'A',
  'Battery Voltage': 'V',
  'Battery Temperature': '°C',
  'Battery State of Charge': '%',
  'Battery Discharge': '',
  '48V Bus Voltage': 'V',
  'DC Input Current': 'A',
  'DC Input Voltage': 'V',
  'DC Load Current': 'A',
  'Load Current': 'A',
  'Rectifier Current': 'A',
  'Rectifier Voltage': 'V'
}

// Temporary data used while developing the HMI. Later this will be replaced by historical data from the NextGen backend.
const graphData = {
  '24 Hours': {
    labels: ['12 AM','4 AM','8 AM','12 PM','4 PM','8 PM','Now'],
    'Battery Voltage': [53.8, 53.9, 54.0, 54.2, 54.1, 54.0, 54.2],
    'Battery Current': [18, 20, 22, 21, 24, 23, 24.5],
    'Battery State of Charge': [82, 81, 80, 79, 78, 77, 76],
    'Load Current': [20, 22, 21, 24, 23, 25, 24.5],
    'Rectifier Current': [25, 27, 26, 28, 30, 29, 31],
    'Battery Temperature': [29, 30, 31, 32, 31, 33, 32],
    'Battery Discharge': [12, 14, 16, 15, 18, 17, 19],
    '48V Bus Voltage': [53.5, 53.6, 53.8, 54.0, 53.9, 53.8, 54.0],
    'DC Input Current': [25, 26, 27, 28, 29, 28, 30],
    'DC Input Voltage': [54.1, 54.2, 54.3, 54.4, 54.2, 54.3, 54.5],
    'DC Load Current': [19, 20, 22, 21, 23, 24, 24.5],
    'Rectifier Voltage': [54.0, 54.1, 54.2, 54.3, 54.2, 54.4, 54.3]
  },
  '12 Hours': {
    labels: ['12 Hr','10 Hr','8 Hr','6 Hr','4 Hr','2 Hr','Now'],
    'Battery Voltage': [54.0, 53.9, 54.1, 54.2, 54.0, 54.1, 54.2],
    'Battery Current': [21, 22, 23, 22, 24, 25, 24.5],
    'Battery State of Charge': [80, 79, 79, 78, 77, 77, 76],
    'Load Current': [21, 23, 22, 24, 26, 25, 24.5],
    'Rectifier Current': [27, 28, 27, 29, 30, 30, 31],
    'Battery Temperature': [30, 30.5, 31, 31.5, 32, 32.5, 32],
    'Battery Discharge': [14, 15, 16, 17, 18, 18.5, 19],
    '48V Bus Voltage': [53.7, 53.8, 53.9, 54.0, 53.9, 54.1, 54.0],
    'DC Input Current': [26, 27, 28, 27, 29, 30, 30],
    'DC Input Voltage': [54.2, 54.3, 54.2, 54.4, 54.3, 54.5, 54.5],
    'DC Load Current': [21, 22, 23, 22, 24, 25, 24.5],
    'Rectifier Voltage': [54.1, 54.2, 54.1, 54.3, 54.2, 54.4, 54.3]
  },
  '10 Minutes': {
    labels: ['10 min','8 min','6 min','4 min','2 min','1 min','Now'],
    'Battery Voltage': [54.0, 54.1, 54.0, 54.2, 54.1, 54.3, 54.2],
    'Battery Current': [23, 24, 23.5, 24, 25, 24.8, 24.5],
    'Battery State of Charge': [76.2, 76.2, 76.1, 76.1, 76.0, 76.0, 76.0],
    'Load Current': [23, 24, 25, 24, 26, 25, 24.5],
    'Rectifier Current': [29, 30, 29, 31, 30, 32, 31],
    'Battery Temperature': [31.8, 31.9, 32, 32.1, 32, 32.2, 32],
    'Battery Discharge': [18.5, 18.7, 18.6, 18.8, 18.9, 19.1, 19],
    '48V Bus Voltage': [53.9, 54.0, 53.9, 54.1, 54.0, 54.1, 54.0],
    'DC Input Current': [29, 29.5, 30, 29.8, 30.2, 30.1, 30],
    'DC Input Voltage': [54.3, 54.4, 54.3, 54.5, 54.4, 54.6, 54.5],
    'DC Load Current': [24, 24.2, 24.5, 24.3, 24.7, 24.6, 24.5],
    'Rectifier Voltage': [54.2, 54.3, 54.2, 54.4, 54.3, 54.5, 54.3]
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
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const currentGraphData = graphData[xAxis] || graphData['24 Hours']
  const measurementRanges = selectedMeasurements
    .map((measurement) => {
      const values = currentGraphData[measurement]
      if (!Array.isArray(values) || values.length ===0) {
        return null
      }
      return {
        name: measurement,
        min: Math.min(...values),
        max: Math.max(...values),
        unit: measurementUnits[measurement] || '',
        color:measurementColors[measurement] || '#64748b'
      }
    })
    .filter(Boolean) 

  //Generate 5 Y-axis labels for each selected measurement
  const yAxisScales = measurementRanges.map((measurement) => {
    const range = measurement.max - measurement.min
    const padding = (range || 1) * 0.1
    const axisMin = measurement.min - padding
    const axisMax = measurement.max + padding
    const ticks = Array.from({length: 5}, (_, index) => {
      const value = axisMax - (index*(axisMax - axisMin))/4
      return Number(value.toFixed(2))
    })
    return {
      name: measurement.name,
      unit: measurement.unit,
      color: measurement.color,
      ticks
    }
  })

  // Select historical data for the chosen time range
  const currentData = graphData[xAxis] || graphData['24 Hours']
  const labels = currentData.labels

  //Each selected measurement gets its own graph coordinates
  const graphLines = selectedMeasurements
    .filter((measurement) => Array.isArray(currentData[measurement]))
    .map((measurement) => {
      const values = currentData[measurement]

      //Find the minimum and maximum for this measurement
      const minimumValue = Math.min(...values)
      const maximumValue = Math.max(...values)

      //Calculate the Range for this measurement
      const valueRange = maximumValue - minimumValue || 1

      //Prevent division by zero if values are identical
      const padding = valueRange * 0.1

      const graphMinimum = minimumValue - padding
      const graphMaximum = maximumValue + padding

      const graphRange = graphMaximum - graphMinimum

      //Calculate SVG coordinated for this measurement
      const points = values
        .map((value, index) => {
          const x = 60 + (index*610) / (values.length - 1)
          const y = 230 - ((value - graphMinimum) / graphRange) * 170
          return `${x},${y}`
        })
        .join(' ')
        return {
          measurement,
          points,
          values,
          color: measurementColors[measurement]
        }
    })
  return (
    <section className="detailed-graph">
      <h2>System Graph</h2>

      {/* GRAPH AREA */}
      <div className="detailed-graph-area">
        {/* Multiple Y-Axis Numerical Scales */}
        {yAxisScales.length > 0 && (
          <div className="detailed-y-axis-side">
            <svg
              width={Math.max(80, yAxisScales.length * 80)}
              height="300"
              viewBox={`0 0 ${Math.max(80, yAxisScales.length * 80)} 300`}
              className="detailed-y-axis-side-svg"
            >
              {yAxisScales.map((scale, scaleIndex) => (
                <g key={scale.name}>

                  {/* Measurement name or unit */}
                  <text 
                    x={scaleIndex * 80 + 40}
                    y="20"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill={scale.color}
                  >
                    {scale.unit || scale.name}
                  </text>

                  {/* Five Numerical Values */}
                  {scale.ticks.map((tick, tickIndex) => (
                    <text
                      key={tickIndex}
                      x={scaleIndex * 80 + 40}
                      y={60 + tickIndex * 42.5}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="11"
                      fill={scale.color}
                    >
                      {tick.toFixed(2)}
                    </text>
                  ))}
                </g>
              ))}
            </svg>
          </div>
        )}
        
        {/* Existing Graph */}
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

          {/* MULTIPLE GRAPH LINEs */}
          {graphLines.map((line) => (
            <g key={line.measurement}>
              <polyline
                key={line.measurement}
                className="detailed-data-line"
                points={line.points}
                fill="none"
                stroke={line.color}
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {line.points.split(' ').map((point, index) => {
                const [x, y] = point.split(',').map(Number)
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="5"
                    fill={line.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    style={{cursor: 'pointer'}}
                    onMouseEnter={() => {
                      setHoveredPoint({
                        measurement: line.measurement,
                        value: line.values[index],
                        time: labels[index],
                        unit: measurementUnits[line.measurement],
                        x,
                        y
                    })
                  }}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              )
              })}
            </g>
          ))}

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

          {/* Floating Graph Tooltip */}
          {hoveredPoint && (
            <g
              transform={`translate(${
                Math.max(5, Math.min(hoveredPoint.x + 12, 475))
              }, ${
                Math.max(10, Math.min(hoveredPoint.y - 85, 180))
              })`}
              pointerEvents="none"
            >
              <rect
                width="220"
                height="78"
                rx="8"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="1"
              />
              <circle
                cx="14"
                cy="18"
                r="5"
                fill={measurementColors[hoveredPoint.measurement]}
              />
              <text x="26" y="22" fontSize="12" fontWeight="600" fill="#334155">
                {hoveredPoint.measurement}
              </text>
              <text x="14" y="48" fontSize="18" fontWeight="bold" fill="#0f172a">
                {hoveredPoint.value} {hoveredPoint.unit}
              </text>
              <text x="14" y="67" fontSize="12" fill="#64748b">
                {hoveredPoint.time}
              </text>
            </g>
          )}
        </svg>
      </div>
      
      {/* Measurement Scales */}
      <div className="graph-measurement-scales">
        <h3>Measurement Scales</h3>
        <div className="graph-measurement-scale-list">
          {measurementRanges.map((measurement) => (
            <div
              className="graph-measurement-scale-item"
              key={measurement.name}
            >
              <span
                className="graph-measurement-scale-color"
                style={{ backgroundColor: measurement.color}}
              />
              <div className="graph-measurement-scale-details">
                <strong>{measurement.name}</strong>
                <span>
                  Min: {measurement.min}{measurement.unit}
                  {' | '}
                  Max: {measurement.max}{measurement.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graph hover Tooltip */}
      {hoveredPoint && (
        <div className="graph-hover-tooltip">
          <div className="graph-tooltip-header">
            <span
              className="graph-tooltip-color"
              style={{
                backgroundColor: measurementColors[hoveredPoint.measurement]
              }}
            />
            <strong>{hoveredPoint.measurement}</strong>
          </div>
          <div className="graph-tooltip-value">
            {hoveredPoint.value} {hoveredPoint.unit}
          </div>
          <div className="graph-tooltip-time">
            Time: {hoveredPoint.time}
          </div>
        </div>
      )}
    </section>
  )
}

export default DetailedGraph