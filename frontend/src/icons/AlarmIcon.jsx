function AlarmIcon() {
  return (
    <svg viewBox="0 0 48 48" className="system-icon">
      {/* Bell Body */}
      <path 
        d="
          M12 34 
          H36
          L33 30
          V20
          C33 14 29 10 24 10
          C19 10 15 14 15 20
          V30 Z" />
      <path d="M20 37 C21 41 27 41 28 37" />    {/* Bell Clapper */}
      <path d="M22 10 C22 7 26 7 26 10" />      {/* Bell Topper */}
    </svg>
  )
}

export default AlarmIcon