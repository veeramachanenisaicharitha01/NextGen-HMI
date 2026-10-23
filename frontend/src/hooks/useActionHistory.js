import { useState } from 'react'

// Back and Forward track navigation and unsaved changes.
// Committed configurations are protected from Back/Forward.

export default function useActionHistory(initialState) {
  const [history, setHistory] = useState(() => ({
    past: [],
    present: initialState,
    future: []
  }))
  const recordAction = (newState) => {
    setHistory(previous => {
      const nextState =
        typeof newState === 'function'
          ? newState(previous.present)
          : newState
      if (JSON.stringify(nextState) === JSON.stringify(previous.present)) {
        return previous
      }
      return {
        past: [...previous.past, previous.present],
        present: nextState,
        future: []
      }
    })
  }
  const goBack = () => {
    setHistory(previous => {
      if (previous.past.length === 0) return previous
      return {
        past: previous.past.slice(0, -1),
        present: previous.past[previous.past.length - 1],
        future: [previous.present, ...previous.future]
      }
    })
  }
  const goForward = () => {
    setHistory(previous => {
      if (previous.future.length === 0) return previous

      return {
        past: [...previous.past, previous.present],
        present: previous.future[0],
        future: previous.future.slice(1)
      }
    })
  }

  // Apply saved configuration to every history entry.
  // Keep navigation and equipment selection unchanged.
  const commitConfiguration = (configuration) => {
    const apply = (state) => ({
      ...state,
      overview: {
        ...state.overview,
        measurements: [...configuration.overview.measurements],
        timeRange: configuration.overview.timeRange
      },
      graph: structuredClone(configuration.graph)
    })
    setHistory(previous => ({
      past: previous.past.map(apply),
      present: apply(previous.present),
      future: previous.future.map(apply)
    }))
  }
  return {
    state: history.present,
    recordAction,
    goBack,
    goForward,
    commitConfiguration,
    canGoBack: history.past.length > 0,
    canGoForward: history.future.length > 0
  }
}