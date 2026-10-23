// ============================================================
// NEXTGEN POWER - HMI OVERVIEW
// ============================================================
// This file contains the main React user interface for the NextGen Power HMI.
// ============================================================

// Import React's useState function. (useState allows the HMI to remember which section the operator has selected.)
import { useState } from 'react'

import useActionHistory from './hooks/useActionHistory'
import useConfigurationHistory from './hooks/useConfigurationHistory'

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

const defaultConfiguration = {
  overview: {
    measurements: ['Battery Current', 'Battery Voltage'],
    timeRange: '24 Hours'
  },
  graph: {
    configuredMeasurements: ['Battery Current', 'Battery Voltage'],
    measurements: ['Battery Current', 'Battery Voltage'],
    timeRange: '24 Hours'
  }
}

function App() {

  // Global HMI State
  const {state: hmiState, recordAction, goBack, goForward, commitConfiguration, canGoBack, canGoForward} = useActionHistory({
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
  const {
    versions,
    currentVersionIndex,
    saveConfiguration,
    undoConfiguration,
    confirmUndo,
    canUndo
  } = useConfigurationHistory(defaultConfiguration)
  const selectedPage = hmiState.page
  const selectedEquipment = hmiState.overview.selectedEquipment
  const selectedMeasurements = hmiState.graph.measurements
  const configuredMeasurements = hmiState.graph.configuredMeasurements
  const xAxis = hmiState.graph.timeRange
  const overviewMeasurements = hmiState.overview.measurements
  const overviewTimeRange = hmiState.overview.timeRange
  const updateHmiState = (newState) => {
    recordAction(newState)
  }

  //Global save configuration
  const handleSave = () => {
    const configuration = {
      overview : {
        measurements: [...hmiState.overview.measurements],
        timeRange: hmiState.overview.timeRange
      },
      graph: structuredClone(hmiState.graph)
    }
    saveConfiguration(configuration)
    commitConfiguration(configuration)
    console.log('Configuration saved successfully')
  }

  // Global Undo function
  const handleUndo = () => {
    const previousConfiguration = undoConfiguration()
    if(previousConfiguration === null) {
      return
    }
    commitConfiguration(previousConfiguration)
    confirmUndo()
    console.log('Previous saved configuration restored')
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
        selectedEquipment: 'Overview',
        measurements: ['Battery Current', 'Battery Voltage'],
        timeRange: '24 Hours'
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
  
  return (
    // COMPLETE HMI SCREEN
    <div className="hmi">

      {/* HMI Header */}
      <Header
        systemData={systemData}
        selectedPage={selectedPage}
        selectedEquipment={selectedEquipment}
        setSelectedPage={setSelectedPage}
        setSelectedEquipment={setSelectedEquipment}
        navigateToPage={navigateToPage}
        goToOverview={goToOverview}
        goBack={goBack}
        goForward={goForward}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onSave={handleSave}
        canSave={true}
        onUndo={handleUndo}
        canUndo={canUndo}
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