import './GraphPanel.css'

function GraphPanel() {
  const graphData = [
    { time: '10:00', voltage: 53.8, current: 22.1 },
    { time: '10:05', voltage: 54.0, current: 23.4 },
    { time: '10:10', voltage: 54.2, current: 24.5 },
    { time: '10:15', voltage: 54.1, current: 23.8 },
    { time: '10:20', voltage: 53.3, current: 25.2 }
  ]
  const voltagePoints = graphData
    .map((item,index) => {
      const x = 50 + index*110 
      const y = 150 - (item.voltage - 53.5)*100
      return `${x},${y}`
    })
    .join(' ')
  const currentPoints = graphData
    .map((item,index) => {
      const x = 50 + index*110
      const y = 170 - (item.current - 20)*12
      return `${x},${y}`
    })
    .join(' ')
  return (
    <section className="graph-section">
      <div className="graph-header">
        <h2>Activity</h2>

        <div className="graph-legend">
          <span>Voltage</span>
          <span>Current</span>
        </div>
      </div>

      <div className="graph-container">
        <svg
          className="system-graph"
          viewBox="0 0 540 220"
          preserveAspectRatio="none"
        >
         {/* Horizontal grid lines */}
         <line x1="40" y1="40" x2="510" y2="40" />
         <line x1="40" y1="80" x2="510" y2="80" />
         <line x1="40" y1="120" x2="510" y2="120" />
         <line x1="40" y1="160" x2="510" y2="160" />
         {/* Graph axes x-axis and y-axis */}
         <line className="graph-axis" x1="40" y1="20" x2="40" y2="180" />
         <line className="graph-axis" x1="40" y1="180" x2="510" y2="180" />
         {/* Voltage line */}
         <polyline 
            className="voltage-line"
            points={voltagePoints}
          />
          {/* Current Line */}
          <polyline
            className="current-line"
            points={currentPoints}
          />
        </svg>

        <div className="graph-time-labels">
          {graphData.map((item) => (
            <span key={item.time}>
              {item.time}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GraphPanel