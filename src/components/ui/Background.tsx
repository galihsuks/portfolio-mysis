import { useEffect } from "react";

export type VariantBackgroundType =
  | "light"
  | "dark-solid"
  | "dark-glow"
  | "white"
  | "pink"
  | "white-navy";

interface BackgroundProps {
  variant: VariantBackgroundType;
}

function Background({ variant }: BackgroundProps) {
  const isLight = variant === "light";
  const isDark = variant === "dark-glow" || variant === "dark-solid";
  const isDarkGlow = variant === "dark-glow";
  const isWhite = variant === "white";
  const isPink = variant === "pink";
  const isWhiteNavy = variant === "white-navy";

  useEffect(() => {
    console.log(variant);
  }, [variant]);

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
          ${isDark ? "opacity-100" : "opacity-0"}
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

      {/* pink */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-500 ease-in-out
          bg-gradient-to-r from-pink-300 to-pink-400
          ${isPink ? "opacity-100" : "opacity-0"}
        `}
      >
        <div
          className={`
          absolute rounded-full top-80 left-2/5 -translate-x-0 md:-translate-x-1/2
          size-300 md:size-130 bg-pink-200 blur-[150px]
          transition-opacity duration-700 ease-in-out opacity-60
        `}
        />
        <div
          className={`
          absolute rounded-full top-0 left-1/2 -translate-x-1/2
          size-130 bg-pink-200 blur-[100px] hidden md:block
          transition-opacity duration-700 ease-in-out opacity-40
        `}
        />
      </div>

      {/* white navy */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-500 ease-in-out
          bg-gradient-to-r from-indigo-200 via-indigo-900 to-indigo-900
          ${isWhiteNavy ? "opacity-100" : "opacity-0"}
        `}
      >
        <div
          className={`
          absolute rounded-full top-80 left-2/5 -translate-x-0 md:-translate-x-1/2
          size-300 md:size-130 bg-indigo-200 blur-[150px]
          transition-opacity duration-700 ease-in-out opacity-60
        `}
        />
        <div
          className={`
          absolute rounded-full top-0 left-1/2 -translate-x-1/2
          size-130 bg-indigo-200 blur-[100px] hidden md:block
          transition-opacity duration-700 ease-in-out opacity-40
        `}
        />
      </div>
    </div>
  );
}

export default Background;
