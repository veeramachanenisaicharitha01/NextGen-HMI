import './GraphPage.css'

import DetailedGraph from './DetailedGraph'
import GraphValuesPanel from './GraphValuesPanel'

function GraphPage({
  selectedMeasurements,
  setSelectedMeasurements,
  xAxis,
  setXAxis
}) {
  return (
    <main className="graph-page">
      {/* GRAPH PAGE TITLE */}
      <div className="graph-page-heading">
        <h1>System Graphs</h1>
      </div>

      {/* GRAPH PAGE */}
      <div className="graph-page-layout">

        {/* LEFT SIDE */}
        <DetailedGraph
          selectedMeasurements={selectedMeasurements}
          setSelectedMeasurements={setSelectedMeasurements}
          xAxis={xAxis}
          setXAxis={setXAxis}
        />

        {/* RIGHT SIDE */}
        <GraphValuesPanel
          selectedMeasurements={selectedMeasurements}
        />
      </div>
    </main>
  )
}

export default GraphPage