import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu } from "lucide-react";
import WelcomeSection from "../../pages/WelcomeSection";
import Background, { type VariantBackgroundType } from "../ui/Background";
import CurriculumSection from "../../pages/CurriculumSection";
import ExperienceSection from "../../pages/ExperienceSection";
import SkillSection from "../../pages/SkillSection";
import EducationSection from "../../pages/EducationSection";
import PhotoVideo1Section from "../../pages/PhotoVideo1";
import PhotoVideo2Section from "../../pages/PhotoVideo2";
import SocialMedia1Section from "../../pages/SocialMedia1";
import SocialMedia2Section from "../../pages/SocialMedia2";
import SocialMedia3Section from "../../pages/SocialMedia3";
import BigProjectSection from "../../pages/BigProjectSection";
import BPTunnelSection from "../../pages/BPTunnelSection";
import BPJtvSection from "../../pages/BPJtvSection";
import BPMuhiSection from "../../pages/BPMuhiSection";

export default function PortfolioExperience() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [backAction, setBackAction] = useState<(() => void) | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activePage, setActivePage] = useState({
    current: "welcome",
    before: "",
  });
  const [background, setBackground] = useState<VariantBackgroundType>("light");

  useEffect(() => {
    const ctx = gsap.context(() => {}, shellRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="h-screen w-full overflow-hidden text-secondary-950">
      <Background variant={background} />
      <div ref={shellRef} className="relative h-full w-full overflow-hidden">
        {activePage.current !== "welcome" && backAction ? (
          <button
            type="button"
            onClick={backAction}
            className="absolute right-[2.15%] top-[3.4%] z-50 flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-2xl border border-primary-500/90 bg-secondary-950/20 text-primary-400 shadow-[0_0_24px_rgba(132,204,22,0.18)] backdrop-blur-[6px] transition-transform duration-300 hover:scale-[1.03]"
            aria-label="Back to welcome section"
          >
            <Menu strokeWidth={2.75} className="h-8 w-8" />
          </button>
        ) : null}

        <WelcomeSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          background={background}
        />

        <CurriculumSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <ExperienceSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <EducationSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <SkillSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <PhotoVideo1Section
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <PhotoVideo2Section
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <SocialMedia1Section
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <SocialMedia2Section
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <SocialMedia3Section
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <BigProjectSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <BPTunnelSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <BPJtvSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />

        <BPMuhiSection
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          activePage={activePage}
          setActivePage={setActivePage}
          setBackground={setBackground}
          registerBackAction={setBackAction}
        />
      </div>
    </main>
  );
}
