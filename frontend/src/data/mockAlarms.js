
// ============================================================
// NEXTGEN POWER - SIMULATED ALARM DATA
// These are example alarms, NOT approved alarm definitions.
// No actual hardware is connected.
// ============================================================

export const mockAlarms = [
  {
    id: 1,
    source: 'AC Input',
    name: 'AC Input Failure',
    severity: 'Critical',
    condition: 'Active',
    acknowledged: false,
    timestamp: '2026-10-16T10:42:00'
  },
  {
    id: 2,
    source: 'Temperature Sensor',
    name: 'High Temperature',
    severity: 'Warning',
    condition: 'Active',
    acknowledged: false,
    timestamp: '2026-10-16T10:35:00'
  },
  {
    id: 3,
    source: 'Battery',
    name: 'Battery Voltage Low',
    severity: 'Warning',
    condition: 'Active',
    acknowledged: false,
    timestamp: '2026-10-16T10:21:00'
  },
  {
    id: 4,
    source: 'Rectifier 1',
    name: 'Rectifier Communication Lost',
    severity: 'Warning',
    condition: 'Cleared',
    acknowledged: true,
    timestamp: '2026-10-16T09:15:00'
  }
]