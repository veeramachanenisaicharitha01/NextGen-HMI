import './PowerFlow.css'
import ACSourceIcon from '../icons/ACSourceIcon'
import RectifierIcon from '../icons/RectifierIcon'
import LoadIcon from '../icons/LoadIcon'
import BatteryIcon from '../icons/BatteryIcon'
import TemperatureIcon from '../icons/TemperatureIcon'

function PowerFlow({ 
    systemData,
    selectedEquipment,
    setSelectedEquipment
 }) {
  return (
    <section className="power-section">
      <h2>General</h2>
      <div className="system-diagram">

        {/* MAIN POWER PATH */}
        <div className="main-power-path">
          
          {/* AC SOURCE */}
          <div className="diagram-item">
              <button 
                className={`diagram-icon ac-icon equipment-button ${
                  selectedEquipment === 'AC Source'
                  ? 'equipment-selected'
                  : ''
                }`}
                onClick={() => setSelectedEquipment('AC Source')}
              >
                  <ACSourceIcon />
              </button>
            <div className="diagram-label">
              <strong>AC Source</strong>
              <span>{systemData.acVoltage} V AC</span>
            </div>
          </div>

          {/* AC SOURCE -> RECTIFIERS */}
          <div className="diagram-connection">
            <div className="connection-line"></div>
            <span className="connection-arrow">
              ▶
            </span>
          </div>

          {/* RECTIFIERS */}
          <div className="diagram-item">
              <button 
                className={`diagram-icon ac-icon equipment-button ${
                  selectedEquipment === 'Rectifiers'
                  ? 'equipment-selected'
                  : ''
                }`}
                onClick={() => setSelectedEquipment('Rectifiers')}
              >
                  <RectifierIcon />
              </button>
            <div className="diagram-label">
              <strong>Rectifiers</strong>
              <span>{systemData.rectifierStatus}</span>
            </div>
          </div>

          {/* RECTIFIER -> LOAD WITH BATTERY BRANCH */}
          <div className="diagram-connection battery-branch-area">
            <div className="connection-line"></div>
            <div className="branch-point"></div>
            <div className="battery-branch-line"></div>
            <span className="connection-arrow">
              ▶
            </span>
          </div>

          {/* LOAD */}
          <div className="diagram-item">
              <button 
                className={`diagram-icon ac-icon equipment-button ${
                  selectedEquipment === 'Load'
                  ? 'equipment-selected'
                  : ''
                }`}
                onClick={() => setSelectedEquipment('Load')}
              >
                  <LoadIcon />
              </button>
            <div className="diagram-label">
              <strong>Load</strong>
              <span>{systemData.loadCurrent} A</span>
            </div>
          </div>
        </div>

        {/* Lower System Row */}
        <div className="lower-system-row">
          {/* Temperature */}
          <div className="temperature-position">
            <div className="diagram-item">
                <button 
                className={`diagram-icon ac-icon equipment-button ${
                  selectedEquipment === 'Temperature'
                  ? 'equipment-selected'
                  : ''
                }`}
                onClick={() => setSelectedEquipment('Temperature')}
              >
                  <TemperatureIcon />
              </button>            
                <div className="diagram-label">
                  <strong>Temperature</strong>
                  <span>
                    {systemData.temperature} °C
                  </span>
                </div>
            </div>
          </div>
          {/* Battery */}
          <div className="battery-position">
            <div className="diagram-item">
                <button 
                className={`diagram-icon ac-icon equipment-button ${
                  selectedEquipment === 'Battery'
                  ? 'equipment-selected'
                  : ''
                }`}
                onClick={() => setSelectedEquipment('Battery')}
              >
                  <BatteryIcon />
              </button>
              <div className="diagram-label">
                <strong>Battery</strong>
                <span>{systemData.batteryVoltage} V DC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PowerFlow