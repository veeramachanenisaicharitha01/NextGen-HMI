// ============================================================
// NEXTGEN POWER - HMI OVERVIEW
// ============================================================
// This file contains the main React user interface for the
// NextGen Power HMI.
// ============================================================
// Import React's useState function.
// useState allows the HMI to remember which section the operator has selected.

import { useState } from 'react'

// Import the CSS file that controls the appearance and layout of this HMI.

import './App.css'

// ============================================================
// SIMULATED SYSTEM DATA
// ============================================================
// These are temporary values used while developing the HMI. Eventually this data will be replaced by real system data coming from the NextGen backend/hardware interfaces.
// ============================================================

const systemData = {
  acVoltage: 120,                   // AC input voltage
  rectifierStatus: 'Online',        // Current status of the rectifier system
  loadCurrent: 24.5,                // Current being supplied to the DC load
  batteryVoltage: 54.2,             // Current battery voltage
  temperature: 32,                  // Current system temperature in Celsius
  activeAlarms: 0                   // Number of currently active alarms
}

// ============================================================
// MAIN HMI COMPONENT
// ============================================================
// App() is the main React component. Everything returned by this function is displayed as part of the NextGen HMI.
// ============================================================

function App() {

  // ----------------------------------------------------------
  // SELECTED SECTION STATE
  // ----------------------------------------------------------

  const [selectedSection, setSelectedSection] = useState('Overview')
  return (
    // ========================================================
    // COMPLETE HMI SCREEN
    // ========================================================
    <div className="hmi">

      {/* HMI Header */}

      <header className="hmi-header">
        <h1>NextGen Power</h1>
        <p>System Overview</p>
      </header>

      {/* SYSTEM STATUS BAR */}

      <div className="status-bar">
        <div
          className="status-card"
          onClick={() => setSelectedSection('AC Source')}
        >
          <h3>AC Source</h3>
          <p>{systemData.acVoltage} V</p>
        </div>

        <div
          className="status-card"
          onClick={() => setSelectedSection('Rectifiers')}
        >
          <h3>Rectifiers</h3>
          <p>{systemData.rectifierStatus}</p>
        </div>

        <div
          className="status-card"
          onClick={() => setSelectedSection('Load')}
        >
          <h3>Load</h3>
          <p>{systemData.loadCurrent} A</p>
        </div>

        <div
          className="status-card"
          onClick={() => setSelectedSection('Battery')}
        >
          <h3>Battery</h3>
          <p>{systemData.batteryVoltage} V</p>
        </div>

        <div
          className="status-card"
          onClick={() => setSelectedSection('Temperature')}
        >
          <h3>Temperature</h3>
          <p>{systemData.temperature} °C</p>
        </div>

        <div
          className="status-card"
          onClick={() => setSelectedSection('Active Alarms')}
        >
          <h3>Active Alarms</h3>
          <p>{systemData.activeAlarms}</p>
        </div>
      </div>


      {/* ======================================================
          MAIN CONTENT AREA
          LEFT:
          System Power Flow
          RIGHT:
          Details for whichever system section the operator
          selects.
         ====================================================== */}

      <div className="main-content">

        {/* SYSTEM POWER FLOW */}

        <section className="power-section">

          {/* Power-flow section title */}

          <h2>System Power Flow</h2>

          {/* Container holding the power-system components */}

          <div className="system-diagram">

            {/* Main horizontal power path */}
            <div className="main-power-path">

             {/* AC SOURCE */}
              <div className="diagram-item">
                <div className="diagram-icon ac-icon">
                 AC
                </div>

                <div className="diagram-label">
                  <strong>AC Source</strong>
                  <span>{systemData.acVoltage} V AC</span>
                </div>
              </div>

            {/* Connection from AC Source to Rectifiers */}
              <div className="diagram-connection">
                <div className="connection-line"></div>
                <span className="connection-arrow">▶</span>
              </div>

              {/* RECTIFIERS */}
              <div className="diagram-item">
                <div className="diagram-icon rectifier-icon">
                  REC
                </div>

                <div className="diagram-label">
                  <strong>Rectifiers</strong>
                  <span>{systemData.rectifierStatus}</span>
                </div>
              </div>

              {/* Connection from Rectifiers to Load */}
              <div className="diagram-connection battery-branch-area">
                <div className="connection-line"></div>
                <div className="branch-point"></div>
                <div className="battery-branch-line"></div>
                <span className="connection-arrow">▶</span>
              </div>

              {/* LOAD */}
              <div className="diagram-item">
               <div className="diagram-icon load-icon">
                  LOAD
              </div>

              <div className="diagram-label">
                <strong>Load</strong>
                <span>{systemData.loadCurrent} A</span>
              </div>
            </div>

          </div>


            {/* BATTERY - positioned below the Rectifiers */}
          <div className="battery-row">
            <div className="diagram-item">
              <div className="diagram-icon battery-icon">
                BAT
              </div>

              <div className="diagram-label">
                <strong>Battery</strong>
                <span>{systemData.batteryVoltage} V DC</span>
              </div>

            </div>

          </div>

        </div>

        </section>


        {/* DYNAMIC SYSTEM DETAILS PANEL */}

        <section className="details-section">
          <h2>{selectedSection} Details</h2>

          {/* DEFAULT OVERVIEW */}

          {selectedSection === 'Overview' && (
            <div className="details-content">
              <p>
                Select a system section above to view more information.
              </p>
            </div>
          )}

          {selectedSection === 'AC Source' && (
            <div className="details-content">
              <p>
                <strong>Input Voltage:</strong>{' '}
                {systemData.acVoltage} V AC
              </p>
              <p>
                <strong>Frequency:</strong> --
              </p>
              <p>
                <strong>Status:</strong> --
              </p>
            </div>
          )}

          {selectedSection === 'Rectifiers' && (
            <div className="details-content">
              <p>
                <strong>Status:</strong>{' '}
                {systemData.rectifierStatus}
              </p>
              <p>
                <strong>Output Voltage:</strong> --
              </p>
              <p>
                <strong>Output Current:</strong> --
              </p>
            </div>
          )}

          {selectedSection === 'Load' && (
            <div className="details-content">
              <p>
                <strong>Load Current:</strong>{' '}
                {systemData.loadCurrent} A
              </p>
              <p>
                <strong>Load Voltage:</strong> --
              </p>
              <p>
                <strong>Load Power:</strong> --
              </p>
            </div>
          )}

          {selectedSection === 'Battery' && (
            <div className="details-content">
              <p>
                <strong>Battery Voltage:</strong>{' '}
                {systemData.batteryVoltage} V DC
              </p>
              <p>
                <strong>Battery Current:</strong> --
              </p>
              <p>
                <strong>Battery Status:</strong> --
              </p>
            </div>
          )}

          {selectedSection === 'Temperature' && (
            <div className="details-content">
              <p>
                <strong>System Temperature:</strong>{' '}
                {systemData.temperature} °C
              </p>
              <p>
                <strong>High Temperature Alarm:</strong> --
              </p>
            </div>
          )}

          {selectedSection === 'Active Alarms' && (
            <div className="details-content">
              <p>
                <strong>Active Alarms:</strong>{' '}
                {systemData.activeAlarms}
              </p>
              <p>
                <strong>Alarm Details:</strong>{' '}
                No simulated alarms
              </p>
            </div>
          )}
        </section>

      </div>
      {/* End of main-content */}

    </div>
    // End of complete HMI screen

  )
}

// ============================================================
// EXPORT APP COMPONENT
// ============================================================
// This makes App available to main.jsx. main.jsx is responsible for starting React and displaying this component in the browser.
// ============================================================

export default App