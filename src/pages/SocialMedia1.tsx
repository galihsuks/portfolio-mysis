import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import photoTangki1Image from "../assets/social-media/tangki-1.jpg";
import photoTangki2Image from "../assets/social-media/tangki-2.jpg";
import photoTangki3Image from "../assets/social-media/tangki-3.jpg";
import photoTangki4Image from "../assets/social-media/tangki-4.jpg";
import photoTangki5Image from "../assets/social-media/tangki-5.jpg";
import photoTangki6Image from "../assets/social-media/tangki-6.jpg";
import shapeBottomLeft from "../assets/elements/14 2.png";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";
import Window from "../components/ui/Window";

type SocialMedia1SectionProps = {
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

export default function SocialMedia1Section({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
  registerBackAction,
}: SocialMedia1SectionProps) {
  const [, setIsLanguageWindowOpen] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const curriculumRef = useRef<HTMLDivElement | null>(null);
  const vitaeRef = useRef<HTMLDivElement | null>(null);
  const introWindowRef = useRef<HTMLDivElement | null>(null);
  const educationRef = useRef<HTMLDivElement | null>(null);
  const skillRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const topShapeRef = useRef<HTMLImageElement | null>(null);
  const bottomShapeRef = useRef<HTMLImageElement | null>(null);
  const firstRender = useRef(true);
  const isThisPageActive = useRef(false);
  const isTransitionRef = useRef(isTransitioning);

  const socialMediaPosts = [
    photoTangki1Image,
    photoTangki2Image,
    photoTangki3Image,
    photoTangki4Image,
    photoTangki5Image,
    photoTangki6Image,
  ];

  const getParallaxLayers = () => [
    { ref: curriculumRef, x: layerMotion.titleMain, y: layerMotion.titleMain },
    { ref: vitaeRef, x: layerMotion.titleSub, y: layerMotion.titleSub },
    { ref: introWindowRef, x: layerMotion.intro, y: layerMotion.intro },
    { ref: educationRef, x: layerMotion.education, y: layerMotion.education },
    { ref: skillRef, x: layerMotion.skill, y: layerMotion.skill },
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
      gsap.set(educationRef.current, {
        yPercent: 36,
      });
      gsap.set(skillRef.current, {
        yPercent: 50,
      });
      gsap.set(languageRef.current, {
        yPercent: 56,
      });
      gsap.set(experienceRef.current, {
        yPercent: 70,
      });
      gsap.set(topShapeRef.current, {
        yPercent: 22,
      });
      gsap.set(bottomShapeRef.current, {
        yPercent: 34,
      });
      return;
    }
    if (activePage.current == "social-media-1") {
      registerBackAction(() => handleBackToWelcome);
      const fromWelcome = activePage.before === "welcome";
      const direction = fromWelcome ? "yPercent" : "xPercent";
      const directionOpposite = direction === "xPercent" ? "yPercent" : "xPercent";
      gsap.set(containerRef.current, {
        [direction]: (fromWelcome ? 1 : -1) * 100,
        [directionOpposite]: 0,
      });
      gsap.set(curriculumRef.current, {
        [direction]: (fromWelcome ? 1 : -1) * 120,
        [directionOpposite]: 0,
      });
      gsap.set(vitaeRef.current, {
        [direction]: (fromWelcome ? 1 : -1) * 165,
        [directionOpposite]: 0,
      });
      gsap.set(introWindowRef.current, {
        [direction]: (fromWelcome ? 1 : -1) * 40,
        [directionOpposite]: 0,
      });
      gsap.set(educationRef.current, {
        [direction]: (fromWelcome ? 1 : -1) * 100,
        [directionOpposite]: 0,
      });
      gsap.set(skillRef.current, {
        [direction]: (fromWelcome ? 1 : -1) * 50,
        [directionOpposite]: 0,
      });
      gsap.set(languageRef.current, {
        [direction]: (fromWelcome ? 1 : -1) * 56,
        [directionOpposite]: 0,
      });
      gsap.set(experienceRef.current, {
        [direction]: (fromWelcome ? 1 : -1) * 70,
        [directionOpposite]: 0,
      });
      gsap.set(topShapeRef.current, {
        [direction]: (fromWelcome ? 1 : -1) * 22,
        [directionOpposite]: 0,
      });
      gsap.set(bottomShapeRef.current, {
        [direction]: (fromWelcome ? 1 : -1) * 34,
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
        .to(educationRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(skillRef.current, {}, `-=${TRANSITION_DURATION}`)
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
    setActivePage({ current: "welcome", before: "social-media-1" });
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
      .to(skillRef.current, { yPercent: 100 }, `-=${TRANSITION_DURATION}`)
      .to(languageRef.current, { yPercent: 86 }, `-=${TRANSITION_DURATION}`)
      .to(experienceRef.current, { yPercent: 94 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { yPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  const handleToMore = (page: string) => {
    if (isTransitionRef.current) {
      return;
    }

    setIsLanguageWindowOpen(false);
    isThisPageActive.current = false;
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    setActivePage({ current: page, before: "social-media-1" });
    setIsTransitioning(true);

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
      .to(educationRef.current, { xPercent: 62 }, `-=${TRANSITION_DURATION}`)
      .to(skillRef.current, { xPercent: 78 }, `-=${TRANSITION_DURATION}`)
      .to(languageRef.current, { xPercent: 86 }, `-=${TRANSITION_DURATION}`)
      .to(experienceRef.current, { xPercent: 94 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { xPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { xPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 transition-colors duration-500 ${
        activePage.current !== "social-media-1" ? "pointer-events-none" : ""
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
        className="absolute right-[20%] top-[4.5%] z-20 flex items-baseline leading-[0.82] text-primary-500"
      >
        <span className="kapakana-font text-[clamp(7.8rem,12.4vw,13rem)] leading-[0.72]">S</span>
        <span className="inter-font text-[clamp(4rem,6vw,6.25rem)] font-normal tracking-[-0.055em]">
          ocial
        </span>
      </div>

      <div
        ref={vitaeRef}
        className="absolute right-[10.6%] top-[14.2%] z-20 flex items-baseline leading-[0.8] text-primary-500"
      >
        <span className="kapakana-font text-[clamp(7.8rem,12.4vw,13rem)] leading-[0.72]">M</span>
        <span className="inter-font text-[clamp(4rem,6vw,6.25rem)] font-normal tracking-[-0.055em]">
          edia
        </span>
      </div>

      <div
        ref={introWindowRef}
        className="absolute right-[20%] top-[41.5%] z-20 w-[19rem] max-w-[19vw]"
      >
        <p className="inter-font text-[0.92rem] leading-[1.22] tracking-[-0.02em] text-primary-400/95">
          This is the result of my design while at Tedmond Groups in holding responsibility for the
          design of their main product, namely water tanks. This design result uses Photoshop,
          Illustrator and Canva software (if needed).
        </p>
      </div>

      <div
        ref={educationRef}
        className="absolute right-[40%] top-[5%] z-20 w-[60rem] max-w-[60.7vw]"
      >
        <Window
          size="xl"
          panelClassName="bg-secondary-900/52"
          bodyClassName="px-10 pb-10 pt-5"
          closeButtonClassName="text-primary-500"
        >
          <div className="grid grid-cols-3 gap-1.5">
            {socialMediaPosts.map((imageSrc, index) => (
              <img
                key={imageSrc}
                src={imageSrc}
                alt={`Social media design ${index + 1}`}
                className="block aspect-[4.1/5.16] w-full rounded-[0.2rem] object-cover"
              />
            ))}
          </div>
        </Window>
      </div>

      <div ref={skillRef} className="absolute left-[26.5%] top-[4.5%] z-0 h-px w-px opacity-0" />
      <div
        ref={languageRef}
        className="absolute right-[19%] bottom-[31%] z-0 h-px w-px opacity-0"
      />
      <div
        ref={experienceRef}
        className="absolute left-[46.5%] bottom-[5%] z-0 h-px w-px opacity-0"
      />

      <div className="absolute bottom-[8.3%] right-[8.9%] z-20 flex flex-col items-start gap-13">
        <button
          type="button"
          onClick={() => handleToMore("social-media-2")}
          className="inter-font text-[1.02rem] leading-[1.08] tracking-[-0.03em] text-start text-primary-400/58 border-b border-transparent hover:border-primary-400 cursor-pointer"
        >
          Beauty
          <br />
          Brand
        </button>
        <button
          type="button"
          onClick={() => handleToMore("social-media-3")}
          className="inter-font text-[1.02rem] leading-[1.08] tracking-[-0.03em] text-start text-primary-400/58 border-b border-transparent hover:border-primary-400 cursor-pointer"
        >
          Food and
          <br />
          Beverage
        </button>
        <div className="inter-font cursor-pointer text-[1.25rem] leading-[1.05] tracking-[-0.04em] text-primary-400 transition-colors hover:text-primary-500">
          Product
        </div>
      </div>
    </section>
  );
}
