import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import WelcomeSection from "../components/welcome/WelcomeSection";
import CategorySection from "../components/sections/CategorySection";
import { categoryLabels, type CategoryId } from "../data/categories";

export default function PortfolioExperience() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const welcomeSectionRef = useRef<HTMLElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);
  const amaliaRef = useRef<HTMLDivElement | null>(null);
  const glowTopRef = useRef<HTMLDivElement | null>(null);
  const glowBottomRef = useRef<HTMLDivElement | null>(null);
  const detailSectionRef = useRef<HTMLElement | null>(null);
  const labelRefs = useRef<HTMLButtonElement[]>([]);
  const introCompletedRef = useRef(false);
  const transitioningRef = useRef(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);

  labelRefs.current = [];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (
      mediaQuery.matches ||
      !welcomeSectionRef.current ||
      !heroContentRef.current ||
      !portfolioRef.current ||
      !amaliaRef.current ||
      !detailSectionRef.current
    ) {
      introCompletedRef.current = true;
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (
        !introCompletedRef.current ||
        transitioningRef.current ||
        !welcomeSectionRef.current ||
        !portfolioRef.current ||
        !amaliaRef.current
      ) {
        return;
      }

      const bounds = welcomeSectionRef.current.getBoundingClientRect();
      const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
      const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;

      labelRefs.current.forEach((label, index) => {
        const drift = categoryLabels[index]?.drift ?? 16;

        gsap.to(label, {
          xPercent: xRatio * drift,
          yPercent: yRatio * drift,
          duration: 0.9,
          ease: "power3.out",
          overwrite: true,
        });
      });

      gsap.to(portfolioRef.current, {
        xPercent: xRatio * 6,
        yPercent: yRatio * 5,
        duration: 1.1,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(amaliaRef.current, {
        xPercent: xRatio * 7,
        yPercent: yRatio * 6,
        duration: 1.15,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(labelRefs.current, {
        xPercent: 0,
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to([portfolioRef.current, amaliaRef.current], {
        xPercent: 0,
        yPercent: 0,
        duration: 1.1,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(detailSectionRef.current, {
        yPercent: 100,
        scale: 0.94,
        opacity: 0.45,
      });

      gsap.set([portfolioRef.current, amaliaRef.current], {
        opacity: 0,
        y: 36,
      });

      gsap.set(labelRefs.current, {
        opacity: 0,
        y: 18,
      });

      const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTimeline
        .to(portfolioRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.1,
        })
        .to(
          amaliaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
          },
          "-=0.75",
        )
        .to(
          labelRefs.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.06,
          },
          "-=0.55",
        )
        .call(() => {
          introCompletedRef.current = true;
        });

      if (glowTopRef.current && glowBottomRef.current) {
        gsap.to(glowTopRef.current, {
          yPercent: -4,
          xPercent: 3,
          scale: 1.04,
          duration: 5.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(glowBottomRef.current, {
          yPercent: 5,
          xPercent: -2,
          scale: 1.05,
          duration: 6.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, shellRef);

    welcomeSectionRef.current.addEventListener("mousemove", handleMouseMove);
    welcomeSectionRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      introCompletedRef.current = false;
      setIsCategoryHovered(false);
      welcomeSectionRef.current?.removeEventListener("mousemove", handleMouseMove);
      welcomeSectionRef.current?.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      ctx.revert();
    };
  }, []);

  const setLabelRef = (element: HTMLButtonElement | null) => {
    if (element) {
      labelRefs.current.push(element);
    }
  };

  const animateToCategory = (category: CategoryId) => {
    if (
      transitioningRef.current ||
      !introCompletedRef.current ||
      !heroContentRef.current ||
      !detailSectionRef.current
    ) {
      return;
    }

    transitioningRef.current = true;
    setIsCategoryHovered(false);
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

      timeline
        .to(
          heroContentRef.current,
          {
            yPercent: -22,
            scale: 0.95,
            opacity: 0.45,
            duration: 1.15,
          },
          0,
        )
        .to(
          [glowTopRef.current, glowBottomRef.current],
          {
            yPercent: -10,
            opacity: 0.25,
            duration: 1.1,
          },
          0,
        )
        .to(
          detailSectionRef.current,
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
    if (
      transitioningRef.current ||
      !heroContentRef.current ||
      !detailSectionRef.current
    ) {
      return;
    }

    transitioningRef.current = true;
    setIsCategoryHovered(false);
    setIsTransitioning(true);

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        transitioningRef.current = false;
        setActiveCategory(null);
        setIsTransitioning(false);
      },
    });

    timeline
      .to(
        detailSectionRef.current,
        {
          yPercent: 100,
          scale: 0.94,
          opacity: 0.45,
          duration: 1.1,
        },
        0,
      )
      .to(
        heroContentRef.current,
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1.05,
        },
        0.1,
      )
      .to(
        [glowTopRef.current, glowBottomRef.current],
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
        },
        0.1,
      );
  };

  return (
    <main className="h-screen w-full overflow-hidden bg-secondary-50 text-secondary-950">
      <div ref={shellRef} className="relative h-full w-full overflow-hidden">
        <WelcomeSection
          labels={categoryLabels}
          onCategorySelect={animateToCategory}
          onCategoryHoverChange={setIsCategoryHovered}
          setLabelRef={setLabelRef}
          containerRef={welcomeSectionRef}
          heroContentRef={heroContentRef}
          portfolioRef={portfolioRef}
          amaliaRef={amaliaRef}
          glowTopRef={glowTopRef}
          glowBottomRef={glowBottomRef}
          isTransitioning={isTransitioning}
          isCategoryHovered={isCategoryHovered}
        />

        <CategorySection
          activeCategory={activeCategory}
          sectionRef={detailSectionRef}
          onBack={animateBackToWelcome}
          isTransitioning={isTransitioning}
        />
      </div>
    </main>
  );
}
