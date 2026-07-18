import { useEffect, useRef } from "react";
import gsap from "gsap";
import { categoryLabels } from "../data/categories";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";

type WelcomeSectionProps = {
  background: VariantBackgroundType;
  setBackground: (value: VariantBackgroundType) => void;
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
  activePage: {
    current: string;
    before: string;
  };
  setActivePage: ({ current, before }: { current: string; before: string }) => void;
  isMobile: boolean;
};

export default function WelcomeSection({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
  background,
  isMobile,
}: WelcomeSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);
  const amaliaRef = useRef<HTMLDivElement | null>(null);
  const labelRefs = useRef<HTMLButtonElement[]>([]);
  const introCompletedRef = useRef(false);
  // const firstRender = useRef(true);
  const isThisPageActive = useRef(true);
  const isTransitionRef = useRef(isTransitioning);

  const handleMouseMove = (event: MouseEvent) => {
    if (
      !introCompletedRef.current ||
      isTransitionRef.current ||
      !containerRef.current ||
      !portfolioRef.current ||
      !amaliaRef.current ||
      !isThisPageActive.current
    ) {
      return;
    }

    const bounds = containerRef.current.getBoundingClientRect();
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
    if (
      !introCompletedRef.current ||
      isTransitionRef.current ||
      !containerRef.current ||
      !portfolioRef.current ||
      !amaliaRef.current ||
      !isThisPageActive.current
    ) {
      return;
    }

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

  useEffect(() => {
    isTransitionRef.current = isTransitioning;
  }, [isTransitioning]);

  useEffect(() => {
    if (activePage.current == "welcome") {
      const timeline = gsap.timeline({
        defaults: {
          yPercent: 0,
          duration: TRANSITION_DURATION,
          ease: "power3.inOut",
        },
        onComplete: () => {
          isThisPageActive.current = true;
          containerRef.current?.addEventListener("mousemove", handleMouseMove);
          containerRef.current?.addEventListener("mouseleave", handleMouseLeave);
        },
      });
      timeline
        .to(heroContentRef.current, {}, 0)
        .to(labelRefs.current, {}, `-=${TRANSITION_DURATION}`)
        .to(portfolioRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(amaliaRef.current, {}, `-=${TRANSITION_DURATION}`);
    }
  }, [activePage.current]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (
      mediaQuery.matches ||
      !containerRef.current ||
      !heroContentRef.current ||
      !portfolioRef.current ||
      !amaliaRef.current
    ) {
      introCompletedRef.current = true;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([portfolioRef.current, amaliaRef.current], {
        opacity: 0,
        y: 40,
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
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const onCategorySelect = (labelId: string) => {
    if (
      !heroContentRef.current ||
      !portfolioRef.current ||
      !amaliaRef.current ||
      isTransitioning ||
      !introCompletedRef.current
    ) {
      return;
    }

    isThisPageActive.current = false;
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    setActivePage({ current: labelId, before: "welcome" });
    setIsTransitioning(true);
    setBackground("dark-glow");

    const timeline = gsap.timeline({
      defaults: { duration: TRANSITION_DURATION, ease: "power3.inOut" },
      onComplete: () => {
        setIsTransitioning(false);
      },
    });
    timeline
      .to(
        heroContentRef.current,
        {
          yPercent: -100,
        },
        0,
      )
      .to(
        labelRefs.current,
        {
          yPercent: (index) => categoryLabels[index]?.transitionOutY ?? -60,
        },
        0,
      )
      .to(
        portfolioRef.current,
        {
          yPercent: -78,
        },
        `-=${TRANSITION_DURATION}`,
      )
      .to(
        amaliaRef.current,
        {
          yPercent: -538,
        },
        `-=${TRANSITION_DURATION}`,
      );
  };

  const onChangeColorBackground = (variant: VariantBackgroundType) => {
    if (!isThisPageActive.current) return;
    setBackground(variant);
  };

  const setLabelRef = (index: number) => (element: HTMLButtonElement | null) => {
    if (element) {
      labelRefs.current[index] = element;
      return;
    }

    delete labelRefs.current[index];
  };

  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden transition-colors duration-500 ${activePage.current !== "welcome" ? "pointer-events-none" : ""}`}
    >
      <div ref={heroContentRef} className="absolute inset-0 z-20 pointer-events-auto">
        {categoryLabels.map((label, index) => (
          <button
            key={`${label.id}-${label.text}-${index}`}
            ref={setLabelRef(index)}
            type="button"
            disabled={isTransitioning}
            onClick={() => onCategorySelect(label.id)}
            onMouseEnter={() => onChangeColorBackground("dark-solid")}
            onMouseLeave={() => onChangeColorBackground("light")}
            onFocus={() => onChangeColorBackground("dark-solid")}
            onBlur={() => onChangeColorBackground("light")}
            className={`inter-font absolute z-20 m-0 whitespace-pre-line bg-transparent p-0 text-left leading-[0.98] font-normal tracking-[-0.03em] transition-[filter,transform,opacity,color] duration-500 ease-out hover:scale-[1.03] hover:blur-none focus-visible:scale-[1.03] focus-visible:blur-none focus-visible:outline-none disabled:pointer-events-none ${
              background === "light" ? "text-secondary-950" : "text-primary-500"
            } ${label.className} ${label.blurClassName} max-sm:text-[0.95rem]`}
            aria-label={label.text.replaceAll("\n", " ")}
          >
            {label.text}
          </button>
        ))}

        <div
          ref={portfolioRef}
          className={`absolute left-[29%] top-[40%] z-20 flex items-baseline leading-[0.85] transition-colors duration-500 ${
            background === "light" ? "text-secondary-950" : "text-primary-500"
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
          className={`absolute left-[44%] top-[54%] z-20 flex items-baseline leading-[0.85] transition-colors duration-500 ${
            background === "light" ? "text-secondary-950" : "text-primary-500"
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
