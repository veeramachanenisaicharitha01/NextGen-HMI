
import { useState } from 'react'
import { mockAlarms } from '../data/mockAlarms'
import './AlarmsPage.css'

function AlarmsPage() {
  // Simulated alarm state. No hardware commands are sent.
  const [activeTab, setActiveTab] = useState('active')

  //Controls which alarm configuration category is expanded
  const [expandedCategories, setExpandedCategories] = useState({
    bus: false,
    system: false,
  })

  const toggleCategory = (category) => {
    setExpandedCategories((previous) => ({
      ...previous,
      [category]: !previous[category],
    }))
  }
  const [alarms, setAlarms] = useState(() =>
    mockAlarms.map((alarm) => ({ ...alarm }))
  )

  //Simulated Alarm Severity configuration. Changes do not affect the hardware or active alarm logic
  const [alarmSeveritySettings, setAlarmSeveritySettings] = useState(() =>
    Object.fromEntries(
      mockAlarms.map((alarm) => [alarm.id, alarm.severity])
  ))
  const updateAlarmSeverity = (id, severity) => {
    setAlarmSeveritySettings((previous) => ({
      ...previous,
      [id]: severity,
    }))
  }

  //Simulated SNMP notification settings. No SNMP messages are actually transmitted
  const [alarmSnmpSettings, setAlarmSnmpSettings] = useState(() =>
    Object.fromEntries(
      mockAlarms.map((alarm) => [alarm.id, false])
  ))
  const updateAlarmSnmp = (id, enabled) => {
    setAlarmSnmpSettings((previous) => ({
      ...previous,
      [id]: enabled,
    }))
  }

  //Simulated alarm test controls. No hardware commands or actual alarms are triggered.
  const [alarmTestSettings, setAlarmTestSettings] = useState(() => 
  Object.fromEntries(
    mockAlarms.map((alarm) => [alarm.id, false])
  ))
  const toggleAlarmTest = (id) => {
    setAlarmTestSettings((previous) => ({
      ...previous,
      [id]: !previous[id],
    }))
  }

  // Active alarms are those whose fault condition is present.
  const activeAlarms = alarms.filter(
    (alarm) => alarm.condition === 'Active'
  )
  const criticalCount = activeAlarms.filter(
    (alarm) => alarm.severity === 'Critical'
  ).length
  const warningCount = activeAlarms.filter(
    (alarm) => alarm.severity === 'Warning'
  ).length
  const acknowledgedCount = activeAlarms.filter(
    (alarm) => alarm.acknowledged === true
  ).length

  // Acknowledgment does not clear the fault condition.
  const acknowledgeAlarm = (id) => {
    setAlarms((previousAlarms) =>
      previousAlarms.map((alarm) =>
        alarm.id === id
          ? { ...alarm, acknowledged: !alarm.acknowledged }
          : alarm
      )
    )
  }

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleString()

  return (
    <main className="alarms-page">

      <div className="alarms-page-heading">
        <div>
          <h1>Alarms</h1>
          <p className="alarms-subtitle">
            NextGen Power · Simulation Mode
          </p>
        </div>

        <span className="alarms-active-badge">
          {activeAlarms.length} Active
        </span>
      </div>

      {/* ALARM SUMMARY */}
      <section className="alarms-summary">
        <div className="alarm-summary-card">
          <h3>Active Alarms</h3>
          <p>{activeAlarms.length}</p>
        </div>

        <div className="alarm-summary-card">
          <h3>Critical</h3>
          <p>{criticalCount}</p>
        </div>

        <div className="alarm-summary-card">
          <h3>Warnings</h3>
          <p>{warningCount}</p>
        </div>

        <div className="alarm-summary-card">
          <h3>Acknowledged</h3>
          <p>{acknowledgedCount}</p>
        </div>
      </section>

      {/* Alarms Navigation */}
      <div className="alarms-tabs">
        <button 
          className={activeTab === 'active' ? 'selected' : ''}
          onClick={() => setActiveTab('active')}
        >
          Active Alarms
        </button>
        <button
          className={activeTab === 'history' ? 'selected' : ''}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <button
          className={activeTab === 'configuration' ? 'selected' : ''}
          onClick={() => setActiveTab('configuration')}
        >
          Configuration
        </button>
      </div>

      {/* ACTIVE ALARMS */}
      {activeTab === 'active' && (
        <section className="alarms-page-content">
          <h2>Active Alarms</h2>

          {activeAlarms.length === 0 ? (
           <p>No active alarms.</p>
          ) : (
            <div className="active-alarms-list">
              {activeAlarms.map((alarm) => (
                <div
                  className="active-alarm-item"
                  key={alarm.id}
                >
                  <div className="active-alarm-info">
                    <span
                      className={`alarm-severity-indicator ${
                        alarm.severity === 'Critical'
                          ? 'critical'
                          : 'warning'
                      }`}
                    />

                    <div>
                      <strong>{alarm.name}</strong>
                      <p>
                        {alarm.source} · {formatTime(alarm.timestamp)}
                      </p>
                      <span className="alarm-severity-label">
                        {alarm.severity}
                      </span>
                    </div>
                  </div>

                  <button
                    className="alarm-acknowledge-button"
                    onClick={() => acknowledgeAlarm(alarm.id)}
                  >
                    {alarm.acknowledged
                      ? 'Acknowledged'
                      : 'Acknowledge'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Alarm History */}
      {activeTab === 'history' && (
        <section className="alarms-page-content">
          <h2>Alarm History</h2>
          <p className="alarms-history-description">
            Simulated alarm records for demostration purposes.
          </p>
          <div className="alarms-history-table">
            <div className="alarms-history-header">
              <span>Alarm</span>
              <span>Source</span>
              <span>Severity</span>
              <span>Condition</span>
              <span>Time</span>
            </div>

            {alarms.map((alarm) => (
              <div className="alarms-history-row" key={alarm.id}>
                <span>{alarm.name}</span>
                <span>{alarm.source}</span>
                <span>{alarm.severity}</span>
                <span>{alarm.condition}</span>
                <span>{formatTime(alarm.timestamp)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Alarm Configuration */}
      {activeTab === 'configuration' && (
        <section className="alarms-page-content">
          <h2>Alarm Configuration</h2>
          <p className="alarms-history-description">
            Simulated configuration preview. Alarm settings are not connected to the hardware.
          </p>

          {/* BUS Alarms */}
          <div className="alarm-config-category">
            <button
              type="button"
              className="alarm-category-header"
              onClick={() => toggleCategory('bus')}
              aria-expanded={expandedCategories.bus}
            >
              <span>Bus Alarms</span>
              <span>{expandedCategories.bus ? '-' : '+'}</span>
            </button>
            {expandedCategories.bus && (
              <div className="alarm-category-content">
                <p>
                  Bus alarm settings will be added after the requirements are finalized.
                </p>
              </div>
            )}
          </div>

          {/* SYSTEM Alarms */}
          <div className="alarm-config-category">
            <button
              type="button"
              className="alarm-category-header"
              onClick={() => toggleCategory('system')}
              aria-expanded={expandedCategories.system}
            >
              <span>System Alarms</span>
              <span>{expandedCategories.system ? '-' : '+'}</span>
            </button>
            {expandedCategories.system && (
              <div className="alarm-category-content">
                <div className="alarm-config-list">
                  {alarms.map((alarm) => (
                    <div className="alarm-config-item" key={alarm.id}>
                      <div>
                        <strong>{alarm.name}</strong>
                        <p>{alarm.source}</p>
                      </div>
                      <div className="alarm-config-details">
                        <div className="alarm-severity-setting">
                        <label htmlFor={`Severity-${alarm.id}`}>
                          Severity : 
                        </label>
                        <select
                          id={`severity-${alarm.id}`}
                          className="alarm-severity-select"
                          value={alarmSeveritySettings[alarm.id]}
                          onChange={(event) => updateAlarmSeverity(alarm.id, event.target.value)}>
                          <option value="Critical">Critical</option>
                          <option value="Major">Major</option>
                          <option value="Warning">Warning</option>
                          <option value="Minor">Minor</option>
                          <option value="Information">Information</option>
                        </select>
                      </div>
                      <div className="alarm-snmp-setting">
                        <label htmlFor={`snmp-${alarm.id}`}>
                          SNMP Notification:
                        </label>
                        <input
                          type="checkbox"
                          id={`snmp-${alarm.id}`}
                          checked={alarmSnmpSettings[alarm.id]}
                          onChange={(event) => updateAlarmSnmp(alarm.id, event.target.checked)
                        }
                        />
                      </div>
                      <span>Threshold: Not Configured</span>

                      {/* Simulated Alarm Test */}
                      <div className="alarm-test-setting">
                        <span className="alarm-test-label">Alarm Test: </span>
                        <button
                          type="button"
                          role="switch"
                          aria-label={`Alarm test for ${alarm.name}`}
                          aria-checked={alarmTestSettings[alarm.id]}
                          className={`alarm-test-toggle ${alarmTestSettings[alarm.id] ? 'on' : 'off' }`}
                          onClick={() => toggleAlarmTest(alarm.id)}
                        >
                          <span className="alarm-test-toggle-slider" />
                        </button>
                        <span className="alarm-test-status">
                          {alarmTestSettings[alarm.id] ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}

export default AlarmsPage