function RectifierIcon() {
  return (
    <div className="rectifier-combo-icon">
      {/* AC symbol - upper left */}
      <svg
        viewBox="0 0 48 48"
        className="rectifier-ac-symbol"
      >
        <circle cx="24" cy="24" r="18" />
        <path
          d="M10 24
             C14 14, 20 14, 24 24
             C28 34, 34 34, 38 24"
        />
      </svg>

      {/* Slash between the two symbols */}
      <span className="rectifier-slash"></span>

      {/* Rectifier symbol - lower right */}
      <svg
        viewBox="0 0 48 48"
        className="rectifier-unit-symbol"
      >
        <rect
          x="7"
          y="9"
          width="34"
          height="30"
          rx="3"
        />
        <path d="M12 18 H36" />
        <path d="M12 25 H36" />
        <path 
          d="M12 32 H28" 
          strokeDasharray="2 3" 
          strokeLinecap="round"
        />
        <circle cx="34" cy="32" r="2" />
      </svg>
    </div>
  )
}

export default RectifierIcon