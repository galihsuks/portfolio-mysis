interface GreetingProps {
  hide: boolean;
  progress?: number;
}

function Greeting({ hide, progress = 0 }: GreetingProps) {
  return (
    <div
      className={`fixed inset-0 z-[99] flex overflow-hidden bg-white transition-opacity duration-700 ${
        hide ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
      }`}
      aria-hidden={hide}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(64,255,30,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(244,255,240,1)_100%)]" />
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 text-center text-secondary-950">
        <p className="inter-font text-[5svh] leading-none tracking-[-0.05em]">Hi! I&apos;m Amel.</p>
        <p className="mt-3 text-[1.5svh] uppercase tracking-[0.32em] text-secondary-950/55">
          Preparing the archive
        </p>

        <div className="mt-[7svh] w-full max-w-[22rem]">
          <div className="h-[0.45rem] overflow-hidden rounded-full bg-secondary-950/8">
            <div
              className="h-full rounded-full bg-primary-500 transition-[width] duration-300 ease-out"
              style={{ width: `${Math.max(6, Math.min(progress, 100))}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[1.35svh] text-secondary-950/62">
            <span>Loading files...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Greeting;
