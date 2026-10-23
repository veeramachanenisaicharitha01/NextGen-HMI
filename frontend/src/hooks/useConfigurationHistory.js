import { useState } from 'react'

// Saved configuration versions, including Version 0 (defaults).

export default function useConfigurationHistory(initialConfiguration) {
  const [history, setHistory] = useState(() => ({
    versions: [structuredClone(initialConfiguration)],
    currentVersionIndex: 0
  }))
  const saveConfiguration = (configuration) => {
    const snapshot = structuredClone(configuration)
    setHistory(previous => ({
      versions: [...previous.versions, snapshot],
      currentVersionIndex: previous.versions.length
    }))
  }
  const undoConfiguration = () => {
    if (history.currentVersionIndex <= 0) return null
    return structuredClone(
      history.versions[history.currentVersionIndex - 1]
    )
  }
  const confirmUndo = () => {
    setHistory(previous => ({
      ...previous,
      currentVersionIndex: Math.max(0, previous.currentVersionIndex - 1)
    }))
  }
  return {
    versions: history.versions,
    currentVersionIndex: history.currentVersionIndex,
    saveConfiguration,
    undoConfiguration,
    confirmUndo,
    canUndo: history.currentVersionIndex > 0
  }
}