import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import gsap from "gsap";
import type { CategoryId, CategoryLabel } from "../../data/categories";

export type WelcomeSectionHandle = {
  canNavigate: () => boolean;
  appendTransitionToTimeline: (timeline: gsap.core.Timeline, direction: "out" | "in") => void;
  resetSceneState: () => void;
};

type WelcomeSectionProps = {
  labels: CategoryLabel[];
  onCategorySelect: (category: CategoryId) => void;
  isTransitioning: boolean;
};

const WelcomeSection = forwardRef<WelcomeSectionHandle, WelcomeSectionProps>(
  function WelcomeSection({ labels, onCategorySelect, isTransitioning }, ref) {
    const containerRef = useRef<HTMLElement | null>(null);
    const heroContentRef = useRef<HTMLDivElement | null>(null);
    const portfolioRef = useRef<HTMLDivElement | null>(null);
    const amaliaRef = useRef<HTMLDivElement | null>(null);
    const labelRefs = useRef<HTMLButtonElement[]>([]);
    const introCompletedRef = useRef(false);
    const [isCategoryHovered, setIsCategoryHovered] = useState(false);

    labelRefs.current = [];

    useImperativeHandle(
      ref,
      () => ({
        canNavigate: () => introCompletedRef.current && !isTransitioning,
        appendTransitionToTimeline: (timeline, direction) => {
          if (!heroContentRef.current || !portfolioRef.current || !amaliaRef.current) {
            return;
          }

          if (direction === "out") {
            timeline
              .to(
                heroContentRef.current,
                {
                  yPercent: -10,
                  duration: 1.25,
                },
                0,
              )
              .to(
                labelRefs.current,
                {
                  yPercent: (index) => labels[index]?.transitionOutY ?? -60,
                  duration: 1.18,
                },
                0,
              )
              .to(
                portfolioRef.current,
                {
                  yPercent: -78,
                  duration: 1.2,
                },
                0,
              )
              .to(
                amaliaRef.current,
                {
                  yPercent: -138,
                  duration: 1.28,
                },
                0.04,
              );

            return;
          }

          timeline
            .to(
              heroContentRef.current,
              {
                yPercent: 0,
                duration: 1.12,
              },
              0.18,
            )
            .to(
              labelRefs.current,
              {
                yPercent: 0,
                duration: 1.14,
              },
              0.1,
            )
            .to(
              portfolioRef.current,
              {
                yPercent: 0,
                duration: 1.2,
              },
              0.14,
            )
            .to(
              amaliaRef.current,
              {
                yPercent: 0,
                duration: 1.28,
              },
              0.04,
            );
        },
        resetSceneState: () => {
          setIsCategoryHovered(false);

          gsap.set(labelRefs.current, {
            yPercent: 0,
          });

          gsap.set([portfolioRef.current, amaliaRef.current], {
            yPercent: 0,
          });

          gsap.set(heroContentRef.current, {
            yPercent: 0,
          });
        },
      }),
      [isTransitioning, labels],
    );

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

      const handleMouseMove = (event: MouseEvent) => {
        if (
          !introCompletedRef.current ||
          isTransitioning ||
          !containerRef.current ||
          !portfolioRef.current ||
          !amaliaRef.current
        ) {
          return;
        }

        const bounds = containerRef.current.getBoundingClientRect();
        const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
        const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;

        labelRefs.current.forEach((label, index) => {
          const drift = labels[index]?.drift ?? 16;

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

      containerRef.current.addEventListener("mousemove", handleMouseMove);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        introCompletedRef.current = false;
        setIsCategoryHovered(false);
        containerRef.current?.removeEventListener("mousemove", handleMouseMove);
        containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        ctx.revert();
      };
    }, [labels]);

    const setLabelRef = (element: HTMLButtonElement | null) => {
      if (element) {
        labelRefs.current.push(element);
      }
    };

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
              onMouseEnter={() => setIsCategoryHovered(true)}
              onMouseLeave={() => setIsCategoryHovered(false)}
              onFocus={() => setIsCategoryHovered(true)}
              onBlur={() => setIsCategoryHovered(false)}
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
  },
);

export default WelcomeSection;
