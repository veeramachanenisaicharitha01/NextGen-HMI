import './Header.css'

import OverviewIcon from '../icons/OverviewIcon'
import GraphIcon from '../icons/GraphIcon'
import AlarmIcon from '../icons/AlarmIcon'
import SetupIcon from '../icons/SetupIcon'
import ChargeIcon from '../icons/ChargeIcon'
import DataIcon from '../icons/DataIcon'
import InfoIcon from '../icons/InfoIcon'
import HelpIcon from '../icons/HelpIcon'
import UserIcon from '../icons/UserIcon'
import BackIcon from '../icons/BackIcon'
import ForwardIcon from '../icons/ForwardIcon'
import UndoIcon from '../icons/UndoIcon'
import SaveIcon from '../icons/SaveIcon'

import newmarLogo from '../assets/newmar-logo.png'


function Header({
  selectedPage,
  selectedEquipment,
  setSelectedPage,
  setSelectedEquipment,
  navigateToPage,
  goToOverview,
  goBack,
  goForward,
  canGoBack,
  canGoForward,
  onUndo,
  onSave,
  canUndo = false,
  canSave = false
}) {

  const showOverviewMenu = selectedPage === 'Overview' && selectedEquipment === 'Overview'
  return (
    <header className="hmi-header">
      {/* PRODUCT LOGO */}
      <div className="header-brand">
        <img
          src={newmarLogo}
          alt="Newmar"
          className="newmar-logo"
        />
      </div>

      {/* HEADER NAVIGATION BUTTONS */}
      <div className="header-buttons">
        {/* OVERVIEW BUTTON */}
        <button
          className={`header-button ${
            selectedPage === 'Overview' ? 'selected' : ''
          }`}
          onClick={goToOverview}
        >
          <OverviewIcon />
          <span>Overview</span>
        </button>

        {/* DEFAULT OVERVIEW MENU */}
        {showOverviewMenu && (
          <>
            <button
              className="header-button"
              onClick={() => navigateToPage('Graph')}
            >
              <GraphIcon />
              <span>Graph</span>
            </button>
            <button
              className="header-button"
              onClick={() => navigateToPage('Alarms')}
            >
              <AlarmIcon />
              <span>Alarms</span>
            </button>
            <button
              className="header-button"
              onClick={() => navigateToPage('Setup')}
            >
              <SetupIcon />
              <span>Setup</span>
            </button>
            <button
              className="header-button"
              onClick={() => navigateToPage('Charge')}
            >
              <ChargeIcon />
              <span>Charge</span>
            </button>
            <button
              className="header-button"
              onClick={() => navigateToPage('Data')}
            >
              <DataIcon />
              <span>Data</span>
            </button>
            <button
              className="header-button"
              onClick={() => navigateToPage('Info')}
            >
              <InfoIcon />
              <span>Info</span>
            </button>
            <button
              className="header-button"
              onClick={() => navigateToPage('Help')}
            >
              <HelpIcon />
              <span>Help</span>
            </button>
          </>
        )}

        {/*SECONDARY PAGE MENU */}
        {/* Global Action Buttons */}
        {!showOverviewMenu && (
          <>
            <button 
              className="header-button"
              onClick={goBack}
              disabled={!canGoBack}
            >
              <BackIcon />
              <span>Back</span>
            </button>
            <button 
              className="header-button"
              onClick={goForward}
              disabled={!canGoForward}
            >
              <ForwardIcon />
              <span>Forward</span>
            </button>
            <button 
              className="header-button"
              onClick={onUndo}
              disabled={!canUndo}
            >
              <UndoIcon />
              <span>Undo</span>
            </button>
            <button 
              className="header-button"
              onClick={onSave}
              disabled={!canSave}
            >
              <SaveIcon />
              <span>Save</span>
            </button>
          </>
        )}
      </div>

      {/* USER AREA */}
      <div className="header-user">
        <button
          className={`header-button ${
            selectedPage === 'User' ? 'selected' : ''
          }`}
          onClick={() => setSelectedPage('User')}
        >
          <UserIcon />
          <span>User</span>
        </button>

        {/* USER DETAILS */}
        <div
          className="user-information"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '3px',
            color: 'white',
          }}
        >
          <span className="user-name">MCE</span>
          <span className="user-location">
            Costa Mesa
          </span>
          <span className="user-role">
            Admin
          </span>
          <span className="user-datetime">
            10/02/2026 4:15pm
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header