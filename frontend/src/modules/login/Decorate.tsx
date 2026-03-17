export const Decorate = () => {
  return (
    <>
      {/* Decorative wave corner - top right */}
      <svg
        className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none"
        viewBox="0 0 200 200"
      >
        <path d="M200,0 Q150,50 200,100 L200,0 Z" fill="url(#cornerGradient)" />
        <defs>
          <linearGradient
            id="cornerGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1F88E8" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Decorative wave corner - bottom left */}
      <svg
        className="absolute bottom-0 left-0 w-64 h-64 opacity-20 pointer-events-none"
        viewBox="0 0 200 200"
      >
        <path d="M0,200 Q50,150 0,100 L0,200 Z" fill="url(#cornerGradient2)" />
        <defs>
          <linearGradient
            id="cornerGradient2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#1F88E8" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};
