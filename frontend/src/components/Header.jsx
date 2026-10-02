import ACSourceIcon from '../icons/ACSourceIcon'
import RectifierIcon from '../icons/RectifierIcon'
import LoadIcon from '../icons/LoadIcon'
import BatteryIcon from '../icons/BatteryIcon'
import TemperatureIcon from '../icons/TemperatureIcon'
import AlarmIcon from '../icons/AlarmIcon'


function Header({
  systemData,
  selectedSection,
  setSelectedSection
}) {
  return (
    <header className="hmi-header">

      {/* PRODUCT NAME */}
      <div className="header-brand">
        <h1>NextGen Power</h1>
        <p>System Overview</p>
      </div>


      {/* ACTIVE AREA */}
      <div className="active-area">

        {/* AC SOURCE */}
        <button
          className={`header-icon ${
            selectedSection === 'AC Source' ? 'selected' : ''
          }`}
          onClick={() => setSelectedSection('AC Source')}
        >
          <div className="icon-symbol">
            <ACSourceIcon />
          </div>

          <div className="header-icon-text">
            <span className="icon-title">AC Source</span>
            <span className="icon-value">
              {systemData.acVoltage} V
            </span>
          </div>
        </button>


        {/* RECTIFIERS */}
        <button
          className={`header-icon ${
            selectedSection === 'Rectifiers' ? 'selected' : ''
          }`}
          onClick={() => setSelectedSection('Rectifiers')}
        >
          <div className="icon-symbol">
            <RectifierIcon />
          </div>

          <div className="header-icon-text">
            <span className="icon-title">Rectifiers</span>
            <span className="icon-value">
              {systemData.rectifierStatus}
            </span>
          </div>
        </button>


        {/* LOAD */}
        <button
          className={`header-icon ${
            selectedSection === 'Load' ? 'selected' : ''
          }`}
          onClick={() => setSelectedSection('Load')}
        >
          <div className="icon-symbol">
            <LoadIcon />
          </div>

          <div className="header-icon-text">
            <span className="icon-title">Load</span>
            <span className="icon-value">
              {systemData.loadCurrent} A
            </span>
          </div>
        </button>


        {/* BATTERY */}
        <button
          className={`header-icon ${
            selectedSection === 'Battery' ? 'selected' : ''
          }`}
          onClick={() => setSelectedSection('Battery')}
        >
          <div className="icon-symbol">
            <BatteryIcon />
          </div>

          <div className="header-icon-text">
            <span className="icon-title">Battery</span>
            <span className="icon-value">
              {systemData.batteryVoltage} V
            </span>
          </div>
        </button>


        {/* TEMPERATURE */}
        <button
          className={`header-icon ${
            selectedSection === 'Temperature' ? 'selected' : ''
          }`}
          onClick={() => setSelectedSection('Temperature')}
        >
          <div className="icon-symbol">
            <TemperatureIcon />
          </div>

          <div className="header-icon-text">
            <span className="icon-title">Temperature</span>
            <span className="icon-value">
              {systemData.temperature} °C
            </span>
          </div>
        </button>


        {/* ALARMS */}
        <button
          className={`header-icon ${
            selectedSection === 'Active Alarms' ? 'selected' : ''
          }`}
          onClick={() => setSelectedSection('Active Alarms')}
        >
          <div className="icon-symbol">
            <AlarmIcon />
          </div>

          <div className="header-icon-text">
            <span className="icon-title">Alarms</span>
            <span className="icon-value">
              {systemData.activeAlarms}
            </span>
          </div>
        </button>

      </div>

    </header>
  )
}

export default Header