export function CircuitBoardPattern({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="circuit" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="scale(0.5)">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="0" cy="100" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50,0 L50,100" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,50 L100,50" stroke="currentColor" strokeWidth="0.5" />
          <path d="M25,0 L25,25 L0,25" stroke="currentColor" strokeWidth="0.5" />
          <path d="M75,0 L75,25 L100,25" stroke="currentColor" strokeWidth="0.5" />
          <path d="M25,100 L25,75 L0,75" stroke="currentColor" strokeWidth="0.5" />
          <path d="M75,100 L75,75 L100,75" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="25" cy="25" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="75" cy="25" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="25" cy="75" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="75" cy="75" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  )
}
