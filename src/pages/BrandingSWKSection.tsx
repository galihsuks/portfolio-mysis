import { useEffect, useRef } from "react";
import gsap from "gsap";
import mockupImage1 from "../assets/branding/swk/mock-big-1.png";
import mockupImage2 from "../assets/branding/swk/mock-big-2.png";
import logoSWKRed from "../assets/branding/swk/logo-swk-bg-red.png";
import logoSWKWhite from "../assets/branding/swk/logo-swk-bg-white.png";
import overlayImage from "../assets/branding/overlay.svg";
import mockSmallImage from "../assets/branding/swk/mock-small.png";
import shapeBottomLeft from "../assets/elements/14 3.png";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";
import Window from "../components/ui/Window";
import { ArrowLeft } from "lucide-react";

type BrandingSWKSectionProps = {
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

export default function BrandingSWKSection({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
  registerBackAction,
}: BrandingSWKSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const curriculumRef = useRef<HTMLDivElement | null>(null);
  const vitaeRef = useRef<HTMLDivElement | null>(null);
  const introWindowRef = useRef<HTMLDivElement | null>(null);
  const mockup2Ref = useRef<HTMLImageElement | null>(null);
  const mockup1Ref = useRef<HTMLImageElement | null>(null);
  const logo2Ref = useRef<HTMLImageElement | null>(null);
  const logo1Ref = useRef<HTMLImageElement | null>(null);
  const mockSmallRef = useRef<HTMLImageElement | null>(null);
  const topShapeRef = useRef<HTMLImageElement | null>(null);
  const bottomShapeRef = useRef<HTMLImageElement | null>(null);
  const firstRender = useRef(true);
  const isThisPageActive = useRef(false);
  const isTransitionRef = useRef(isTransitioning);

  const getParallaxLayers = () => [
    { ref: curriculumRef, x: layerMotion.titleMain, y: layerMotion.titleMain },
    { ref: vitaeRef, x: layerMotion.titleSub, y: layerMotion.titleSub },
    { ref: introWindowRef, x: layerMotion.intro, y: layerMotion.intro },
    { ref: mockup2Ref, x: layerMotion.language, y: layerMotion.language },
    { ref: mockup1Ref, x: layerMotion.experience, y: layerMotion.experience },
    { ref: logo2Ref, x: layerMotion.language, y: layerMotion.language },
    { ref: logo1Ref, x: layerMotion.experience, y: layerMotion.experience },
    { ref: mockSmallRef, x: layerMotion.shapeTop, y: layerMotion.shapeTop },
    { ref: topShapeRef, x: layerMotion.skill, y: layerMotion.skill },
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
      gsap.set(mockup2Ref.current, {
        yPercent: 100,
      });
      gsap.set(mockup1Ref.current, {
        yPercent: 70,
      });
      gsap.set(logo2Ref.current, {
        yPercent: 100,
      });
      gsap.set(logo1Ref.current, {
        yPercent: 70,
      });
      gsap.set(mockSmallRef.current, {
        yPercent: 55,
      });
      gsap.set(topShapeRef.current, {
        yPercent: 22,
      });
      gsap.set(bottomShapeRef.current, {
        yPercent: 34,
      });
      return;
    }
    if (activePage.current == "br-swk") {
      setBackground("dark-glow");
      registerBackAction(() => handleBackToWelcome);
      gsap.set(containerRef.current, {
        xPercent: 100,
        yPercent: 0,
      });
      gsap.set(curriculumRef.current, {
        xPercent: 120,
        yPercent: 0,
      });
      gsap.set(vitaeRef.current, {
        xPercent: 165,
        yPercent: 0,
      });
      gsap.set(introWindowRef.current, {
        xPercent: 200,
        yPercent: 0,
      });
      gsap.set(mockup2Ref.current, {
        xPercent: 100,
        yPercent: 0,
      });
      gsap.set(mockup1Ref.current, {
        xPercent: 70,
        yPercent: 0,
      });
      gsap.set(logo2Ref.current, {
        xPercent: 100,
        yPercent: 0,
      });
      gsap.set(logo1Ref.current, {
        xPercent: 70,
        yPercent: 0,
      });
      gsap.set(mockSmallRef.current, {
        xPercent: 55,
        yPercent: 0,
      });
      gsap.set(topShapeRef.current, {
        xPercent: 22,
        yPercent: 0,
      });
      gsap.set(bottomShapeRef.current, {
        xPercent: 34,
        yPercent: 0,
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
        .to(mockup2Ref.current, {}, `-=${TRANSITION_DURATION}`)
        .to(mockup1Ref.current, {}, `-=${TRANSITION_DURATION}`)
        .to(logo2Ref.current, {}, `-=${TRANSITION_DURATION}`)
        .to(logo1Ref.current, {}, `-=${TRANSITION_DURATION}`)
        .to(mockSmallRef.current, {}, `-=${TRANSITION_DURATION}`)
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
    setActivePage({ current: "welcome", before: "br-swk" });
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
      .to(mockup2Ref.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(mockup1Ref.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(logo2Ref.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(logo1Ref.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(mockSmallRef.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { yPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  const handleBackToBranding = () => {
    if (isTransitionRef.current) {
      return;
    }

    isThisPageActive.current = false;
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    setActivePage({ current: "branding", before: "br-swk" });
    setIsTransitioning(true);
    setBackground("dark-glow");

    const timeline = gsap.timeline({
      defaults: { duration: TRANSITION_DURATION, ease: "power3.inOut" },
      onComplete: () => {
        setIsTransitioning(false);
      },
    });

    timeline
      .to(containerRef.current, { xPercent: 100 }, 0)
      .to(curriculumRef.current, { xPercent: 125 }, `-=${TRANSITION_DURATION}`)
      .to(vitaeRef.current, { xPercent: 155 }, `-=${TRANSITION_DURATION}`)
      .to(introWindowRef.current, { xPercent: 200 }, `-=${TRANSITION_DURATION}`)
      .to(mockup2Ref.current, { xPercent: 100 }, `-=${TRANSITION_DURATION}`)
      .to(mockup1Ref.current, { xPercent: 70 }, `-=${TRANSITION_DURATION}`)
      .to(logo2Ref.current, { xPercent: 100 }, `-=${TRANSITION_DURATION}`)
      .to(logo1Ref.current, { xPercent: 70 }, `-=${TRANSITION_DURATION}`)
      .to(mockSmallRef.current, { xPercent: 55 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { xPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { xPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 transition-colors duration-500 ${
        activePage.current !== "br-swk" ? "pointer-events-none" : ""
      }`}
    >
      <img
        ref={topShapeRef}
        src={shapeBottomLeft}
        alt=""
        className="pointer-events-none absolute left-[10%] top-[-7%] z-11 w-[26rem] max-w-[25vw]"
      />
      <img
        ref={bottomShapeRef}
        src={shapeBottomLeft}
        alt=""
        className="pointer-events-none absolute top-[10%] left-[40%] z-11 w-[30rem]"
      />

      <img
        src={overlayImage}
        alt=""
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full object-cover"
      />

      <img
        ref={mockSmallRef}
        src={mockSmallImage}
        alt="Mockup Small"
        className="absolute left-[25%] bottom-[-50%] z-40 h-[120svh]"
      />

      <img
        ref={mockup1Ref}
        src={mockupImage1}
        alt="Mockup SWK 1"
        className="absolute top-[10%] left-[10%] z-31 h-[120svh]"
      />

      <img
        ref={mockup2Ref}
        src={mockupImage2}
        alt="Mockup SWK 2"
        className="absolute top-[13%] left-[20%] z-30 h-[120svh]"
      />

      <img
        ref={logo1Ref}
        src={logoSWKRed}
        alt="Logo SWK Red"
        className="absolute bottom-[5%] right-[20%] z-30 h-[20svh]"
      />
      <img
        ref={logo2Ref}
        src={logoSWKWhite}
        alt="Logo SWK Red"
        className="absolute bottom-[13%] right-[10%] z-30 h-[20svh]"
      />

      <div
        ref={curriculumRef}
        className="absolute right-[11.2%] top-[8.5%] z-40 flex items-baseline leading-[0.82] text-white"
      >
        <span className="inter-font text-[clamp(4rem,5.7vw,6.15rem)] font-normal tracking-[-0.055em]">
          SWK
        </span>
      </div>

      <div
        ref={vitaeRef}
        className="absolute right-[11.2%] top-[18.2%] z-40 flex items-baseline leading-[0.8] text-white"
      >
        <span className="kapakana-font text-[clamp(8rem,12vw,13rem)] leading-[0.72]">P</span>
        <span className="inter-font text-[clamp(4rem,5.7vw,6.15rem)] font-normal tracking-[-0.055em]">
          roject
        </span>
      </div>

      <button
        type="button"
        onClick={handleBackToBranding}
        className="absolute left-[2.15%] top-[3.4%] z-50 flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-2xl border border-primary-500/90 bg-secondary-950/20 text-primary-400 shadow-[0_0_24px_rgba(132,204,22,0.18)] backdrop-blur-[6px] transition-transform duration-300 hover:scale-[1.03]"
        aria-label="Back to curriculum section"
      >
        <ArrowLeft strokeWidth={2.75} className="h-8 w-8" />
      </button>

      <div
        ref={introWindowRef}
        className="absolute right-[6%] top-[37.7%] z-40 w-[31rem] max-w-[31vw]"
      >
        <Window
          size="custom"
          variant="light"
          bodyClassName="px-12 pb-7 pt-2"
          panelClassName="bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(247,255,244,0.92)_52%,rgba(214,255,200,0.88)_100%)]"
        >
          <div className="space-y-5">
            <p className="inter-font max-w-[25rem] text-[0.9rem] leading-[1.2] tracking-[-0.02em] text-secondary-950/92">
              In this project, I successfully designed and created a mural for the tunnel wall
              connecting the parking lot and the entrance to the Surabaya Zoo, with an average
              tunnel wall size of 3x100 meters. I worked on the design requirements using Photoshop
              and Adobe Illustrator.
            </p>

            <button
              type="button"
              className="jersey-font inline-flex min-w-[8.7rem] items-center justify-center rounded-full border-[3px] border-secondary-950/60 bg-white/70 px-6 py-2 text-[1.12rem] leading-none text-secondary-950 shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-[1.02]"
            >
              Full Result
            </button>
          </div>
        </Window>
      </div>
    </section>
  );
}
