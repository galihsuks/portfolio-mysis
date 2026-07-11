import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ppIgImage from "../assets/pp_ig.jpg";
import photoVideo1Image from "../assets/karya/insta_post_12.jpg";
import photoVideo2Image from "../assets/karya/insta_post_9.jpg";
import shapeBottomLeft from "../assets/elements/14 2.png";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";
import Window from "../components/ui/Window";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";

type PhotoVideo2SectionProps = {
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

export default function PhotoVideo2Section({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
  registerBackAction,
}: PhotoVideo2SectionProps) {
  const [, setIsLanguageWindowOpen] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const curriculumRef = useRef<HTMLDivElement | null>(null);
  const vitaeRef = useRef<HTMLDivElement | null>(null);
  const introWindowRef = useRef<HTMLDivElement | null>(null);
  const educationRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const topShapeRef = useRef<HTMLImageElement | null>(null);
  const bottomShapeRef = useRef<HTMLImageElement | null>(null);
  const firstRender = useRef(true);
  const isThisPageActive = useRef(false);
  const isTransitionRef = useRef(isTransitioning);

  const getParallaxLayers = () => [
    { ref: curriculumRef, x: layerMotion.titleMain, y: layerMotion.titleMain },
    { ref: vitaeRef, x: layerMotion.titleSub, y: layerMotion.titleSub },
    { ref: introWindowRef, x: layerMotion.intro, y: layerMotion.intro },
    { ref: educationRef, x: layerMotion.education, y: layerMotion.education },
    { ref: languageRef, x: layerMotion.language, y: layerMotion.language },
    { ref: experienceRef, x: layerMotion.experience, y: layerMotion.experience },
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
        yPercent: -100,
      });
      gsap.set(curriculumRef.current, {
        yPercent: -120,
      });
      gsap.set(vitaeRef.current, {
        yPercent: -165,
      });
      gsap.set(introWindowRef.current, {
        yPercent: -40,
      });
      gsap.set(educationRef.current, {
        yPercent: -36,
      });
      gsap.set(languageRef.current, {
        yPercent: -56,
      });
      gsap.set(experienceRef.current, {
        yPercent: -70,
      });
      gsap.set(topShapeRef.current, {
        yPercent: -22,
      });
      gsap.set(bottomShapeRef.current, {
        yPercent: -34,
      });
      return;
    }
    if (activePage.current == "photo-video-2") {
      registerBackAction(() => handleBackToWelcome);
      gsap.set(containerRef.current, {
        xPercent: -100,
        yPercent: 0,
      });
      gsap.set(curriculumRef.current, {
        xPercent: -120,
        yPercent: 0,
      });
      gsap.set(vitaeRef.current, {
        xPercent: -165,
        yPercent: 0,
      });
      gsap.set(introWindowRef.current, {
        xPercent: -40,
        yPercent: 0,
      });
      gsap.set(educationRef.current, {
        xPercent: -100,
        yPercent: 0,
      });
      gsap.set(languageRef.current, {
        xPercent: -56,
        yPercent: 0,
      });
      gsap.set(experienceRef.current, {
        xPercent: -70,
        yPercent: 0,
      });
      gsap.set(topShapeRef.current, {
        xPercent: -22,
        yPercent: 0,
      });
      gsap.set(bottomShapeRef.current, {
        xPercent: -34,
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
        .to(educationRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(languageRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(experienceRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(topShapeRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(bottomShapeRef.current, {}, `-=${TRANSITION_DURATION}`);
    }
  }, [activePage.current]);

  const handleBackToWelcome = () => {
    if (isTransitionRef.current) {
      return;
    }

    setIsLanguageWindowOpen(false);
    isThisPageActive.current = false;
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    setActivePage({ current: "welcome", before: "photo-video-2" });
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
      .to(educationRef.current, { yPercent: 200 }, `-=${TRANSITION_DURATION}`)
      .to(languageRef.current, { yPercent: 86 }, `-=${TRANSITION_DURATION}`)
      .to(experienceRef.current, { yPercent: 94 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { yPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  const handleToBack = (page: string) => {
    if (isTransitionRef.current) {
      return;
    }

    setIsLanguageWindowOpen(false);
    isThisPageActive.current = false;
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    setActivePage({ current: page, before: "photo-video-2" });
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
      .to(educationRef.current, { xPercent: -62 }, `-=${TRANSITION_DURATION}`)
      .to(languageRef.current, { xPercent: -86 }, `-=${TRANSITION_DURATION}`)
      .to(experienceRef.current, { xPercent: -94 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { xPercent: -30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { xPercent: -46 }, `-=${TRANSITION_DURATION}`);
  };

  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 transition-colors duration-500 ${
        activePage.current !== "photo-video-2" ? "pointer-events-none" : ""
      }`}
    >
      <img
        ref={topShapeRef}
        src={shapeBottomLeft}
        alt=""
        className="pointer-events-none absolute left-[14.5%] top-[-10%] z-0 w-[40rem] max-w-[36vw] blur-[16px] opacity-95"
      />
      <img
        ref={bottomShapeRef}
        src={shapeBottomLeft}
        alt=""
        className="pointer-events-none absolute bottom-[5%] left-[-1.5%] z-11 w-[20rem] max-w-[22vw] opacity-95"
      />

      <div
        ref={curriculumRef}
        className="absolute right-[8.4%] top-[4.5%] z-20 flex items-baseline leading-[0.82] text-primary-500"
      >
        <span className="kapakana-font text-[clamp(7.8rem,12.4vw,13rem)] leading-[0.72]">P</span>
        <span className="inter-font text-[clamp(4rem,6vw,6.25rem)] font-normal tracking-[-0.055em]">
          hoto{" "}
          <p className="inline kapakana-font text-[clamp(7.8rem,12.4vw,13rem)] leading-[0.72]">n</p>
        </span>
      </div>

      <div
        ref={vitaeRef}
        className="absolute right-[10.6%] top-[14.2%] z-20 flex items-baseline leading-[0.8] text-primary-500"
      >
        <span className="kapakana-font text-[clamp(7.8rem,12.4vw,13rem)] leading-[0.72]">V</span>
        <span className="inter-font text-[clamp(4rem,6vw,6.25rem)] font-normal tracking-[-0.055em]">
          ideo
        </span>
      </div>

      <div
        ref={introWindowRef}
        className="absolute top-[70%] right-[60%] z-20 w-[20rem] max-w-[21vw]"
      >
        <p className="inter-font text-[0.92rem] leading-[1.22] tracking-[-0.02em] text-primary-400/95">
          I successfully created a video for the campus where I teach, and in 2021, I was given the
          responsibility to create a branding video for Klaten. The software I used to create the
          video was Adobe Premiere Pro and CapCut.
        </p>
      </div>

      <div ref={educationRef} className="absolute left-[13%] top-[6%] z-20 w-[40rem] max-w-[39vw]">
        <Window
          size="lg"
          panelClassName="bg-secondary-900/52"
          bodyClassName="px-6 pb-6 pt-4"
          closeButtonClassName="text-primary-500"
        >
          <div className="flex items-center gap-3 pb-4">
            <img
              src={ppIgImage}
              alt="Instagram profile"
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1 text-primary-50">
              <p className="inter-font truncate text-[0.72rem] font-semibold">amalialatifahputri</p>
              <p className="inter-font truncate text-[0.6rem] text-primary-50/85">
                ♫ AMEL PUTRI . Mawar Tanpa Duri
              </p>
            </div>
            <span className="inter-font text-[0.95rem] text-primary-50/85">...</span>
          </div>

          <img
            src={photoVideo1Image}
            alt="Graduation concept photography 1"
            className="block h-[22rem] w-full rounded-[1.1rem] object-cover"
          />

          <div className="mt-4 flex items-center gap-4 text-primary-50">
            <div className="flex items-center gap-1.5">
              <Heart className="h-5 w-5" strokeWidth={2.2} />
              <span className="inter-font text-[0.78rem]">04</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
              <span className="inter-font text-[0.78rem]">07</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Repeat2 className="h-5 w-5" strokeWidth={2.2} />
              <span className="inter-font text-[0.78rem]">19</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Send className="h-5 w-5" strokeWidth={2.2} />
              <span className="inter-font text-[0.78rem]">99</span>
            </div>
          </div>
        </Window>
      </div>

      <div
        ref={experienceRef}
        className="absolute right-[22%] bottom-[5%] z-22 w-[40rem] max-w-[39vw]"
      >
        <Window
          size="lg"
          panelClassName="bg-secondary-900/52"
          bodyClassName="px-6 pb-6 pt-4"
          closeButtonClassName="text-primary-500"
        >
          <div className="flex items-center gap-3 pb-4">
            <img
              src={ppIgImage}
              alt="Instagram profile"
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1 text-primary-50">
              <p className="inter-font truncate text-[0.72rem] font-semibold">amalialatifahputri</p>
              <p className="inter-font truncate text-[0.6rem] text-primary-50/85">
                ♫ AMEL PUTRI . Mawar Tanpa Duri
              </p>
            </div>
            <span className="inter-font text-[0.95rem] text-primary-50/85">...</span>
          </div>

          <img
            src={photoVideo2Image}
            alt="Depression theme concept photography"
            className="block h-[22rem] w-full rounded-[1.1rem] object-cover"
          />

          <div className="mt-4 flex items-center gap-4 text-primary-50">
            <div className="flex items-center gap-1.5">
              <Heart className="h-5 w-5" strokeWidth={2.2} />
              <span className="inter-font text-[0.78rem]">04</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
              <span className="inter-font text-[0.78rem]">07</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Repeat2 className="h-5 w-5" strokeWidth={2.2} />
              <span className="inter-font text-[0.78rem]">19</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Send className="h-5 w-5" strokeWidth={2.2} />
              <span className="inter-font text-[0.78rem]">99</span>
            </div>
          </div>
        </Window>
      </div>

      <div className="absolute bottom-[9.8%] right-[8.7%] z-20">
        <div className="inter-font text-[1.25rem] leading-[1.05] tracking-[-0.04em] text-primary-400 mb-10">
          Video
        </div>
        <button
          type="button"
          onClick={() => handleToBack("photo-video-1")}
          className="inter-font text-[1.02rem] tracking-[-0.03em] text-primary-400/70 border-b border-transparent hover:border-primary-400 cursor-pointer text-start"
        >
          Photo
          <br />
          Concept
        </button>
      </div>
    </section>
  );
}
