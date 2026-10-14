import { useState } from 'react'
import './GraphPage.css'

import DetailedGraph from './DetailedGraph'

// Colors for each Y-axis measurement
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

function GraphPage({
  configuredMeasurements,
  saveConfiguredMeasurements,
  selectedMeasurements,
  setSelectedMeasurements,
  xAxis,
  setXAxis
}) {
  const [isEditingYAxis, setIsEditingYAxis] = useState(false)
  const [draftMeasurements, setDraftMeasurements] = useState([])
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

        {/* RIGHT SIDE - Graph Controls*/}
        <div className="graph-page-control">
          {/* Y-axis measurements */}
          <div className="graph-page-y-controls">
            <div className="graph-y-header">
              <h3>Y-Axis Measurement</h3>
              <button
                type="button"
                className="graph-y-settings-button"
                onClick={() => {
                  if (!isEditingYAxis) {
                    setDraftMeasurements([...configuredMeasurements])
                  }
                  setIsEditingYAxis(!isEditingYAxis)
                }}
                title="Edit Y-Axis Measurements"
                aria-label="Edit Y-Axis Measurements"
              >
                ⚙
              </button>
            </div>
            {isEditingYAxis && (
              <div className="graph-y-edit-list">
                {draftMeasurements.map((measurement, index) => (
                  <div className="graph-y-edit-row" key={index}>
                    <select
                      className="graph-y-edit-select"
                      value={measurement}
                      onChange={(event) => {
                        const updated = [...draftMeasurements]
                        updated[index] = event.target.value
                        setDraftMeasurements(updated)
                      }}
                    >
                      <option value="" disabled>Select Measurement</option>
                      <option value="Battery Current">Battery Current</option>
                      <option value="Battery Voltage">Battery Voltage</option>
                      <option value="Battery Temperature">Battery Temperature</option>
                      <option value="Battery State of Charge">Battery State of Charge</option>
                      <option value="Battery Discharge">Battery Discharge</option>
                      <option value="48V Bus Voltage">48V Bus Voltage</option>
                      <option value="DC Input Current">DC Input Current</option>
                      <option value="DC Input Voltage">DC Input Voltage</option>
                      <option value="DC Load Current">DC Load Current</option>
                      <option value="Load Current">Load Current</option>
                      <option value="Rectifier Current">Rectifier Current</option>
                      <option value="Rectifier Voltage">Rectifier Voltage</option>
                    </select>
                    <button
                      type="button"
                      className="graph-y-remove-button"
                      onClick={() => {
                        setDraftMeasurements(
                          draftMeasurements.filter((_, rowIndex) => rowIndex !== index)
                        )
                      }}
                      title="Remove Measurement"
                      aria-label={`Remove measurement ${index + 1}`}
                      >
                        -
                      </button>
              </div>
            ))}
            <button
              type="button"
              className="graph-y-add-button"
              onClick={() => {
                setDraftMeasurements([...draftMeasurements, ''])
              }}
            >
              + Add Measurement
            </button>
            <button
              type="button"
              className="graph-y-save-button"
              onClick={() => {
                const updatedMeasurements = [
                  ...new Set(draftMeasurements.filter((measurement) => measurement !== ''))
                ]
                saveConfiguredMeasurements(updatedMeasurements)
                setIsEditingYAxis(false)
              }}
            >
              Save
            </button>
            </div>
            )}
            {!isEditingYAxis && (
              <div className="graph-y-checkbox-list">
                {configuredMeasurements.map((measurement) => (
                  <div className="graph-measurement-option" key={measurement}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedMeasurements.includes(measurement)}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setSelectedMeasurements([
                              ...selectedMeasurements,
                              measurement
                            ])
                          } else {
                            setSelectedMeasurements(
                              selectedMeasurements.filter((item) => item !== measurement)
                            )
                          }
                        }}
                      />
                      <span
                        className="graph-line-color"
                        style={{ backgroundColor: measurementColors[measurement]}}
                      />
                      {measurement}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          { /* X-axis time Range */ }
          <div className="graph-page-x-controls">
            <h2>X-axis Time Range</h2>
            <select 
              id="graph-page-time-range"
              value={xAxis}
              onChange={(event) => setXAxis(event.target.value)}
              >
                <option value="24 Hours">24 Hours</option>
                <option value="12 Hours">12 Hours</option>
                <option value="10 Minutes">10 Minutes</option>
              </select>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GraphPage