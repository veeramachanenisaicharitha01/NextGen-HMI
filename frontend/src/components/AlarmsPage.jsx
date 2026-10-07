import './AlarmsPage.css'

// ============================================================
// SIMULATED ALARM DATA
// Later this will come from the NextGen backend.
// ============================================================

const alarmData = [
  {
    id: 1,
    severity: 'Critical',
    alarm: 'AC Input Failure',
    status: 'Active',
    time: '10:42 AM'
  },
  {
    id: 2,
    severity: 'Warning',
    alarm: 'High Temperature',
    status: 'Active',
    time: '10:35 AM'
  },
  {
    id: 3,
    severity: 'Warning',
    alarm: 'Battery Voltage Low',
    status: 'Active',
    time: '10:21 AM'
  }
]

function AlarmsPage() {
  return (
    <main className="alarms-page">

      {/* PAGE TITLE */}
      <div className="alarms-page-heading">
        <h1>Alarms</h1>
      </div>

      {/* ACTIVE ALARMS */}
      <section className="alarms-page-content">

        <h2>Active Alarms</h2>

        <div className="alarms-table">

          {/* TABLE HEADER */}
          <div className="alarms-table-header">
            <span>Severity</span>
            <span>Alarm</span>
            <span>Status</span>
            <span>Time</span>
          </div>

          {/* ALARM ROWS */}
          {alarmData.map((alarm) => (
            <div
              className="alarms-table-row"
              key={alarm.id}
            >
              <span>{alarm.severity}</span>
              <span>{alarm.alarm}</span>
              <span>{alarm.status}</span>
              <span>{alarm.time}</span>
            </div>
          ))}

        </div>

      </section>

    </main>
  )
}

export default AlarmsPage