import { useEffect, useRef } from "react";
import gsap from "gsap";
import photoImage from "../assets/my_pic.png";
import shapeBottomLeft from "../assets/elements/14 2.png";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";
import Folder from "../components/ui/Folder";
import Window from "../components/ui/Window";

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
  menu: 11,
  shapeTop: 2,
  shapeBottom: 4,
} as const;

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
  const nameRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const introWindowRef = useRef<HTMLDivElement | null>(null);
  const educationRef = useRef<HTMLDivElement | null>(null);
  const skillRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLButtonElement | null>(null);
  const topShapeRef = useRef<HTMLImageElement | null>(null);
  const bottomShapeRef = useRef<HTMLImageElement | null>(null);
  const firstRender = useRef(true);
  const isThisPageActive = useRef(false);
  const isTransitionRef = useRef(isTransitioning);

  const getParallaxLayers = () => [
    { ref: curriculumRef, x: layerMotion.titleMain, y: layerMotion.titleMain },
    { ref: vitaeRef, x: layerMotion.titleSub, y: layerMotion.titleSub },
    { ref: nameRef, x: layerMotion.name, y: layerMotion.name },
    { ref: photoRef, x: layerMotion.photo, y: layerMotion.photo },
    { ref: introWindowRef, x: layerMotion.intro, y: layerMotion.intro },
    { ref: educationRef, x: layerMotion.education, y: layerMotion.education },
    { ref: skillRef, x: layerMotion.skill, y: layerMotion.skill },
    { ref: languageRef, x: layerMotion.language, y: layerMotion.language },
    { ref: experienceRef, x: layerMotion.experience, y: layerMotion.experience },
    { ref: menuRef, x: layerMotion.menu, y: layerMotion.menu },
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
      gsap.set(nameRef.current, {
        yPercent: 52,
      });
      gsap.set(photoRef.current, {
        yPercent: 58,
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
      gsap.set(menuRef.current, {
        yPercent: 26,
      });
      gsap.set(topShapeRef.current, {
        yPercent: 22,
      });
      gsap.set(bottomShapeRef.current, {
        yPercent: 34,
      });
      return;
    }
    if (activePage.current == "curriculum-vitae") {
      const fromWelcome = activePage.before === "welcome";
      gsap.set(containerRef.current, {
        yPercent: fromWelcome ? 100 : -100,
      });
      gsap.set(curriculumRef.current, {
        yPercent: fromWelcome ? 120 : -120,
      });
      gsap.set(vitaeRef.current, {
        yPercent: fromWelcome ? 165 : -145,
      });
      gsap.set(nameRef.current, {
        yPercent: fromWelcome ? 52 : -62,
      });
      gsap.set(photoRef.current, {
        yPercent: fromWelcome ? 58 : -70,
      });
      gsap.set(introWindowRef.current, {
        yPercent: fromWelcome ? 40 : -54,
      });
      gsap.set(educationRef.current, {
        yPercent: fromWelcome ? 36 : -56,
      });
      gsap.set(skillRef.current, {
        yPercent: fromWelcome ? 50 : -72,
      });
      gsap.set(languageRef.current, {
        yPercent: fromWelcome ? 56 : -78,
      });
      gsap.set(experienceRef.current, {
        yPercent: fromWelcome ? 70 : -86,
      });
      gsap.set(menuRef.current, {
        yPercent: fromWelcome ? 26 : -34,
      });
      gsap.set(topShapeRef.current, {
        yPercent: fromWelcome ? 22 : -26,
      });
      gsap.set(bottomShapeRef.current, {
        yPercent: fromWelcome ? 34 : -42,
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
        .to(nameRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(photoRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(introWindowRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(educationRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(skillRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(languageRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(experienceRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(menuRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(topShapeRef.current, {}, `-=${TRANSITION_DURATION}`)
        .to(bottomShapeRef.current, {}, `-=${TRANSITION_DURATION}`);
    }
  }, [activePage.current]);

  const handleBackToWelcome = () => {
    if (isTransitioning) {
      return;
    }

    isThisPageActive.current = false;
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    setActivePage({ current: "welcome", before: "curriculum-vitae" });
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
      .to(nameRef.current, { yPercent: 70 }, `-=${TRANSITION_DURATION}`)
      .to(photoRef.current, { yPercent: 82 }, `-=${TRANSITION_DURATION}`)
      .to(introWindowRef.current, { yPercent: 58 }, `-=${TRANSITION_DURATION}`)
      .to(educationRef.current, { yPercent: 62 }, `-=${TRANSITION_DURATION}`)
      .to(skillRef.current, { yPercent: 78 }, `-=${TRANSITION_DURATION}`)
      .to(languageRef.current, { yPercent: 86 }, `-=${TRANSITION_DURATION}`)
      .to(experienceRef.current, { yPercent: 94 }, `-=${TRANSITION_DURATION}`)
      .to(menuRef.current, { yPercent: 42 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { yPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { yPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 transition-colors duration-500 ${
        activePage.current !== "curriculum-vitae" ? "pointer-events-none" : ""
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

      <button
        ref={menuRef}
        type="button"
        onClick={handleBackToWelcome}
        className="absolute right-[2.15%] top-[3.4%] z-40 flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-2xl border border-primary-500/90 bg-secondary-950/20 text-primary-400 shadow-[0_0_24px_rgba(132,204,22,0.18)] backdrop-blur-[6px] transition-transform duration-300 hover:scale-[1.03]"
        aria-label="Back to welcome section"
      >
        <span className="relative flex h-7 w-7 flex-col items-center justify-center gap-[0.34rem]">
          <span className="block h-[0.24rem] w-full rounded-full bg-current" />
          <span className="block h-[0.24rem] w-full rounded-full bg-current" />
          <span className="block h-[0.24rem] w-full rounded-full bg-current" />
        </span>
      </button>

      <div ref={nameRef} className="absolute left-[6.6%] top-[21.5%] z-20 text-primary-400">
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
        ref={curriculumRef}
        className="absolute right-[8.4%] top-[4.5%] z-20 flex items-baseline leading-[0.82] text-primary-500"
      >
        <span className="kapakana-font text-[clamp(7.8rem,12.4vw,13rem)] leading-[0.72]">C</span>
        <span className="inter-font text-[clamp(4rem,6vw,6.25rem)] font-normal tracking-[-0.055em]">
          urriculum
        </span>
      </div>

      <div
        ref={vitaeRef}
        className="absolute right-[10.6%] top-[14.2%] z-20 flex items-baseline leading-[0.8] text-primary-500"
      >
        <span className="kapakana-font text-[clamp(7.8rem,12.4vw,13rem)] leading-[0.72]">V</span>
        <span className="inter-font text-[clamp(4rem,6vw,6.25rem)] font-normal tracking-[-0.055em]">
          itae
        </span>
      </div>

      <div
        ref={introWindowRef}
        className="absolute left-[calc(5%+34rem)] top-[25%] z-9 w-[27.7rem] max-w-[27vw]"
      >
        <Window size="md">
          <p className="inter-font text-[1.01rem] leading-[1.27] tracking-[-0.02em] text-primary-400/95">
            As a Bachelor of Design graduate who is currently studying Postgraduate education in
            Videography, I have abilities in the field of visual design concepts, such as graphic
            design, 3D, videography and photography. I also have a deep interest in the study of
            visual arts. I aspire to integrate my knowledge and skill to become a professional
            contributing to the fields of design and video art. I am enthusiastic about sharing my
            knowledge and experience with the work team and am open to receiving any feedback to
            further develop my potential.
          </p>
        </Window>
      </div>

      <div ref={educationRef} className="absolute right-[19.1%] top-[33.6%] z-30">
        <Folder
          label="Education"
          size="lg"
          icons={["univIsi", "univIts"]}
          className="w-[14.5rem]"
          folderClassName="h-[12.1rem] w-[12.5rem]"
          labelClassName="mt-1 text-[1.1rem]"
        />
      </div>

      <div ref={skillRef} className="absolute right-[19.1%] top-[60.1%] z-30">
        <Folder
          label="Skill"
          size="lg"
          icons={[
            "canva",
            "premier",
            "ilustrator",
            "camera",
            "afterEffect",
            "figma",
            "photoshop",
            "blender",
            "capcut",
          ]}
          className="w-[15.2rem]"
          folderClassName="h-[12.4rem] w-[13rem]"
          labelClassName="mt-0.5 text-[1.1rem]"
        />
      </div>

      <div ref={languageRef} className="absolute right-[5.8%] top-[60.3%] z-30">
        <Folder
          label="Language"
          size="lg"
          icons={["figma", "canva", "blender"]}
          className="w-[14.5rem]"
          folderClassName="h-[12.2rem] w-[12.4rem]"
          labelClassName="mt-0.5 text-[1.1rem]"
        />
      </div>

      <div ref={experienceRef} className="absolute left-[45.3%] top-[71.7%] z-30">
        <Folder
          label="Experience"
          size="lg"
          icons={["star", "star", "star"]}
          className="w-[13.8rem]"
          folderClassName="h-[11.4rem] w-[11.7rem]"
          labelClassName="mt-1 text-[1.05rem]"
        />
      </div>
    </section>
  );
}
