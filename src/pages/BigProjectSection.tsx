import { useEffect, useRef } from "react";
import gsap from "gsap";
import shapeBottomLeft from "../assets/elements/14 2.png";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";
import Folder from "../components/ui/Folder";
import Window from "../components/ui/Window";

type BigProjectSectionProps = {
  setBackground: (value: VariantBackgroundType) => void;
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
  activePage: {
    current: string;
    before: string;
  };
  setActivePage: ({ current, before }: { current: string; before: string }) => void;
  registerBackAction: (handler: (() => void) | null) => void;
  isMobile: boolean;
  aspectFitClassName: string;
};

const layerMotion = {
  titleMain: 5,
  titleSub: 7,
  name: 4,
  photo: 3,
  intro: 6,
  education: 8,
  skill: 9,
  language: 10,
  experience: 7,
  shapeTop: 2,
  shapeBottom: 4,
} as const;

export default function BigProjectSection({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
  registerBackAction,
  aspectFitClassName,
}: BigProjectSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const curriculumRef = useRef<HTMLDivElement | null>(null);
  const vitaeRef = useRef<HTMLDivElement | null>(null);
  const introWindowRef = useRef<HTMLDivElement | null>(null);
  const muhiRef = useRef<HTMLDivElement | null>(null);
  const tunnelRef = useRef<HTMLDivElement | null>(null);
  const jtvRef = useRef<HTMLDivElement | null>(null);
  const topShapeRef = useRef<HTMLImageElement | null>(null);
  const bottomShapeRef = useRef<HTMLImageElement | null>(null);
  const firstRender = useRef(true);
  const isThisPageActive = useRef(false);
  const isTransitionRef = useRef(isTransitioning);

  const getParallaxLayers = () => [
    { ref: curriculumRef, x: layerMotion.titleMain, y: layerMotion.titleMain },
    { ref: vitaeRef, x: layerMotion.titleSub, y: layerMotion.titleSub },
    { ref: introWindowRef, x: layerMotion.intro, y: layerMotion.intro },
    { ref: muhiRef, x: layerMotion.education, y: layerMotion.education },
    { ref: tunnelRef, x: layerMotion.skill, y: layerMotion.skill },
    { ref: jtvRef, x: layerMotion.language, y: layerMotion.language },
    { ref: topShapeRef, x: layerMotion.shapeTop, y: layerMotion.shapeTop },
    { ref: bottomShapeRef, x: layerMotion.shapeBottom, y: layerMotion.shapeBottom },
  ];

  const handleMouseMove = (event: MouseEvent) => {
    if (isTransitionRef.current || !containerRef.current || !isThisPageActive.current) {
      return;
    }
    const bounds = containerRef.current.getBoundingClientRect();
    const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
    const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;

    getParallaxLayers().forEach(({ ref, x, y }) => {
      if (!ref.current) {
        return;
      }

      gsap.to(ref.current, {
        xPercent: xRatio * x,
        yPercent: yRatio * y,
        duration: 1.1,
        ease: "power3.out",
        overwrite: true,
      });
    });
  };

  const handleMouseLeave = () => {
    if (isTransitionRef.current || !isThisPageActive.current) {
      return;
    }

    getParallaxLayers().forEach(({ ref }) => {
      if (!ref.current) {
        return;
      }

      gsap.to(ref.current, {
        xPercent: 0,
        yPercent: 0,
        duration: 1.15,
        ease: "power3.out",
        overwrite: true,
      });
    });
  };

  useEffect(() => {
    isTransitionRef.current = isTransitioning;
  }, [isTransitioning]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      gsap.set(containerRef.current, {
        yPercent: 100,
      });
      gsap.set(curriculumRef.current, {
        yPercent: 120,
      });
      gsap.set(vitaeRef.current, {
        yPercent: 165,
      });
      gsap.set(introWindowRef.current, {
        yPercent: 40,
      });
      gsap.set(muhiRef.current, {
        yPercent: 36,
      });
      gsap.set(tunnelRef.current, {
        yPercent: 50,
      });
      gsap.set(jtvRef.current, {
        yPercent: 56,
      });
      gsap.set(topShapeRef.current, {
        yPercent: 22,
      });
      gsap.set(bottomShapeRef.current, {
        yPercent: 34,
      });
      return;
    }
    if (activePage.current == "big-project") {
      registerBackAction(() => handleBackToWelcome);
      const fromWelcome = activePage.before === "welcome";
      gsap.set(containerRef.current, {
        yPercent: fromWelcome ? 100 : -100,
        xPercent: 0,
      });
      gsap.set(curriculumRef.current, {
        yPercent: fromWelcome ? 120 : -120,
        xPercent: 0,
      });
      gsap.set(vitaeRef.current, {
        yPercent: fromWelcome ? 165 : -165,
        xPercent: 0,
      });
      gsap.set(introWindowRef.current, {
        yPercent: fromWelcome ? 200 : -40,
        xPercent: 0,
      });
      gsap.set(muhiRef.current, {
        yPercent: fromWelcome ? 100 : -100,
        xPercent: 0,
      });
      gsap.set(tunnelRef.current, {
        yPercent: fromWelcome ? 50 : -50,
        xPercent: 0,
      });
      gsap.set(jtvRef.current, {
        yPercent: fromWelcome ? 56 : -56,
        xPercent: 0,
      });
      gsap.set(topShapeRef.current, {
        yPercent: fromWelcome ? 22 : -22,
        xPercent: 0,
      });
      gsap.set(bottomShapeRef.current, {
        yPercent: fromWelcome ? 34 : -34,
        xPercent: 0,
      });

      const timeline = gsap.timeline({
        defaults: {
          yPercent: 0,
          xPercent: 0,
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
        .to(containerRef.current, {}, 0)
        .to(curriculumRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(vitaeRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(introWindowRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(muhiRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(tunnelRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(jtvRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(topShapeRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(bottomShapeRef.current, {}, `-=${TRANSITION_DURATION}`);
    }
  }, [activePage.current]);

  const handleBackToWelcome = () => {
    if (isTransitionRef.current) {
      return;
    }

    isThisPageActive.current = false;
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    setActivePage({ current: "welcome", before: "big-project" });
    setIsTransitioning(true);
    setBackground("light");

    const timeline = gsap.timeline({
      defaults: { duration: TRANSITION_DURATION, ease: "power3.inOut" },
      onComplete: () => {
        setIsTransitioning(false);
      },
    });
    timeline
      .to(containerRef.current, { yPercent: 100 }, 0)
      .to(curriculumRef.current, { yPercent: 125 }, `-=${TRANSITION_DURATION}`)
      .to(vitaeRef.current, { yPercent: 155 }, `-=${TRANSITION_DURATION}`)
      .to(introWindowRef.current, { yPercent: 200 }, `-=${TRANSITION_DURATION}`)
      .to(muhiRef.current, { yPercent: 200 }, `-=${TRANSITION_DURATION}`)
      .to(tunnelRef.current, { yPercent: 100 }, `-=${TRANSITION_DURATION}`)
      .to(jtvRef.current, { yPercent: 86 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { yPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  const handleToFolder = (page: string) => {
    if (isTransitionRef.current) {
      return;
    }

    isThisPageActive.current = false;
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    setActivePage({ current: page, before: "big-project" });
    setIsTransitioning(true);

    const timeline = gsap.timeline({
      defaults: { duration: TRANSITION_DURATION, ease: "power3.inOut" },
      onComplete: () => {
        setIsTransitioning(false);
      },
    });

    timeline
      .to(containerRef.current, { yPercent: -100 }, 0)
      .to(curriculumRef.current, { yPercent: -125 }, `-=${TRANSITION_DURATION}`)
      .to(vitaeRef.current, { yPercent: -155 }, `-=${TRANSITION_DURATION}`)
      .to(introWindowRef.current, { yPercent: -200 }, `-=${TRANSITION_DURATION}`)
      .to(muhiRef.current, { yPercent: -62 }, `-=${TRANSITION_DURATION}`)
      .to(tunnelRef.current, { yPercent: -78 }, `-=${TRANSITION_DURATION}`)
      .to(jtvRef.current, { yPercent: -86 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { yPercent: -30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { yPercent: -46 }, `-=${TRANSITION_DURATION}`);
  };

  return (
    <section
      ref={containerRef}
      className={`absolute flex justify-center items-center inset-0 transition-colors duration-500 ${
        activePage.current !== "big-project" ? "pointer-events-none" : ""
      }`}
    >
      {/* menjaga rasio 16:9 */}
      <div className={`relative aspect-video ${aspectFitClassName}`}>
        <img
          ref={topShapeRef}
          src={shapeBottomLeft}
          alt=""
          className="pointer-events-none absolute right-[-10%] bottom-[0%] z-0 w-[33%]"
        />
        <img
          ref={bottomShapeRef}
          src={shapeBottomLeft}
          alt=""
          className="pointer-events-none absolute top-[10%] left-[5%] z-11 w-[20%]"
        />

        <div
          ref={curriculumRef}
          className="absolute right-[7%] top-[10%] z-20 flex items-baseline leading-[0.8] text-primary-500 h-[20%]"
        >
          <span className="kapakana-font text-[20cqh] leading-[0.72]">B</span>
          <span className="inter-font text-[10cqh] font-normal tracking-[-0.055em]">ig</span>
        </div>

        <div
          ref={vitaeRef}
          className="absolute right-[10.6%] top-[20%] z-20 flex items-baseline leading-[0.8] text-primary-500 h-[20%]"
        >
          <span className="kapakana-font text-[20cqh] leading-[0.72]">P</span>
          <span className="inter-font text-[10cqh] font-normal tracking-[-0.055em]">roject</span>
        </div>

        <div ref={introWindowRef} className="absolute right-[20%] top-[35%] z-9 w-[27.7%]">
          <Window size="custom">
            <p className="inter-font text-[1.3cqh] leading-[1.27] tracking-[-0.02em] text-primary-400/95">
              Big Project is my design project on a large scale, such as an internship at JTV, a
              national television company in Surabaya, then collaborating with a design studio in
              Jogja to work on a wall design project for a Muhammadiyah Museum, then working on a
              project for a tunnel at the Surabaya Zoo.
            </p>
          </Window>
        </div>

        <div ref={muhiRef} className="absolute left-[33%] top-[25%] z-30">
          <Folder
            label="Museum Muhammadiyah"
            icons={["muhi"]}
            onClick={() => handleToFolder("bp-muhi")}
          />
        </div>

        <div ref={tunnelRef} className="absolute left-[13%] top-[55%] z-30">
          <Folder
            label="Tunnel Surabaya Zoo"
            icons={["tunnel"]}
            onClick={() => handleToFolder("bp-tunnel")}
          />
        </div>

        <div ref={jtvRef} className="absolute left-[33%] top-[55%] z-30">
          <Folder
            label="Internship Jawapos Television"
            icons={["jtv"]}
            onClick={() => handleToFolder("bp-jtv")}
          />
        </div>
      </div>
    </section>
  );
}
