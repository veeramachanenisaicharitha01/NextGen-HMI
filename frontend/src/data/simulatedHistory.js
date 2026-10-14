/* ============================================================
   NEXTGEN POWER - SIMULATED HISTORICAL DATA
   Generates 24 hours of sample measurements.
   Development/testing only.
   ============================================================ */

const MINUTES_IN_24_HOURS = 24 * 60

// Fixed reference time for repeatable testing
const endTime = new Date(2026, 9, 12, 12, 0, 0)
export const simulatedHistory = Array.from(
  { length: MINUTES_IN_24_HOURS + 1 },
  (_, index) => {
    const timestamp = new Date( endTime.getTime() - (MINUTES_IN_24_HOURS - index) * 60 * 1000)
    
    // Smooth, predictable variations for testing
    const slowChange = Math.sin(index / 90)
    const fastChange = Math.sin(index / 12)
    return {
      timestamp: timestamp.toISOString(),
      voltage: Number((54 + slowChange * 1.5 + fastChange * 0.3).toFixed(2)),
      current: Number((24 + slowChange * 5 + fastChange * 2).toFixed(2)),
      soc: Number((80 + Math.sin(index / 200) * 12).toFixed(2)),
      rectifierCurrent: Number((30 + slowChange * 4 + fastChange * 1.5).toFixed(2)),
      loadCurrent: Number((25 + slowChange * 3 + fastChange * 2).toFixed(2)),
      batteryDischarge: Number((4 + slowChange * 1.5 + fastChange * 0.5).toFixed(2))
    }
  }
)