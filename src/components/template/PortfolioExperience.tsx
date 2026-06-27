import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import WelcomeSection from "../../pages/WelcomeSection";
import Background, { type VariantBackgroundType } from "../ui/Background";
import CurriculumSection from "../../pages/CurriculumSection";

export default function PortfolioExperience() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activePage, setActivePage] = useState({
    current: "curriculum-vitae",
    before: "",
  });
  const [background, setBackground] = useState<VariantBackgroundType>("dark-glow");

  useEffect(() => {
    const ctx = gsap.context(() => {}, shellRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="h-screen w-full overflow-hidden text-secondary-950">
      <Background variant={background} />
      <div ref={shellRef} className="relative h-full w-full overflow-hidden">
        {/* <WelcomeSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          background={background}
        /> */}

        <CurriculumSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
        />
      </div>
    </main>
  );
}
