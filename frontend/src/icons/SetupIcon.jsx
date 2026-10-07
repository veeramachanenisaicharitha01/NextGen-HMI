function SetupIcon() {
  return (
    <svg viewBox="0 0 48 48" className="system-icon">
      {/* Gear outer shape */}
      <path
        d="
          M20 6
          H28
          L29 11
          C31 12 33 13 35 15
          L40 13
          L44 20
          L40 24
          C40 26 40 28 39 30
          L43 34
          L39 41
          L33 39
          C31 40 29 41 27 42
          L26 46
          H18
          L17 41
          C15 40 13 39 12 37
          L7 39
          L3 32
          L7 28
          C7 26 7 24 8 22
          L4 18
          L8 11
          L14 13
          C16 12 18 11 20 10
          Z"
      />
      {/* Center of gear */}
      <circle cx="24" cy="26" r="7" />
    </svg>
  )
}

export default SetupIcon