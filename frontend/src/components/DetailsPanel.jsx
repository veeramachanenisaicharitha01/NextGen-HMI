import './DetailsPanel.css'

function DetailsPanel({
  selectedEquipment,
  systemData
}) {
  return (
    <section className="details-section">
      {/* PANEL TITLE */}
      <h2>
        {selectedEquipment === 'Overview'
          ? 'Control Gate Distribution'
          : `${selectedEquipment} Details`}
      </h2>

      {/* OVERVIEW / CONTROLGATE DISTRIBUTION */}
      {selectedEquipment === 'Overview' && (
        <div className="details-content">
          <div className="distribution-table">
            {/* TABLE HEADER */}
            <div className="distribution-header">
              <span>Channel</span>
              <span>Status</span>
              <span>Current</span>
            </div>

            {/* LOAD 1 */}
            <div className="distribution-row">
              <span>Load 1</span>
              <span>ON</span>
              <span>12.4 A</span>
            </div>

            {/* LOAD 2 */}
            <div className="distribution-row">
              <span>Load 2</span>
              <span>ON</span>
              <span>8.7 A</span>
            </div>

            {/* LOAD 3 */}
            <div className="distribution-row">
              <span>Load 3</span>
              <span>OFF</span>
              <span>0.0 A</span>
            </div>

            {/* LOAD 4 */}
            <div className="distribution-row">
              <span>Load 4</span>
              <span>ON</span>
              <span>3.4 A</span>
            </div>
          </div>
        </div>
      )}

      {/* AC SOURCE DETAILS */}

      {selectedEquipment === 'AC Source' && (
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

      {/* RECTIFIER DETAILS */}
      {selectedEquipment === 'Rectifiers' && (
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

      {/* LOAD DETAILS */}
      {selectedEquipment === 'Load' && (
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

      {/* BATTERY DETAILS */}
      {selectedEquipment === 'Battery' && (
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

      {/* TEMPERATURE DETAILS */}
      {selectedEquipment === 'Temperature' && (
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
    </section>
  )
}


export default DetailsPanel