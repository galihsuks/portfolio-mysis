import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, Smartphone } from "lucide-react";
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
import BrandingSection from "../../pages/BrandingSection";
import BrandingSWKSection from "../../pages/BrandingSWKSection";
import { useDeviceDetect } from "../../hooks/UseDeviceDetect";
import BrandingPlazaSection from "../../pages/BrandingPlazaSection";
import BrandingAssignmentSection from "../../pages/BrandingAssignmentSection";
import BrandingRagamRasaSection from "../../pages/BrandingRagamRasaSection";
import BrandingGSMSection from "../../pages/BrandingGSMSection";
import Greeting from "../ui/Greeting";

export default function PortfolioExperience() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [backAction, setBackAction] = useState<(() => void) | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fitClassName, setFitClassName] = useState("w-full h-auto [container-type:size]");
  const [activePage, setActivePage] = useState({
    current: "welcome",
    before: "",
  });
  const [background, setBackground] = useState<VariantBackgroundType>("light");
  const { isMobile, isLandscape } = useDeviceDetect();
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {}, shellRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const element = shellRef.current;
    if (!element) return;
    const { width, height } = element.getBoundingClientRect();
    if (!width || !height) return;
    const containerRatio = width / height;
    setFitClassName(
      containerRatio > 16 / 9
        ? "h-full w-auto [container-type:size]"
        : "w-full h-auto [container-type:size]",
    );
  }, [shellRef.current]);

  if (!isLandscape) {
    return (
      <div className="h-[100svh] w-full flex flex-col justify-center items-center">
        <div>
          <Smartphone size={30} />
        </div>
        <p className="text-[11px] mt-2 font-semibold">Rotate your phone</p>
      </div>
    );
  }

  return (
    <>
      <Greeting hide={isLoad} />
      <main className="block h-[100svh] w-full overflow-hidden text-secondary-950">
        <Background variant={background} />
        <div ref={shellRef} className={`relative h-full w-full overflow-hidden`}>
          {activePage.current !== "welcome" && backAction ? (
            <button
              type="button"
              onClick={backAction}
              className="absolute right-[2.15%] top-[3.4%] z-50 flex h-[6svh] w-[6svh] items-center justify-center rounded-[1cqh] border border-primary-500/90 bg-secondary-950/20 text-primary-400 shadow-[0_0_24px_rgba(132,204,22,0.18)] backdrop-blur-[6px] transition-transform duration-300 hover:scale-[1.03]"
              aria-label="Back to welcome section"
            >
              <Menu strokeWidth={2.75} className={"h-[4svh] w-[4svh]"} />
            </button>
          ) : null}

          <WelcomeSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            background={background}
            aspectFitClassName={fitClassName}
          />

          <CurriculumSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <ExperienceSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <EducationSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <SkillSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
          />

          <PhotoVideo1Section
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <PhotoVideo2Section
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <SocialMedia1Section
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <SocialMedia2Section
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <SocialMedia3Section
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <BigProjectSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <BPTunnelSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <BPJtvSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <BPMuhiSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <BrandingSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <BrandingSWKSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <BrandingPlazaSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <BrandingAssignmentSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <BrandingRagamRasaSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />

          <BrandingGSMSection
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activePage={activePage}
            setActivePage={setActivePage}
            setBackground={setBackground}
            registerBackAction={setBackAction}
            isMobile={isMobile}
            aspectFitClassName={fitClassName}
          />
        </div>
      </main>
    </>
  );
}
