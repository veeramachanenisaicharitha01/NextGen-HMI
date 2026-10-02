function DetailsPanel({ selectedSection, systemData }) {

  return (
    <section className="details-section">

      <h2>{selectedSection} Details</h2>


      {/* OVERVIEW */}
      {selectedSection === 'Overview' && (
        <div className="details-content">

          <p>
            Select a system section above to view more information.
          </p>

        </div>
      )}


      {/* AC SOURCE */}
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


      {/* RECTIFIERS */}
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


      {/* LOAD */}
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


      {/* BATTERY */}
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


      {/* TEMPERATURE */}
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


      {/* ACTIVE ALARMS */}
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
  )
}


export default DetailsPanel