export type VariantBackgroundType = "light" | "dark-solid" | "dark-glow" | "white";

interface BackgroundProps {
  variant: VariantBackgroundType;
}

function Background({ variant }: BackgroundProps) {
  const isLight = variant === "light";
  const isDarkGlow = variant === "dark-glow";
  const isWhite = variant === "white";

  return (
    <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
      {/* Light Gradient */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-500 ease-in-out
          bg-gradient-to-b from-primary-100 via-primary-300 to-primary-500
          ${isLight ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Dark Gradient */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-500 ease-in-out
          bg-gradient-to-b from-secondary-950 via-secondary-950 to-secondary-950
          ${isLight ? "opacity-0" : "opacity-100"}
        `}
      />

      {/* Glow 1 */}
      <div
        className={`
          absolute rounded-full top-80 left-2/5 -translate-x-0 md:-translate-x-1/2
          size-300 md:size-130 bg-primary-700 blur-[150px]
          transition-opacity duration-700 ease-in-out
          ${isDarkGlow ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Glow 2 */}
      <div
        className={`
          absolute rounded-full top-80 right-0 -translate-x-1/2
          size-130 bg-primary-900 blur-[200px] hidden md:block
          transition-opacity duration-700 ease-in-out
          ${isDarkGlow ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Glow 3 */}
      <div
        className={`
          absolute rounded-full top-0 left-1/2 -translate-x-1/2
          size-130 bg-primary-800 blur-[100px] hidden md:block
          transition-opacity duration-700 ease-in-out
          ${isDarkGlow ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* White */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-500 ease-in-out
          bg-gradient-to-b from-secondary-50 via-secondary-50 to-secondary-50
          ${isWhite ? "opacity-100" : "opacity-0"}
        `}
      />
    </div>
  );
}

export default Background;
