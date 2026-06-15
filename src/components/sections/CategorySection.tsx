import type { RefObject } from "react";
import type { CategoryId } from "../../data/categories";
import { categoryContent } from "../../data/categories";

type CategorySectionProps = {
  activeCategory: CategoryId | null;
  sectionRef: RefObject<HTMLElement | null>;
  onBack: () => void;
  isTransitioning: boolean;
};

export default function CategorySection({
  activeCategory,
  sectionRef,
  onBack,
  isTransitioning,
}: CategorySectionProps) {
  const content = activeCategory ? categoryContent[activeCategory] : null;

  return (
    <section
      ref={sectionRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-secondary-950 px-6 py-16 text-secondary-50 z-[2]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <p className="inter-font text-sm uppercase tracking-[0.4em] text-primary-300">
            {content?.eyebrow ?? "Selected Section"}
          </p>
          <button
            type="button"
            onClick={onBack}
            disabled={isTransitioning}
            className="inter-font rounded-full border border-secondary-700 px-5 py-2 text-sm tracking-[0.18em] text-secondary-200 transition-colors duration-300 hover:border-primary-300 hover:text-primary-200 focus-visible:outline-none disabled:pointer-events-none"
          >
            Back
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <h2 className="inter-font max-w-4xl text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.06em]">
            {content?.title ?? "Choose one category to continue."}
          </h2>
          <p className="inter-font max-w-xl text-base leading-relaxed text-secondary-300 sm:text-lg">
            {content?.description ??
              "Bagian ini nanti kita isi sesuai kategori yang dipilih dari WelcomePage."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[2rem] border border-secondary-800 bg-secondary-900/70 p-6 backdrop-blur-sm">
            <p className="inter-font text-xs uppercase tracking-[0.32em] text-primary-300">
              Transition
            </p>
            <p className="mt-3 inter-font text-lg text-secondary-100">
              Camera-down illusion with layered parallax.
            </p>
          </div>
          <div className="rounded-[2rem] border border-secondary-800 bg-secondary-900/70 p-6 backdrop-blur-sm">
            <p className="inter-font text-xs uppercase tracking-[0.32em] text-primary-300">
              Layout
            </p>
            <p className="mt-3 inter-font text-lg text-secondary-100">
              Full-screen section without native page scroll.
            </p>
          </div>
          <div className="rounded-[2rem] border border-secondary-800 bg-secondary-900/70 p-6 backdrop-blur-sm">
            <p className="inter-font text-xs uppercase tracking-[0.32em] text-primary-300">Next</p>
            <p className="mt-3 inter-font text-lg text-secondary-100">
              Tinggal kita isi gallery, CV, atau case study beneran.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
