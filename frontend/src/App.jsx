// ============================================================
// NEXTGEN POWER - HMI OVERVIEW
// ============================================================
// This file contains the main React user interface for the NextGen Power HMI.
// ============================================================

// Import React's useState function. (useState allows the HMI to remember which section the operator has selected.)
import { useState } from 'react'

// Import the CSS file that controls the appearance and layout of this HMI.
import './App.css'

// Import all the different components of the HMI.
import Header from './components/Header'
import PowerFlow from './components/PowerFlow'
import DetailsPanel from './components/DetailsPanel'
import GraphPanel from './components/GraphPanel'
import GraphControls from  './components/GraphControls'
import GraphPage from './components/GraphPage'
import AlarmsPage from './components/AlarmsPage'

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

  // Global HMI State
  const [hmiState, setHmiState] = useState({
    page: 'Overview',
    overview: {
      selectedEquipment: 'Overview',
      // All six measurements selected by default
      measurements: ['Battery Current', 'Battery Voltage'], 
      // Default graph time Range
      timeRange: "24 Hours"
    },
    graph: {
      //Measurements configured through settings
      configuredMeasurements: ['Battery Current', 'Battery Voltage'],
      //Measurements currently visible on the graph
      measurements: ['Battery Current', 'Battery Voltage'],
      timeRange: '24 Hours'
    }
  })
  const [backHistory, setBackHistory] = useState([])
  const [forwardHistory, setForwardHistory] = useState([])
  const selectedPage = hmiState.page
  const selectedEquipment = hmiState.overview.selectedEquipment
  const selectedMeasurements = hmiState.graph.measurements
  const configuredMeasurements = hmiState.graph.configuredMeasurements
  const xAxis = hmiState.graph.timeRange
  const overviewMeasurements = hmiState.overview.measurements
  const overviewTimeRange = hmiState.overview.timeRange
  const updateHmiState = (newState) => {
    setBackHistory((history) => [
      ...history,
      hmiState
    ])
    setForwardHistory([])
    setHmiState(newState)
  }
  const setSelectedPage = (newPage) => {
    updateHmiState({
      ...hmiState,
      page: newPage
    })
  }
  const setSelectedEquipment = (newEquipment) => {
    updateHmiState({
      ...hmiState,
      overview: {
        ...hmiState.overview,
        selectedEquipment: newEquipment
      }
    })
  }
  const setOverviewMeasurements = (newMeasurements) => {
    updateHmiState({
      ...hmiState,
      overview: {
        ...hmiState.overview,
        measurements: newMeasurements
      }
    })
  }
  const setOverviewTimeRange = (newTimeRange) => {
    updateHmiState({
      ...hmiState,
      overview: {
        ...hmiState.overview,
        timeRange: newTimeRange
      }
    })
  }
  const goToOverview = () => {
    updateHmiState({
      ...hmiState,
      page: 'Overview',
      overview: {
        ...hmiState.overview,
        selectedEquipment: 'Overview'
      }
    })
  }
  const setSelectedMeasurements = (newMeasurements) => {
    updateHmiState({
      ...hmiState,
      graph: {
        ...hmiState.graph,
        measurements: newMeasurements
      }
    })
  }
  const saveConfiguredMeasurements = (newMeasurements) => {
    updateHmiState({
      ...hmiState,
      graph: {
        ...hmiState.graph,
        configuredMeasurements: newMeasurements,
        measurements: newMeasurements
      }
    })
  }
  const setXAxis = (newTimeRange) => {
    updateHmiState({
      ...hmiState,
      graph: {
        ...hmiState.graph,
        timeRange: newTimeRange
      }
    })
  }
  const navigateToPage = (newPage) => {
    if (newPage === hmiState.page) {
      return
    }
    updateHmiState({
      ...hmiState,
      page: newPage
    })
  }
  const goBack = () => {
  if (backHistory.length === 0) {
    return
   }
  const previousState =
    backHistory[backHistory.length - 1]
  setForwardHistory((history) => [
    hmiState,
    ...history
  ])
  setBackHistory((history) =>
    history.slice(0, -1)
  )
  setHmiState(previousState)
  }
  const goForward = () => {
  if (forwardHistory.length === 0) {
    return
    }
  const nextState = forwardHistory[0]
  setBackHistory((history) => [
    ...history,
    hmiState
  ])
  setForwardHistory((history) =>
    history.slice(1)
  )
  setHmiState(nextState)
}

  return (
    // COMPLETE HMI SCREEN
    <div className="hmi">

      {/* HMI Header */}
      <Header
        systemData={systemData}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        setSelectedEquipment={setSelectedEquipment}
        navigateToPage={navigateToPage}
        goToOverview={goToOverview}
        goBack={goBack}
        goForward={goForward}
        canGoBack={backHistory.length > 0}
        canGoForward={forwardHistory.length > 0}
      />
      {/* Overview Page */}
      {selectedPage === 'Overview' && (
        <div className="main-content">
          <div className="overview-power-flow">
          {/* SYSTEM POWER FLOW */}
            <PowerFlow 
              systemData={systemData}
              selectedEquipment={selectedEquipment}
              setSelectedEquipment={setSelectedEquipment}
            />
          </div>
          <div className='overview-details'>
            <DetailsPanel 
              selectedEquipment={selectedEquipment}
              systemData={systemData}
            />
          </div>
          <div className='overview-activity'>
            <GraphPanel 
              selectedMeasurements={overviewMeasurements}
              setSelectedMeasurements={setOverviewMeasurements}
              timeRange={overviewTimeRange}
              setTimeRange={setOverviewTimeRange}
            />
          </div>
          <div className='overview-graph-controls'>
            <GraphControls 
              selectedMeasurements={overviewMeasurements}
              setSelectedMeasurements={setOverviewMeasurements}
              timeRange={overviewTimeRange}
              setTimeRange={setOverviewTimeRange}
            />
          </div>
        </div>
      )}
      
      {/* Dedicated Graph Page */}
      {selectedPage === 'Graph' && (
        <GraphPage
          configuredMeasurements={configuredMeasurements}
          saveConfiguredMeasurements={saveConfiguredMeasurements} 
          selectedMeasurements={selectedMeasurements}
          setSelectedMeasurements={setSelectedMeasurements}
          xAxis={xAxis}
          setXAxis={setXAxis}
          />
      )}
      
      {/* Dedicated Alarm Page */}
      {selectedPage === 'Alarms' && (
        <AlarmsPage />
      )}

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