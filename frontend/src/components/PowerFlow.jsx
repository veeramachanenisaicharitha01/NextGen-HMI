import ACSourceIcon from '../icons/ACSourceIcon'
import RectifierIcon from '../icons/RectifierIcon'
import LoadIcon from '../icons/LoadIcon'
import BatteryIcon from '../icons/BatteryIcon'


function PowerFlow({ systemData }) {
  return (
    <section className="power-section">

      <h2>System Power Flow</h2>

      <div className="system-diagram">

        {/* MAIN POWER PATH */}
        <div className="main-power-path">


          {/* AC SOURCE */}
          <div className="diagram-item">

            <div className="diagram-icon ac-icon">
              <ACSourceIcon />
            </div>

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

            <div className="diagram-icon rectifier-icon">
              <RectifierIcon />
            </div>

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

            <div className="diagram-icon load-icon">
              <LoadIcon />
            </div>

            <div className="diagram-label">
              <strong>Load</strong>
              <span>{systemData.loadCurrent} A</span>
            </div>

          </div>

        </div>


        {/* BATTERY */}
        <div className="battery-row">

          <div className="diagram-item">

            <div className="diagram-icon battery-icon">
              <BatteryIcon />
            </div>

            <div className="diagram-label">
              <strong>Battery</strong>
              <span>{systemData.batteryVoltage} V DC</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}


export default PowerFlow