import { useEffect, useRef } from "react";
import gsap from "gsap";
import scroll1Image from "../assets/big-project/jtv/jtv-scroll-1.png";
import scroll2Image from "../assets/big-project/jtv/jtv-scroll-2.png";
import scroll3Image from "../assets/big-project/jtv/jtv-scroll-3.png";
import overlayImage from "../assets/big-project/overlay.svg";
import tunnelThumbImage from "../assets/big-project/jtv_thumb.png";
import shapeBottomLeft from "../assets/elements/14 2.png";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";
import Window from "../components/ui/Window";
import Carousel from "../components/ui/Carousel";

type BPJtvSectionProps = {
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

export default function BPJtvSection({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
  registerBackAction,
  isMobile,
  aspectFitClassName,
}: BPJtvSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const curriculumRef = useRef<HTMLDivElement | null>(null);
  const vitaeRef = useRef<HTMLDivElement | null>(null);
  const introWindowRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLImageElement | null>(null);
  const topShapeRef = useRef<HTMLImageElement | null>(null);
  const bottomShapeRef = useRef<HTMLImageElement | null>(null);
  const firstRender = useRef(true);
  const isThisPageActive = useRef(false);
  const isTransitionRef = useRef(isTransitioning);

  const getParallaxLayers = () => [
    { ref: curriculumRef, x: layerMotion.titleMain, y: layerMotion.titleMain },
    { ref: vitaeRef, x: layerMotion.titleSub, y: layerMotion.titleSub },
    { ref: introWindowRef, x: layerMotion.intro, y: layerMotion.intro },
    { ref: thumbRef, x: layerMotion.shapeTop, y: layerMotion.shapeTop },
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
      gsap.set(thumbRef.current, {
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
    if (activePage.current == "bp-jtv") {
      setBackground("white");
      registerBackAction(() => handleBackToWelcome);
      gsap.set(containerRef.current, {
        yPercent: 100,
        xPercent: 0,
      });
      gsap.set(curriculumRef.current, {
        yPercent: 120,
        xPercent: 0,
      });
      gsap.set(vitaeRef.current, {
        yPercent: 165,
        xPercent: 0,
      });
      gsap.set(introWindowRef.current, {
        yPercent: 200,
        xPercent: 0,
      });
      gsap.set(thumbRef.current, {
        yPercent: 55,
        xPercent: 0,
      });
      gsap.set(topShapeRef.current, {
        yPercent: 22,
        xPercent: 0,
      });
      gsap.set(bottomShapeRef.current, {
        yPercent: 34,
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
        .to(thumbRef.current, {}, `-=${TRANSITION_DURATION}`)
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
    setActivePage({ current: "welcome", before: "bp-jtv" });
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
      .to(thumbRef.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { yPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  const handleToMore = (page: string) => {
    if (isTransitionRef.current) {
      return;
    }

    isThisPageActive.current = false;
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    setActivePage({ current: page, before: "bp-jtv" });
    setIsTransitioning(true);
    setBackground("light");

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
      .to(thumbRef.current, { yPercent: -55 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { yPercent: -30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { yPercent: -46 }, `-=${TRANSITION_DURATION}`);
  };

  return (
    <section
      ref={containerRef}
      className={`absolute flex justify-center items-center inset-0 transition-colors duration-500 ${
        activePage.current !== "bp-jtv" ? "pointer-events-none" : ""
      }`}
    >
      <div className="absolute inset-0 overflow-hidden z-1 flex flex-col gap-[1svh]">
        <Carousel
          images={[scroll1Image]}
          autoScroll="right"
          className="h-full"
          imageClassName="rounded-none"
          classNameWrapperImg="gap-[1svh]"
        />
        <Carousel
          images={[scroll2Image]}
          autoScroll="left"
          className="h-full"
          imageClassName="rounded-none"
          classNameWrapperImg="gap-[1svh]"
        />
        <Carousel
          images={[scroll3Image]}
          autoScroll="right"
          className="h-full"
          imageClassName="rounded-none"
          classNameWrapperImg="gap-[1svh]"
        />
      </div>
      <img
        src={overlayImage}
        alt=""
        className="pointer-events-none absolute left-0 top-0 z-2 h-full w-full object-cover"
      />

      {/* menjaga rasio 16:9 */}
      <div className={`z-3 relative aspect-video ${aspectFitClassName}`}>
        <img
          ref={topShapeRef}
          src={shapeBottomLeft}
          alt=""
          className="pointer-events-none absolute left-[10%] top-[-7%] z-11 w-[37cqh]"
        />
        <img
          ref={bottomShapeRef}
          src={shapeBottomLeft}
          alt=""
          className="pointer-events-none absolute bottom-[-10%] left-[30%] z-11 w-[60cqh]"
        />

        <img
          ref={thumbRef}
          src={tunnelThumbImage}
          alt="Internship Jawapos Television"
          className="absolute left-[20%] bottom-[11%] z-30 w-[75cqh] rotate-[7deg] drop-shadow-[0_28px_60px_rgba(0,0,0,0.28)]"
        />

        <div
          ref={curriculumRef}
          className="absolute right-[7%] top-[10%] z-20 flex items-baseline leading-[0.8] text-secondary-950 h-[20%]"
        >
          <span className="kapakana-font text-[20cqh] leading-[0.72]">B</span>
          <span className="inter-font text-[10cqh] font-normal tracking-[-0.055em]">ig</span>
        </div>

        <div
          ref={vitaeRef}
          className="absolute right-[10.6%] top-[20%] z-20 flex items-baseline leading-[0.8] text-secondary-950 h-[20%]"
        >
          <span className="kapakana-font text-[20cqh] leading-[0.72]">P</span>
          <span className="inter-font text-[10cqh] font-normal tracking-[-0.055em]">roject</span>
        </div>

        <div ref={introWindowRef} className="absolute right-[6%] top-[35%] z-40 w-[40%]">
          <Window size="custom" isMobile={isMobile} variant="lightBw">
            <div>
              <p className="inter-font text-[2cqh] leading-[1.27] tracking-[-0.02em] text-secondary-950/92">
                This Big Project is the result of my internship at a local television station in
                Surabaya (Jawa Pos Media), here I created social media posts for JTV Surabaya's
                Instagram and other design needs, such as posters and so on.
              </p>
              <button
                type="button"
                className={`mx-auto jersey-font block rounded-full border-[0.1cqh] border-secondary-950/60 bg-white/70 text-[1.12cqw] leading-none text-secondary-950 shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-transform duration-300 px-[3cqh] py-[1cqh] mt-[2cqh]`}
              >
                Full Result
              </button>
            </div>
          </Window>
        </div>

        <div className="absolute bottom-[8.3%] right-[8.9%] z-40 flex flex-col items-start gap-[4cqh]">
          <button
            type="button"
            onClick={() => handleToMore("bp-muhi")}
            className="inter-font cursor-pointer border-b border-transparent text-start text-[2cqh] leading-[1.08] tracking-[-0.03em] text-secondary-950/58 hover:border-secondary-950"
          >
            Museum
            <br />
            Muhammadiyah
          </button>
          <div className="inter-font text-[3.5cqh] leading-[1.05] tracking-[-0.04em] text-secondary-950 transition-colors">
            Internship
            <br />
            JTV
          </div>
          <button
            type="button"
            onClick={() => handleToMore("bp-tunnel")}
            className="inter-font cursor-pointer border-b border-transparent text-start text-[2cqh] leading-[1.08] tracking-[-0.03em] text-secondary-950/58 hover:border-secondary-950"
          >
            Tunnel
            <br />
            KBS
          </button>
        </div>
      </div>
    </section>
  );
}
