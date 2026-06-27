export type VariantBackgroundType = "light" | "dark-solid" | "dark-glow";

interface BackgroundProps {
  variant: VariantBackgroundType;
}

function Background({ variant }: BackgroundProps) {
  return (
    <div
      className={`fixed inset-0 overflow-hidden -z-20 pointer-events-none transition-all duration-500 ${variant === "light" ? "bg-gradient-to-b from-primary-100 via-primary-300 to-primary-500" : "bg-secondary-950"}`}
    >
      <div
        className={`transition-all duration-500 absolute rounded-full top-80 left-2/5 -translate-x-0 md:-translate-x-1/2 size-300 md:size-130 bg-primary-700 blur-[150px] ${variant === "dark-glow" ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`transition-all duration-500 absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-primary-900 blur-[200px] hidden md:block ${variant === "dark-glow" ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`transition-all duration-500 absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-primary-800 blur-[100px] hidden md:block ${variant === "dark-glow" ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default Background;
