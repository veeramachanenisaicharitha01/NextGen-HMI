import './App.css'

// ============================================================
// NextGen Power - HMI Overview Screen
// This file defines the main user interface for the NextGen HMI.
// ============================================================

// ------------------------------------------------------------
// SIMULATED SYSTEM DATA
// ------------------------------------------------------------
// These values are temporary test values and vary once the hardware is setup and is connected
// ------------------------------------------------------------

const systemData = {
  acVoltage: 120, // AC input voltage
  rectifierStatus: 'Online', // Current operating condition of the rectifier system
  loadCurrent: 24.5, // Current being supplied to the DC load
  batteryVoltage: 54.2, // Current battery voltage
  temperature: 32, // System temperature in degrees Celsius
  activeAlarms: 0 // Number of currently active alarms
}

// ------------------------------------------------------------
// MAIN HMI COMPONENT
// ------------------------------------------------------------
// App() is the main React component for the HMI.
//
// Everything returned by this function is displayed on the NextGen HMI screen.
// ------------------------------------------------------------

function App() {
  return (
    <div className="hmi"> 

    {/* HMI Header (Displays the product name and current screen name) */}
    
      <header className="hmi-header">
        <h1>NextGen Power</h1>
        <p>System Overview</p>
      </header>

      {/*---------------------------------------------------------------
          System Status Bar 
        -----------------------------------------------------------------*/}

      <div className="status-bar">

        <div className="status-card">
          <h3>AC Source</h3>
          <p>{systemData.acVoltage} V</p>
        </div>

        <div className="status-card">
          <h3>Rectifiers</h3>
          <p>{systemData.rectifierStatus}</p>
        </div>

        <div className="status-card">
          <h3>Load</h3>
          <p>{systemData.loadCurrent} A</p>
        </div>

        <div className="status-card">
          <h3>Battery</h3>
          <p>{systemData.batteryVoltage} V</p>
        </div>

        <div className="status-card">
          <h3>Temperature</h3>
          <p>{systemData.temperature} °C</p>
        </div>

        <div className="status-card">
          <h3>Active Alarms</h3>
          <p>{systemData.activeAlarms}</p>
        </div>

      </div>

      {/*-----------------------------------------------------------
           System Power Flow Section
        ------------------------------------------------------------*/}

      <section className="power-section">

        <h2>System Power Flow</h2>

        <div className="power-flow">

          <div className="power-box">
            <h3>AC Source</h3>
            <p>{systemData.acVoltage} V AC</p>
          </div>

          <div className="arrow">→</div>

          <div className="power-box">
            <h3>Rectifiers</h3>
            <p>{systemData.rectifierStatus}</p>
          </div>

          <div className="arrow">→</div>

          <div className="power-box">
            <h3>DC Load</h3>
            <p>{systemData.loadCurrent} A</p>
          </div>

          <div className="arrow">→</div>

          <div className="power-box">
            <h3>Battery</h3>
            <p>{systemData.batteryVoltage} V DC</p>
          </div>

        </div>

      </section>

    </div>
  )
}

// ------------------------------------------------------------
// EXPORT APP
// ------------------------------------------------------------
// Makes this component available to main.jsx so React can display the HMI in the browser.
// ------------------------------------------------------------

export default App