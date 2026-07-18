import afterEffectIcon from "../../assets/icons/after-effect.png";
import blenderIcon from "../../assets/icons/blender.png";
import cameraIcon from "../../assets/icons/camera.png";
import canvaIcon from "../../assets/icons/canva.png";
import capcutIcon from "../../assets/icons/capcut.png";
import figmaIcon from "../../assets/icons/figma.png";
import ilustratorIcon from "../../assets/icons/ilustrator.png";
import photoshopIcon from "../../assets/icons/photoshop.png";
import premierIcon from "../../assets/icons/premier.png";
import starIcon from "../../assets/icons/star.png";
import univIsiIcon from "../../assets/icons/univ-isi.png";
import univItsIcon from "../../assets/icons/univ-its.png";
import jtvIcon from "../../assets/big-project/jtv_thumb.png";
import muhiIcon from "../../assets/big-project/muhi_thumb.png";
import tunnelIcon from "../../assets/big-project/tunnel_thumb.png";
import swkIcon from "../../assets/branding/thumb_swk.png";
import plazaIcon from "../../assets/branding/thumb_plaza.png";
import ragamIcon from "../../assets/branding/thumb_ragam.png";
import aafreedaIcon from "../../assets/branding/thumb_aafreeda.png";
import sosmedITSIcon from "../../assets/branding/thumb_sosmed.png";

const iconMap = {
  afterEffect: afterEffectIcon,
  blender: blenderIcon,
  camera: cameraIcon,
  canva: canvaIcon,
  capcut: capcutIcon,
  figma: figmaIcon,
  ilustrator: ilustratorIcon,
  photoshop: photoshopIcon,
  premier: premierIcon,
  star: starIcon,
  univIsi: univIsiIcon,
  univIts: univItsIcon,
  jtv: jtvIcon,
  muhi: muhiIcon,
  tunnel: tunnelIcon,
  swk: swkIcon,
  plaza: plazaIcon,
  ragam: ragamIcon,
  aafreeda: aafreedaIcon,
  sosmedITS: sosmedITSIcon,
} as const;

export type IconName = keyof typeof iconMap;

type IconProps = {
  children: IconName;
  alt?: string;
  className?: string;
  imgClassName?: string;
};

function Icon({ children, alt, className = "", imgClassName = "" }: IconProps) {
  const src = iconMap[children];

  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${className}`}>
      <img
        src={src}
        alt={alt ?? children}
        className={`block h-full w-full object-contain ${imgClassName}`}
      />
    </span>
  );
}

export default Icon;
