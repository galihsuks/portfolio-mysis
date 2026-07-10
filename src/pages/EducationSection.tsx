import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import photoImage from "../assets/my_pic.png";
import shapeBottomLeft from "../assets/elements/14 3.png";
import ijazahS1 from "../assets/karya/ijazah_s1.jpg";
import ijazahS2 from "../assets/karya/ijazah_s2.jpg";
import transkripS1 from "../assets/karya/transkrip_s1.jpg";
import transkripS2 from "../assets/karya/transkrip_s2.jpg";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";
import Window from "../components/ui/Window";
import Icon, { type IconName } from "../components/ui/Icon";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

type EducationSectionProps = {
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

const educationItems = [
  {
    id: "ijazah-s2",
    image: ijazahS2,
    title: "Videography Literature Postgraduate in Indonesian Institute of Arts Yogyakarta",
    period: "2022 - 2024",
    university: "univIsi" as IconName,
  },
  {
    id: "transkrip-s2",
    image: transkripS2,
    title: "Videography Literature Postgraduate in Indonesian Institute of Arts Yogyakarta",
    period: "2022 - 2024",
    university: "univIsi" as IconName,
  },
  {
    id: "ijazah-s1",
    image: ijazahS1,
    title: "Industrial Design Product in Institut Teknologi Sepuluh Nopember",
    period: "2017 - 2021",
    university: "univIts" as IconName,
  },
  {
    id: "transkrip-s1",
    image: transkripS1,
    title: "Industrial Design Product in Institut Teknologi Sepuluh Nopember",
    period: "2017 - 2021",
    university: "univIts" as IconName,
  },
];

const layerMotion = {
  titleSub: 7,
  name: 4,
  photo: 3,
  intro: 6,
  shapeTop: 2,
  shapeBottom: 4,
} as const;

export default function EducationSection({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
  registerBackAction,
}: EducationSectionProps) {
  const [activeEducationIndex, setActiveEducationIndex] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const introWindowRef = useRef<HTMLDivElement | null>(null);
  const topShapeRef = useRef<HTMLImageElement | null>(null);
  const bottomShapeRef = useRef<HTMLImageElement | null>(null);
  const firstRender = useRef(true);
  const isThisPageActive = useRef(false);
  const isTransitionRef = useRef(isTransitioning);
  const activeEducation = educationItems[activeEducationIndex];

  const showPreviousEducation = () => {
    setActiveEducationIndex((current) => (current === 0 ? educationItems.length - 1 : current - 1));
  };

  const showNextEducation = () => {
    setActiveEducationIndex((current) => (current === educationItems.length - 1 ? 0 : current + 1));
  };

  const getParallaxLayers = () => [
    { ref: experienceRef, x: layerMotion.titleSub, y: layerMotion.titleSub },
    { ref: nameRef, x: layerMotion.name, y: layerMotion.name },
    { ref: photoRef, x: layerMotion.photo, y: layerMotion.photo },
    { ref: introWindowRef, x: layerMotion.intro, y: layerMotion.intro },
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
        xPercent: 100,
      });
      gsap.set(experienceRef.current, {
        xPercent: 165,
      });
      gsap.set(nameRef.current, {
        xPercent: 52,
      });
      gsap.set(photoRef.current, {
        xPercent: 58,
      });
      gsap.set(introWindowRef.current, {
        xPercent: 40,
      });
      gsap.set(topShapeRef.current, {
        xPercent: 22,
      });
      gsap.set(bottomShapeRef.current, {
        xPercent: 34,
      });
      return;
    }
    if (activePage.current == "education") {
      registerBackAction(() => handleBackToWelcome);
      gsap.set(containerRef.current, {
        xPercent: 100,
        yPercent: 0,
      });
      gsap.set(experienceRef.current, {
        xPercent: 165,
        yPercent: 0,
      });
      gsap.set(nameRef.current, {
        xPercent: 52,
        yPercent: 0,
      });
      gsap.set(photoRef.current, {
        xPercent: 58,
        yPercent: 0,
      });
      gsap.set(introWindowRef.current, {
        xPercent: 200,
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
        .to(experienceRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(nameRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(photoRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(introWindowRef.current, {}, `-=${TRANSITION_DURATION}`)
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
    setActivePage({ current: "welcome", before: "education" });
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
      .to(experienceRef.current, { yPercent: 155 }, `-=${TRANSITION_DURATION}`)
      .to(nameRef.current, { yPercent: 70 }, `-=${TRANSITION_DURATION}`)
      .to(photoRef.current, { yPercent: 82 }, `-=${TRANSITION_DURATION}`)
      .to(introWindowRef.current, { yPercent: 200 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { yPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  const backToCurriculum = () => {
    if (isTransitionRef.current) {
      return;
    }

    isThisPageActive.current = false;
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    setActivePage({ current: "curriculum-vitae", before: "education" });
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
      .to(experienceRef.current, { xPercent: 155 }, `-=${TRANSITION_DURATION}`)
      .to(nameRef.current, { xPercent: 70 }, `-=${TRANSITION_DURATION}`)
      .to(photoRef.current, { xPercent: 82 }, `-=${TRANSITION_DURATION}`)
      .to(introWindowRef.current, { xPercent: 200 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { xPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { xPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 transition-colors duration-500 ${
        activePage.current !== "education" ? "pointer-events-none" : ""
      }`}
    >
      <button
        type="button"
        onClick={backToCurriculum}
        className="absolute left-[2.15%] top-[3.4%] z-50 flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-2xl border border-primary-500/90 bg-secondary-950/20 text-primary-400 shadow-[0_0_24px_rgba(132,204,22,0.18)] backdrop-blur-[6px] transition-transform duration-300 hover:scale-[1.03]"
        aria-label="Back to welcome section"
      >
        <ArrowLeft strokeWidth={2.75} className="h-8 w-8" />
      </button>
      <img
        ref={topShapeRef}
        src={shapeBottomLeft}
        alt=""
        className="pointer-events-none absolute left-[14.5%] top-[-10%] z-0 w-[40rem] max-w-[36vw]"
      />
      <img
        ref={bottomShapeRef}
        src={shapeBottomLeft}
        alt=""
        className="pointer-events-none absolute bottom-[5%] left-[-1.5%] z-11 w-[20rem] max-w-[22vw]"
      />

      <div ref={nameRef} className="absolute left-[6.6%] top-[21.5%] z-20 text-secondary-950">
        <span className="inter-font whitespace-pre-line text-left text-[clamp(1.55rem,2.2vw,2.55rem)] leading-[1.06] font-normal tracking-[-0.03em]">
          Amalia
          <br />
          Latifah
          <br />
          Putri
        </span>
      </div>

      <div
        ref={photoRef}
        className="absolute bottom-0 left-[5%] top-[10%] z-10 w-[40rem] max-w-[70vw]"
      >
        <img
          src={photoImage}
          alt="Portrait of Amalia Latifah Putri"
          className="block h-auto w-full object-contain drop-shadow-[0_14px_30px_rgba(0,0,0,0.32)]"
        />
      </div>

      <div
        ref={experienceRef}
        className="absolute left-1/2 -translate-y-1/2 top-[10%] z-20 flex items-baseline leading-[0.8] text-secondary-950"
      >
        <span className="jersey-font text-[clamp(4rem,6vw,6.25rem)] font-normal">Education</span>
      </div>

      <div ref={introWindowRef} className="absolute left-[calc(5%+22rem)] top-[20%] z-9">
        <Window
          variant="light"
          size="custom"
          bodyClassName="ps-72 pe-10 pb-10 pt-8"
          closeButtonClassName="text-primary-500"
        >
          <div className="relative w-[calc(75vw-5vw-22rem)] items-start gap-10">
            <div className="flex gap-5 items-center">
              <div
                onClick={showPreviousEducation}
                className="flex h-16 w-16 z-20 items-center justify-center rounded-full border border-secondary-950/12 bg-white/12 text-secondary-950/25 backdrop-blur-[2px] transition-colors duration-300 hover:text-secondary-950/45"
                aria-label="Previous document"
              >
                <ChevronLeft strokeWidth={2.5} className="h-10 w-10" />
              </div>
              <div className="h-[30rem] w-[40rem] overflow-hidden flex items-center justify-center">
                <img
                  src={activeEducation.image}
                  alt={activeEducation.title}
                  className={`rounded-[2rem] ${activeEducation.id === "transkrip-s2" ? "h-full" : "w-full"} object-cover shadow-[0_18px_36px_rgba(52,138,32,0.16)]`}
                />
              </div>
              <div
                onClick={showNextEducation}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-secondary-950/12 bg-white/12 text-secondary-950/25 backdrop-blur-[2px] transition-colors duration-300 hover:text-secondary-950/45"
                aria-label="Next document"
              >
                <ChevronRight strokeWidth={2.5} className="h-10 w-10" />
              </div>
            </div>

            <div className="ps-21 text-secondary-950 max-w-sm mt-5">
              <h3 className="inter-font text-[1.15rem] leading-[1.1] tracking-[-0.03em]">
                {activeEducation.title}
              </h3>
              <p className="inter-font mt-5 text-[1.05rem] leading-none">
                {activeEducation.period}
              </p>
            </div>

            <div className="absolute bottom-0 right-0 flex items-end justify-between gap-8">
              <div className="flex flex-col gap-4">
                <Icon
                  children="univIsi"
                  className={`h-[7.25rem] w-[7.25rem] rounded-[1.35rem] bg-white/70 p-3 shadow-[0_10px_22px_rgba(52,138,32,0.18)] transition-all duration-300 ${
                    activeEducation.university === "univIsi"
                      ? "opacity-100 saturate-100"
                      : "opacity-45 saturate-0"
                  }`}
                />
                <Icon
                  children="univIts"
                  className={`h-[7.25rem] w-[7.25rem] rounded-[1.35rem] bg-white/70 p-3 shadow-[0_10px_22px_rgba(52,138,32,0.18)] transition-all duration-300 ${
                    activeEducation.university === "univIts"
                      ? "opacity-100 saturate-100"
                      : "opacity-45 saturate-0"
                  }`}
                />
              </div>
            </div>
          </div>
        </Window>
      </div>
    </section>
  );
}
