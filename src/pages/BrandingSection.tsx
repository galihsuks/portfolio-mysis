import { useEffect, useRef } from "react";
import gsap from "gsap";
import shapeBottomLeft from "../assets/elements/14 2.png";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";
import Folder from "../components/ui/Folder";
import Window from "../components/ui/Window";

type BrandingSectionProps = {
  setBackground: (value: VariantBackgroundType) => void;
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
  activePage: {
    current: string;
    before: string;
  };
  setActivePage: ({ current, before }: { current: string; before: string }) => void;
  registerBackAction: (handler: (() => void) | null) => void;
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

export default function BrandingSection({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
  registerBackAction,
}: BrandingSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const curriculumRef = useRef<HTMLDivElement | null>(null);
  const vitaeRef = useRef<HTMLDivElement | null>(null);
  const introWindowRef = useRef<HTMLDivElement | null>(null);
  const swkRef = useRef<HTMLDivElement | null>(null);
  const plazaRef = useRef<HTMLDivElement | null>(null);
  const ragamRef = useRef<HTMLDivElement | null>(null);
  const topShapeRef = useRef<HTMLImageElement | null>(null);
  const bottomShapeRef = useRef<HTMLImageElement | null>(null);
  const firstRender = useRef(true);
  const isThisPageActive = useRef(false);
  const isTransitionRef = useRef(isTransitioning);

  const getParallaxLayers = () => [
    { ref: curriculumRef, x: layerMotion.titleMain, y: layerMotion.titleMain },
    { ref: vitaeRef, x: layerMotion.titleSub, y: layerMotion.titleSub },
    { ref: introWindowRef, x: layerMotion.intro, y: layerMotion.intro },
    { ref: swkRef, x: layerMotion.education, y: layerMotion.education },
    { ref: plazaRef, x: layerMotion.skill, y: layerMotion.skill },
    { ref: ragamRef, x: layerMotion.language, y: layerMotion.language },
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
      gsap.set(swkRef.current, {
        yPercent: 36,
      });
      gsap.set(plazaRef.current, {
        yPercent: 50,
      });
      gsap.set(ragamRef.current, {
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
    if (activePage.current == "branding") {
      registerBackAction(() => handleBackToWelcome);
      const fromWelcome = activePage.before === "welcome";
      const direction = fromWelcome ? "yPercent" : "xPercent";
      const directionOpposite = direction === "xPercent" ? "yPercent" : "xPercent";
      gsap.set(containerRef.current, {
        [direction]: fromWelcome ? 100 : -110,
        [directionOpposite]: 0,
      });
      gsap.set(curriculumRef.current, {
        [direction]: fromWelcome ? 120 : -120,
        [directionOpposite]: 0,
      });
      gsap.set(vitaeRef.current, {
        [direction]: fromWelcome ? 165 : -165,
        [directionOpposite]: 0,
      });
      gsap.set(introWindowRef.current, {
        [direction]: fromWelcome ? 200 : -40,
        [directionOpposite]: 0,
      });
      gsap.set(swkRef.current, {
        [direction]: fromWelcome ? 100 : -100,
        [directionOpposite]: 0,
      });
      gsap.set(plazaRef.current, {
        [direction]: fromWelcome ? 50 : -50,
        [directionOpposite]: 0,
      });
      gsap.set(ragamRef.current, {
        [direction]: fromWelcome ? 56 : -56,
        [directionOpposite]: 0,
      });
      gsap.set(topShapeRef.current, {
        [direction]: fromWelcome ? 22 : -22,
        [directionOpposite]: 0,
      });
      gsap.set(bottomShapeRef.current, {
        [direction]: fromWelcome ? 34 : -34,
        [directionOpposite]: 0,
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
        .to(swkRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(plazaRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(ragamRef.current, {}, `-=${TRANSITION_DURATION}`)
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
    setActivePage({ current: "welcome", before: "branding" });
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
      .to(swkRef.current, { yPercent: 200 }, `-=${TRANSITION_DURATION}`)
      .to(plazaRef.current, { yPercent: 100 }, `-=${TRANSITION_DURATION}`)
      .to(ragamRef.current, { yPercent: 86 }, `-=${TRANSITION_DURATION}`)
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
    setActivePage({ current: page, before: "branding" });
    setIsTransitioning(true);

    const timeline = gsap.timeline({
      defaults: { duration: TRANSITION_DURATION, ease: "power3.inOut" },
      onComplete: () => {
        setIsTransitioning(false);
      },
    });

    timeline
      .to(containerRef.current, { xPercent: -100 }, 0)
      .to(curriculumRef.current, { xPercent: -125 }, `-=${TRANSITION_DURATION}`)
      .to(vitaeRef.current, { xPercent: -155 }, `-=${TRANSITION_DURATION}`)
      .to(introWindowRef.current, { xPercent: -200 }, `-=${TRANSITION_DURATION}`)
      .to(swkRef.current, { xPercent: -62 }, `-=${TRANSITION_DURATION}`)
      .to(plazaRef.current, { xPercent: -78 }, `-=${TRANSITION_DURATION}`)
      .to(ragamRef.current, { xPercent: -86 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { xPercent: -30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { xPercent: -46 }, `-=${TRANSITION_DURATION}`);
  };

  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 transition-colors duration-500 ${
        activePage.current !== "branding" ? "pointer-events-none" : ""
      }`}
    >
      <img
        ref={topShapeRef}
        src={shapeBottomLeft}
        alt=""
        className="pointer-events-none absolute right-[-10%] bottom-[0%] z-0 w-[40rem] max-w-[36vw] blur-[16px] opacity-95"
      />
      <img
        ref={bottomShapeRef}
        src={shapeBottomLeft}
        alt=""
        className="pointer-events-none absolute top-[10%] left-[10%] z-11 w-[20rem] max-w-[22vw] opacity-95"
      />

      <div
        ref={vitaeRef}
        className="absolute right-[10.6%] top-[14.2%] z-20 flex items-baseline leading-[0.8] text-primary-500"
      >
        <span className="kapakana-font text-[clamp(7.8rem,12.4vw,13rem)] leading-[0.72]">B</span>
        <span className="inter-font text-[clamp(4rem,6vw,6.25rem)] font-normal tracking-[-0.055em]">
          randing
        </span>
      </div>

      <div
        ref={introWindowRef}
        className="absolute right-[20%] top-[30%] z-9 w-[27.7rem] max-w-[27vw]"
      >
        <Window size="md" bodyClassName="px-15 pb-13">
          <p className="inter-font text-[0.9rem] leading-[1.27] tracking-[-0.02em] text-primary-400/95">
            This branding is a project related to the formation of a Graphic Standard Manual (GSM)
            which is usually used as a visual reference for a brand, such as starting from the logo
            to mockups and supergraphics.
          </p>
        </Window>
      </div>

      <div ref={swkRef} className="absolute left-[15%] top-[26%] z-30">
        <Folder
          label="Branding for SWK"
          size="lg"
          icons={["swk"]}
          className="w-[14.5rem]"
          folderClassName="h-[12.1rem] w-[12.5rem]"
          labelClassName="mt-1 text-[1.1rem]"
          onClick={() => handleToFolder("br-swk")}
        />
      </div>

      <div ref={plazaRef} className="absolute left-[35%] top-[26%] z-30">
        <Folder
          label="Plaza Utara Branding"
          size="lg"
          icons={["plaza"]}
          className="w-[15.2rem]"
          folderClassName="h-[12.4rem] w-[13rem]"
          labelClassName="mt-0.5 text-[1.1rem]"
          onClick={() => handleToFolder("br-plaza")}
        />
      </div>

      <div ref={ragamRef} className="absolute left-[15%] top-[60%] z-30">
        <Folder
          label="Ragam Rasa Branding"
          size="lg"
          icons={["ragam"]}
          className="w-[14.5rem]"
          folderClassName="h-[12.2rem] w-[12.4rem]"
          labelClassName="mt-0.5 text-[1.1rem]"
          onClick={() => handleToFolder("br-ragam")}
        />
      </div>

      <div ref={curriculumRef} className="absolute left-[35%] top-[60%] z-30">
        <Folder
          label="Aafreeda Branding"
          size="lg"
          icons={["aafreeda"]}
          className="w-[14.5rem]"
          folderClassName="h-[12.2rem] w-[12.4rem]"
          labelClassName="mt-0.5 text-[1.1rem]"
          onClick={() => handleToFolder("br-aafreeda")}
        />
      </div>

      <div ref={vitaeRef} className="absolute left-[55%] top-[60%] z-30">
        <Folder
          label="Sosmed ITS Branding"
          size="lg"
          icons={["sosmedITS"]}
          className="w-[14.5rem]"
          folderClassName="h-[12.2rem] w-[12.4rem]"
          labelClassName="mt-0.5 text-[1.1rem]"
          onClick={() => handleToFolder("br-sosmed")}
        />
      </div>
    </section>
  );
}
