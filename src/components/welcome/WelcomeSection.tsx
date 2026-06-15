import type { RefObject } from "react";
import type { CategoryId, CategoryLabel } from "../../data/categories";

type WelcomeSectionProps = {
  labels: CategoryLabel[];
  onCategorySelect: (category: CategoryId) => void;
  onCategoryHoverChange: (isHovering: boolean) => void;
  setLabelRef: (element: HTMLButtonElement | null) => void;
  containerRef: RefObject<HTMLElement | null>;
  heroContentRef: RefObject<HTMLDivElement | null>;
  portfolioRef: RefObject<HTMLDivElement | null>;
  amaliaRef: RefObject<HTMLDivElement | null>;
  glowTopRef: RefObject<HTMLDivElement | null>;
  glowBottomRef: RefObject<HTMLDivElement | null>;
  isTransitioning: boolean;
  isCategoryHovered: boolean;
};

export default function WelcomeSection({
  labels,
  onCategorySelect,
  onCategoryHoverChange,
  setLabelRef,
  containerRef,
  heroContentRef,
  portfolioRef,
  amaliaRef,
  glowTopRef,
  glowBottomRef,
  isTransitioning,
  isCategoryHovered,
}: WelcomeSectionProps) {
  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden transition-colors duration-500 z-[1] ${
        isCategoryHovered
          ? "bg-secondary-950"
          : "bg-gradient-to-b from-primary-100 via-primary-300 to-primary-500"
      }`}
    >
      <div
        ref={glowTopRef}
        className={`pointer-events-none absolute left-[-8%] top-[-16%] z-0 h-[32rem] w-[32rem] rounded-full bg-white/35 blur-3xl transition-opacity duration-500 ${
          isCategoryHovered ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={glowBottomRef}
        className={`pointer-events-none absolute bottom-[-22%] right-[-10%] z-0 h-[30rem] w-[30rem] rounded-full bg-primary-400/40 blur-3xl transition-opacity duration-500 ${
          isCategoryHovered ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 z-10 bg-secondary-950 transition-opacity duration-500 ${
          isCategoryHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div ref={heroContentRef} className="absolute inset-0 z-20">
        {labels.map((label, index) => (
          <button
            key={`${label.id}-${label.text}-${index}`}
            ref={setLabelRef}
            type="button"
            disabled={isTransitioning}
            onClick={() => onCategorySelect(label.id)}
            onMouseEnter={() => onCategoryHoverChange(true)}
            onMouseLeave={() => onCategoryHoverChange(false)}
            onFocus={() => onCategoryHoverChange(true)}
            onBlur={() => onCategoryHoverChange(false)}
            className={`inter-font absolute z-20 m-0 whitespace-pre-line bg-transparent p-0 text-left leading-[0.98] font-normal tracking-[-0.03em] transition-[filter,transform,opacity,color] duration-500 ease-out hover:scale-[1.03] hover:blur-none focus-visible:scale-[1.03] focus-visible:blur-none focus-visible:outline-none disabled:pointer-events-none ${
              isCategoryHovered ? "text-primary-500" : "text-secondary-950"
            } ${label.className} ${label.blurClassName} max-sm:text-[0.95rem]`}
            aria-label={label.text.replaceAll("\n", " ")}
          >
            {label.text}
          </button>
        ))}

        <div
          ref={portfolioRef}
          className={`absolute left-[29%] top-[40%] z-20 flex items-baseline leading-[0.85] transition-colors duration-500 max-[900px]:left-[17%] max-[900px]:top-[37%] max-sm:left-[8%] max-sm:top-[36%] ${
            isCategoryHovered ? "text-primary-500" : "text-secondary-950"
          }`}
        >
          <span className="kapakana-font text-[clamp(7rem,13vw,12rem)] leading-[0.75]">P</span>
          <span className="inter-font text-[clamp(3rem,5.7vw,5.25rem)] font-normal tracking-[-0.05em]">
            ort
          </span>
          <span className="jersey-font ml-[0.2rem] text-[clamp(3rem,5.7vw,5.25rem)]">folio</span>
        </div>

        <div
          ref={amaliaRef}
          className={`absolute left-[44%] top-[54%] z-20 flex items-baseline leading-[0.85] transition-colors duration-500 max-[900px]:left-[30%] max-[900px]:top-[49%] max-sm:left-[22%] max-sm:top-[48%] ${
            isCategoryHovered ? "text-primary-500" : "text-secondary-950"
          }`}
        >
          <span className="kapakana-font text-[clamp(7rem,13vw,12rem)] leading-[0.75]">A</span>
          <span className="inter-font text-[clamp(3rem,5.7vw,5.25rem)] font-normal tracking-[-0.05em]">
            malia
          </span>
        </div>
      </div>
    </section>
  );
}
