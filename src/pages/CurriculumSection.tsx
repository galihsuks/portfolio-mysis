import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";

type CurriculumSectionProps = {
  setBackground: (value: VariantBackgroundType) => void;
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
  activePage: {
    current: string;
    before: string;
  };
  setActivePage: ({ current, before }: { current: string; before: string }) => void;
};

export default function CurriculumSection({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
}: CurriculumSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const curriculumRef = useRef<HTMLDivElement | null>(null);
  const vitaeRef = useRef<HTMLDivElement | null>(null);
  const amaliaRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);
  const isThisPageActive = useRef(true);

  const handleMouseMove = (event: MouseEvent) => {
    if (
      isTransitioning ||
      !containerRef.current ||
      !curriculumRef.current ||
      !vitaeRef.current ||
      !amaliaRef.current ||
      !isThisPageActive.current
    ) {
      return;
    }

    const bounds = containerRef.current.getBoundingClientRect();
    const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
    const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(curriculumRef.current, {
      xPercent: xRatio * 6,
      yPercent: yRatio * 5,
      duration: 1.1,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(vitaeRef.current, {
      xPercent: xRatio * 7,
      yPercent: yRatio * 6,
      duration: 1.15,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(amaliaRef.current, {
      xPercent: xRatio * 8,
      yPercent: yRatio * 7,
      duration: 1.15,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    if (
      isTransitioning ||
      !containerRef.current ||
      !curriculumRef.current ||
      !vitaeRef.current ||
      !amaliaRef.current ||
      !isThisPageActive.current
    ) {
      return;
    }

    gsap.to([curriculumRef.current, vitaeRef.current, amaliaRef.current], {
      xPercent: 0,
      yPercent: 0,
      duration: 1.1,
      ease: "power3.out",
      overwrite: true,
    });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (activePage.current == "curriculum-vitae") {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
      });

      if (activePage.before === "welcome") {
        // TODO set ke posisi di bawah layar dulu
      } else {
        // TODO set ke posisi di atas layar dulu
      }
      timeline
        .to(
          curriculumRef.current,
          {
            yPercent: 0,
            duration: TRANSITION_DURATION,
          },
          0,
        )
        .to(
          vitaeRef.current,
          {
            yPercent: 0,
            duration: TRANSITION_DURATION,
          },
          `-=${TRANSITION_DURATION}`,
        )
        .to(
          amaliaRef.current,
          {
            yPercent: 0,
            duration: TRANSITION_DURATION,
          },
          `-=${TRANSITION_DURATION}`,
        )
        .call(() => {
          isThisPageActive.current = true;
          containerRef.current?.addEventListener("mousemove", handleMouseMove);
          containerRef.current?.addEventListener("mouseleave", handleMouseLeave);
        });
    } else {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [activePage.current]);

  const onCategorySelect = (page: string) => {
    if (!containerRef.current || isTransitioning) {
      return;
    }

    isThisPageActive.current = false;
    setActivePage({ current: page, before: "welcome" });
    setIsTransitioning(true);

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setIsTransitioning(false);
      },
    });
    timeline
      .to(
        curriculumRef.current,
        {
          xPercent: -78,
          duration: TRANSITION_DURATION,
        },
        0,
      )
      .to(
        vitaeRef.current,
        {
          xPercent: -538,
          duration: TRANSITION_DURATION,
        },
        `-=${TRANSITION_DURATION}`,
      )
      .to(
        amaliaRef.current,
        {
          xPercent: -200,
          duration: TRANSITION_DURATION,
        },
        `-=${TRANSITION_DURATION}`,
      );
  };

  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden transition-colors duration-500 ${activePage.current !== "curriculum-vitae" ? "pointer-events-none" : ""}`}
    >
      <div
        ref={curriculumRef}
        className={`absolute right-[15%] top-[10%] max-[900px]:right-[10%] max-[900px]:top-[10%] max-sm:right-[10%] max-sm:top-[10%] z-20 flex items-baseline leading-[0.85] transition-colors duration-500 text-primary-500`}
      >
        <span className="kapakana-font text-[clamp(7rem,13vw,12rem)] leading-[0.75]">C</span>
        <span className="inter-font text-[clamp(3rem,5.7vw,5.25rem)] font-normal tracking-[-0.05em]">
          urriculum
        </span>
      </div>
      <div
        ref={vitaeRef}
        className={`absolute right-[15%] top-[22%] max-[900px]:right-[10%] max-[900px]:top-[18%] max-sm:right-[10%] max-sm:top-[18%] z-20 flex items-baseline leading-[0.85] transition-colors duration-500 text-primary-500`}
      >
        <span className="kapakana-font text-[clamp(7rem,13vw,12rem)] leading-[0.75]">V</span>
        <span className="inter-font text-[clamp(3rem,5.7vw,5.25rem)] font-normal tracking-[-0.05em]">
          itae
        </span>
      </div>
      <div
        ref={amaliaRef}
        className={`absolute left-[10%] top-[20%] max-[900px]:left-[10%] max-[900px]:top-[18%] max-sm:left-[10%] max-sm:top-[18%] z-20 flex items-baseline leading-[0.85] transition-colors duration-500 text-primary-500`}
      >
        <span className="inter-font whitespace-pre-line text-left leading-[0.98] font-normal tracking-[-0.03em] text-[clamp(1.7rem,2.4vw,2.7rem)]">
          Amalia
          <br />
          Latifah
          <br />
          Putri
        </span>
      </div>
    </section>
  );
}
