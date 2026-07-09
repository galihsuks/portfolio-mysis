import { useEffect, useRef } from "react";
import gsap from "gsap";
import photoImage from "../assets/my_pic.png";
import shapeBottomLeft from "../assets/elements/14 3.png";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";
import Window from "../components/ui/Window";
import { ArrowLeft } from "lucide-react";

type ExperienceSectionProps = {
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

const experienceItems = [
  {
    title: "Visual Communication Design Lecturer in Universitas Selamat Sri Kendal",
    period: "Sept 2025 - Now",
    bullets: [
      "Responsible for developing and delivering project-based learning in Branding, Animation, and Visual Communication Design courses, guiding students through end-to-end creative processes from research and concept development to final production.",
      "Mentored students in conducting audience analysis, creating mood boards, visual explorations, storyboards, and design prototypes, ensuring projects met both conceptual and aesthetic objectives.",
      "Provided creative direction and design feedback to maintain visual quality, strengthen problem-solving skills, and improve the effectiveness of visual communication outcomes.",
      "Supervised multidisciplinary creative projects, evaluated design strategies and execution, and facilitated the development of industry-relevant portfolios and presentation skills.",
    ],
  },
  {
    title: "Graphic Design Team in Tedmond Groups",
    period: "Feb - Sept, 2025",
    bullets: [
      "Responsible for creating and managing digital visual content across multiple platforms, including Instagram, TikTok, YouTube, and e-commerce channels.",
      "Designed promotional materials such as social media posts, banners, thumbnails, logos, and supporting brand assets while ensuring consistency with brand identity guidelines.",
      "Collaborated closely with marketing and content teams to develop visuals aligned with campaign objectives, adapted brand visuals for various digital platforms, and prepared monthly design performance reports.",
    ],
  },
  {
    title: "Internship Graphic Designer in PT. Krearture Media Indonesia",
    period: "Nov - Dec, 2024",
    bullets: [
      "Designed large-scale environmental graphics and branding projects, including the 100-meter Tunnel Joyoboyo Bus Terminal-Surabaya Zoo corridor.",
      "Developed branding concepts and design alternatives for public spaces, corporate events, and culinary tourism centers in Surabaya, while also creating digital marketing materials such as social media posters and promotional video content.",
    ],
  },
  {
    title: "Big Project (Freelance) as Museum Design Team",
    period: "Nov - Dec, 2023",
    bullets: [
      "Designing decorations and layouts on wall with dimensions of approximately 12 x 3 meters, three areas, and sizes of 10 x 3 meters, three areas.",
      "This process is carried out using the main software, Adobe Photoshop and supporting software, Adobe Illustrator.",
    ],
  },
  {
    title:
      "Curator of Video and Photo Exhibition 'Manusia dan Ruang' in Gallery Pascasarjana ISI Yogyakarta",
    period: "May, 2023",
    bullets: [
      "Assisting in providing an overall description of graduate students' assignment works in the media Art Creation program, particularly in videography and photography, both textually and analyzing the appropriateness of their works within the exhibition theme.",
    ],
  },
  {
    title: "Graphic Design Team in CV. Insan Produktif Konveksi",
    period: "2022 (8 months)",
    bullets: [
      "Creating all aspects related to graphic design work, such as creating thumbnails for various social media platforms (Instagram posts, Instagram reels, TikTok and web articles), as well as designing the user interface website and company letterhead.",
      "Assisting in the ideation and implementation of content ideas for all videos on social media, including creating company profile videos.",
    ],
  },
  {
    title: "Internship Program Support Marketing Team Social Media in JTV Surabaya",
    period: "2020 (6 months)",
    bullets: [
      "Created digital communication materials, including greeting posts, e-flyers, and presentation designs for company programs, events, and partner collaborations.",
      "Produced motion graphic content for public campaigns during the 2020 regional election and contributed creative illustration work for a commemorative Flazz card design competition celebrating the 75th anniversary of East Java.",
    ],
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

export default function ExperienceSection({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
  registerBackAction,
}: ExperienceSectionProps) {
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
    if (activePage.current == "experience") {
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
    setActivePage({ current: "welcome", before: "experience" });
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
    setActivePage({ current: "curriculum-vitae", before: "experience" });
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
        activePage.current !== "experience" ? "pointer-events-none" : ""
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
        <span className="jersey-font text-[clamp(4rem,6vw,6.25rem)] font-normal">Experience</span>
      </div>

      <div ref={introWindowRef} className="absolute left-[calc(5%+22rem)] top-[20%] z-9">
        <Window
          variant="light"
          size="custom"
          bodyClassName="ps-70 pe-15 pb-13 pt-8"
          closeButtonClassName="text-primary-500"
        >
          <div className="grid grid-cols-2 gap-x-10 gap-y-9 w-[calc(75vw-5vw-22rem)]">
            {experienceItems.map((item) => (
              <article key={`${item.title}-${item.period}`} className="flex gap-x-6">
                <div className="inter-font text-secondary-950 w-[100px]">
                  <h3 className="text-[0.68rem] leading-[1.05] tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-4 text-[0.62rem] leading-none">{item.period}</p>
                </div>

                <div className="flex-1">
                  <ul className="inter-font list-disc space-y-1.5 pl-4 text-[0.56rem] leading-[1.05] tracking-[-0.02em] text-secondary-950 marker:text-secondary-950">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Window>
      </div>
    </section>
  );
}
