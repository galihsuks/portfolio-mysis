import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft } from "lucide-react";
import shapeBottomLeft from "../assets/elements/14 3.png";
import instaPost1 from "../assets/karya/insta_post_1.jpg";
import instaPost2 from "../assets/karya/insta_post_2.jpg";
import instaPost3 from "../assets/karya/insta_post_3.jpg";
import instaPost4 from "../assets/karya/insta_post_4.jpg";
import instaPost5 from "../assets/karya/insta_post_5.jpg";
import instaPost6 from "../assets/karya/insta_post_6.jpg";
import instaPost7 from "../assets/karya/insta_post_7.jpg";
import instaPost8 from "../assets/karya/insta_post_8.jpg";
import instaPost9 from "../assets/karya/insta_post_9.jpg";
import instaPost10 from "../assets/karya/insta_post_10.jpg";
import instaPost11 from "../assets/karya/insta_post_11.jpg";
import instaPost12 from "../assets/karya/insta_post_12.jpg";
import { TRANSITION_DURATION } from "../constant";
import type { VariantBackgroundType } from "../components/ui/Background";
import Window from "../components/ui/Window";
import Icon, { type IconName } from "../components/ui/Icon";

type SkillSectionProps = {
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
};

type SkillShowcaseItem = {
  id: string;
  image: string;
  alt: string;
  tools: IconName[];
};

const layerMotion = {
  title: 7,
  name: 4,
  intro: 6,
  shapeTop: 2,
  shapeBottom: 4,
} as const;

const skillShowcaseItems: SkillShowcaseItem[] = [
  {
    id: "insta-post-1",
    image: instaPost1,
    alt: "Skill showcase 1",
    tools: ["photoshop", "camera", "canva"],
  },
  {
    id: "insta-post-2",
    image: instaPost2,
    alt: "Skill showcase 2",
    tools: ["photoshop", "camera", "canva"],
  },
  {
    id: "insta-post-3",
    image: instaPost3,
    alt: "Skill showcase 3",
    tools: ["ilustrator", "photoshop", "canva"],
  },
  {
    id: "insta-post-4",
    image: instaPost4,
    alt: "Skill showcase 4",
    tools: ["photoshop", "ilustrator", "canva"],
  },
  {
    id: "insta-post-5",
    image: instaPost5,
    alt: "Skill showcase 5",
    tools: ["photoshop", "figma", "canva"],
  },
  {
    id: "insta-post-6",
    image: instaPost6,
    alt: "Skill showcase 6",
    tools: ["blender", "photoshop", "ilustrator"],
  },
  {
    id: "insta-post-7",
    image: instaPost7,
    alt: "Skill showcase 7",
    tools: ["camera", "photoshop", "capcut"],
  },
  {
    id: "insta-post-8",
    image: instaPost8,
    alt: "Skill showcase 8",
    tools: ["premier", "photoshop", "ilustrator", "afterEffect"],
  },
  {
    id: "insta-post-9",
    image: instaPost9,
    alt: "Skill showcase 9",
    tools: ["premier", "camera"],
  },
  {
    id: "insta-post-10",
    image: instaPost10,
    alt: "Skill showcase 10",
    tools: ["blender", "photoshop", "ilustrator", "afterEffect"],
  },
  {
    id: "insta-post-11",
    image: instaPost11,
    alt: "Skill showcase 11",
    tools: ["blender", "afterEffect"],
  },
  {
    id: "insta-post-12",
    image: instaPost12,
    alt: "Skill showcase 12",
    tools: ["premier", "photoshop", "ilustrator", "afterEffect"],
  },
];

const dockIcons: IconName[] = [
  "premier",
  "photoshop",
  "ilustrator",
  "afterEffect",
  "canva",
  "figma",
  "blender",
  "camera",
  "capcut",
];

const dockIconRotations: Record<IconName, string> = {
  premier: "-rotate-[14deg]",
  photoshop: "rotate-[13deg]",
  ilustrator: "-rotate-[4deg]",
  afterEffect: "rotate-[18deg]",
  canva: "rotate-0",
  figma: "rotate-[16deg]",
  blender: "-rotate-[12deg]",
  camera: "-rotate-[8deg]",
  capcut: "rotate-0",
  star: "rotate-0",
  univIsi: "rotate-0",
  univIts: "rotate-0",
  jtv: "rotate-0",
  muhi: "rotate-0",
  tunnel: "rotate-0",
  aafreeda: "rotate-0",
  plaza: "rotate-0",
  ragam: "rotate-0",
  sosmedITS: "rotate-0",
  swk: "rotate-0",
  indo: "rotate-0",
  inggris: "rotate-0",
  java: "rotate-0",
};

const loopedShowcaseItems = [...skillShowcaseItems, ...skillShowcaseItems, ...skillShowcaseItems];

export default function SkillSection({
  isTransitioning,
  setIsTransitioning,
  activePage,
  setActivePage,
  setBackground,
  registerBackAction,
}: SkillSectionProps) {
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const introWindowRef = useRef<HTMLDivElement | null>(null);
  const topShapeRef = useRef<HTMLImageElement | null>(null);
  const bottomShapeRef = useRef<HTMLImageElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);
  const isThisPageActive = useRef(false);
  const isTransitionRef = useRef(isTransitioning);

  const getParallaxLayers = () => [
    { ref: titleRef, x: layerMotion.title, y: layerMotion.title },
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
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    let frame = 0;
    let restoreBehaviorFrame = 0;

    const updateActiveCard = () => {
      const cards = Array.from(carousel.querySelectorAll<HTMLElement>("[data-skill-card]"));

      if (!cards.length) {
        return;
      }

      const containerRect = carousel.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(center - containerCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index % skillShowcaseItems.length;
        }
      });

      setActiveSkillIndex(nearestIndex);
    };

    const normalizeInfiniteScroll = () => {
      const singleLoopWidth = carousel.scrollWidth / 3;

      if (!singleLoopWidth) {
        return;
      }

      const jumpWithoutSmooth = (nextScrollLeft: number) => {
        carousel.style.scrollBehavior = "auto";
        carousel.scrollLeft = nextScrollLeft;

        cancelAnimationFrame(restoreBehaviorFrame);
        restoreBehaviorFrame = requestAnimationFrame(() => {
          carousel.style.scrollBehavior = "";
        });
      };

      if (carousel.scrollLeft < singleLoopWidth * 0.5) {
        jumpWithoutSmooth(carousel.scrollLeft + singleLoopWidth);
      } else if (carousel.scrollLeft > singleLoopWidth * 1.5) {
        jumpWithoutSmooth(carousel.scrollLeft - singleLoopWidth);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        normalizeInfiniteScroll();
        updateActiveCard();
      });
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();
      carousel.scrollLeft += event.deltaY;
    };

    const singleLoopWidth = carousel.scrollWidth / 3;
    carousel.scrollLeft = singleLoopWidth;
    updateActiveCard();

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    carousel.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(restoreBehaviorFrame);
      carousel.removeEventListener("scroll", handleScroll);
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      gsap.set(containerRef.current, {
        xPercent: 200,
      });
      gsap.set(titleRef.current, {
        xPercent: 165,
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
    }
    if (activePage.current == "skill") {
      registerBackAction(() => handleBackToWelcome);
      gsap.set(containerRef.current, {
        xPercent: 100,
        yPercent: 0,
      });
      gsap.set(titleRef.current, {
        xPercent: 165,
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
        .to(titleRef.current, {}, `-=${TRANSITION_DURATION}`)
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
    setActivePage({ current: "welcome", before: "skill" });
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
      .to(titleRef.current, { yPercent: 155 }, `-=${TRANSITION_DURATION}`)
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
    setActivePage({ current: "curriculum-vitae", before: "skill" });
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
      .to(titleRef.current, { xPercent: 155 }, `-=${TRANSITION_DURATION}`)
      .to(introWindowRef.current, { xPercent: 200 }, `-=${TRANSITION_DURATION}`)
      .to(topShapeRef.current, { xPercent: 30 }, `-=${TRANSITION_DURATION}`)
      .to(bottomShapeRef.current, { xPercent: 46 }, `-=${TRANSITION_DURATION}`);
  };

  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 transition-colors duration-500 ${
        activePage.current !== "skill" ? "pointer-events-none" : ""
      }`}
    >
      <button
        type="button"
        onClick={backToCurriculum}
        className="absolute left-[2.15%] top-[3.4%] z-50 flex h-[6svh] w-[6svh] items-center justify-center rounded-[1cqh] border border-primary-500/90 bg-secondary-950/20 text-primary-400 shadow-[0_0_24px_rgba(132,204,22,0.18)] backdrop-blur-[6px] transition-transform duration-300 hover:scale-[1.03]"
        aria-label="Back to welcome section"
      >
        <ArrowLeft strokeWidth={2.75} className={"h-[4svh] w-[4svh]"} />
      </button>
      <img
        ref={topShapeRef}
        src={shapeBottomLeft}
        alt=""
        className={`pointer-events-none absolute left-[14.5%] top-[-18%] z-0 h-[60%]`}
      />
      <img
        ref={bottomShapeRef}
        src={shapeBottomLeft}
        alt=""
        className={`pointer-events-none absolute bottom-[5%] left-[-7%] z-5 h-[40%]`}
      />

      <div ref={titleRef} className="absolute left-[48%] top-[5%] z-20 text-secondary-950">
        <span className="jersey-font text-[10cqh] font-normal">Skill</span>
      </div>

      <div ref={introWindowRef} className="absolute inset-x-[5%] top-[20%] z-9">
        <Window variant="light" size="custom" showCloseButton={false}>
          <div className={`flex flex-col items-center`}>
            <div
              ref={carouselRef}
              className="w-full overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className={`flex w-max items-center px-[2%] gap-[1svh] h-[50svh]`}>
                {loopedShowcaseItems.map((item, index) => {
                  const isActive = skillShowcaseItems[activeSkillIndex]?.id === item.id;

                  return (
                    <article
                      key={`${item.id}-${index}`}
                      data-skill-card
                      className={`shrink-0 overflow-hidden rounded-[3svh] bg-white/32 transition-all duration-500 ease-out ${
                        isActive ? `mt-0 h-[40svh]` : `mt-[2svh] h-[35svh]`
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="block h-full w-full object-cover"
                      />
                    </article>
                  );
                })}
              </div>
            </div>

            <div
              className={`mt-[2svh] gap-[2svh] px-[5svh] py-[2svh] flex w-fit max-w-full flex-wrap items-center justify-center rounded-full border border-white/80 bg-white/88 shadow-[0_14px_36px_rgba(49,136,26,0.24)]`}
            >
              {dockIcons.map((icon) => {
                const isActive = skillShowcaseItems[activeSkillIndex]?.tools.includes(icon);

                return (
                  <Icon
                    key={icon}
                    className={`transition-all duration-500 ease-out ${dockIconRotations[icon]} ${
                      isActive
                        ? `h-[5svh] w-auto scale-110 opacity-100`
                        : `h-[5svh] w-auto scale-90 opacity-35`
                    }`}
                    imgClassName="drop-shadow-[0_8px_14px_rgba(0,0,0,0.16)]"
                  >
                    {icon}
                  </Icon>
                );
              })}
            </div>
          </div>
        </Window>
      </div>
    </section>
  );
}
