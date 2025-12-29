const LoaderScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">

      {/* Loader container */}
      <div className="relative">
        {/* Outer ring */}
        <div className="size-24 rounded-full border-4 border-white/10 animate-pulse" />
        
        {/* Spinning ring 1 */}
        <div className="absolute inset-0 size-24 rounded-full border-4 border-transparent border-t-primary animate-spin" style={{ animationDuration: '1s' }} />
        
        {/* Spinning ring 2 */}
        <div className="absolute inset-2 size-20 rounded-full border-4 border-transparent border-r-chart-2 animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }} />
        
        {/* Spinning ring 3 */}
        <div className="absolute inset-4 size-16 rounded-full border-4 border-transparent border-b-chart-4 animate-spin" style={{ animationDuration: '1.2s' }} />
        
        {/* Center dot with glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-4 rounded-full bg-linear-to-r from-chart-1 to-chart-2 animate-pulse shadow-lg shadow-purple-500/50" />
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-lg font-medium tracking-wide animate-pulse">
          Loading
        </p>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-2 rounded-full bg-chart-1 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-sm mt-2">
          Please wait...
        </p>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute size-2 rounded-full bg-white/20 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-25px) translateX(5px);
            opacity: 0.4;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoaderScreen;

