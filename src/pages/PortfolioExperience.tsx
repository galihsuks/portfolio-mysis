import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import WelcomeSection, {
  type WelcomeSectionHandle,
} from "../components/welcome/WelcomeSection";
import CategorySection, {
  type CategorySectionHandle,
} from "../components/sections/CategorySection";
import { categoryLabels, type CategoryId } from "../data/categories";

export default function PortfolioExperience() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const welcomeSectionRef = useRef<WelcomeSectionHandle | null>(null);
  const detailSectionRef = useRef<CategorySectionHandle | null>(null);
  const transitioningRef = useRef(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {}, shellRef);
    return () => ctx.revert();
  }, []);

  const animateToCategory = (category: CategoryId) => {
    const detailSectionElement = detailSectionRef.current?.getSectionElement();

    if (
      transitioningRef.current ||
      !welcomeSectionRef.current?.canNavigate() ||
      !detailSectionElement
    ) {
      return;
    }

    transitioningRef.current = true;
    welcomeSectionRef.current.resetSceneState();
    setIsTransitioning(true);
    setActiveCategory(category);

    requestAnimationFrame(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          transitioningRef.current = false;
          setIsTransitioning(false);
        },
      });

      welcomeSectionRef.current?.appendTransitionToTimeline(timeline, "out");
      timeline.to(
        detailSectionElement,
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
        },
        0.1,
      );
    });
  };

  const animateBackToWelcome = () => {
    const detailSectionElement = detailSectionRef.current?.getSectionElement();

    if (transitioningRef.current || !detailSectionElement) {
      return;
    }

    transitioningRef.current = true;
    setIsTransitioning(true);

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        transitioningRef.current = false;
        setActiveCategory(null);
        setIsTransitioning(false);
      },
    });

    timeline.to(
      detailSectionElement,
      {
        yPercent: 100,
        scale: 0.94,
        opacity: 0.45,
        duration: 1.1,
      },
      0,
    );

    welcomeSectionRef.current?.appendTransitionToTimeline(timeline, "in");
  };

  return (
    <main className="h-screen w-full overflow-hidden bg-secondary-50 text-secondary-950">
      <div ref={shellRef} className="relative h-full w-full overflow-hidden">
        <WelcomeSection
          ref={welcomeSectionRef}
          labels={categoryLabels}
          onCategorySelect={animateToCategory}
          isTransitioning={isTransitioning}
        />

        <CategorySection
          ref={detailSectionRef}
          activeCategory={activeCategory}
          onBack={animateBackToWelcome}
          isTransitioning={isTransitioning}
        />
      </div>
    </main>
  );
}
