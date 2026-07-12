import { useState } from "react";
import folderBack from "../../assets/elements/folder-back.svg";
import folderFront from "../../assets/elements/folder-front.svg";
import Icon, { type IconName } from "./Icon";

type FolderProps = {
  icons: IconName[];
  label: string;
  onClick?: () => void;
  className?: string;
  folderClassName?: string;
  labelClassName?: string;
  size?: "sm" | "md" | "lg";
};

type IconMotionClasses = {
  base: string;
  hover: string;
};

const iconLayoutByCount: Record<number, IconMotionClasses[]> = {
  1: [
    {
      base: "left-[-8%] bottom-[8%] z-[8] w-[120%] rotate-0",
      hover: "left-[-15%] bottom-[12%] z-[8] w-[140%] rotate-0",
    },
  ],
  2: [
    {
      base: "left-[10%] bottom-[12%] z-[7] w-[60%] -rotate-[6deg]",
      hover: "left-[0%] bottom-[25%] z-[7] w-[60%] -rotate-[10deg]",
    },
    {
      base: "right-[10%] bottom-[12%] z-[8] w-[60%] rotate-[6deg]",
      hover: "right-[0%] bottom-[20%] z-[8] w-[60%] rotate-[10deg]",
    },
  ],
  3: [
    {
      base: "left-[10%] bottom-[12%] z-[8] w-[60%] -rotate-[8deg]",
      hover: "left-[-5%] bottom-[20%] z-[8] w-[60%] -rotate-[14deg]",
    },
    {
      base: "left-[30%] bottom-[40%] z-[7] w-[54%] rotate-0",
      hover: "left-[30%] bottom-[60%] z-[7] w-[60%] rotate-0",
    },
    {
      base: "right-[0%] bottom-[8%] z-[9] w-[60%] rotate-[8deg]",
      hover: "right-[-10%] bottom-[15%] z-[9] w-[60%] rotate-[14deg]",
    },
  ],
  4: [
    {
      base: "left-[16%] top-[16%] z-[7] w-[23%] -rotate-[9deg]",
      hover: "left-[5%] top-[16%] z-[7] w-[26%] -rotate-[16deg]",
    },
    {
      base: "left-[31%] top-[8%] z-[8] w-[25%] -rotate-[3deg]",
      hover: "left-[25%] top-[4%] z-[8] w-[28%] -rotate-[5deg]",
    },
    {
      base: "left-[48%] top-[8%] z-[9] w-[25%] rotate-[3deg]",
      hover: "left-[50%] top-[5%] z-[9] w-[28%] rotate-[7deg]",
    },
    {
      base: "left-[63%] top-[16%] z-[10] w-[23%] rotate-[9deg]",
      hover: "left-[70%] top-[16%] z-[10] w-[25%] rotate-[15deg]",
    },
  ],
  5: [
    {
      base: "left-[14%] top-[17%] z-[7] w-[21%] -rotate-[10deg]",
      hover: "left-[4%] top-[17%] z-[7] w-[23%] -rotate-[18deg]",
    },
    {
      base: "left-[26%] top-[9%] z-[8] w-[22%] -rotate-[5deg]",
      hover: "left-[18%] top-[6%] z-[8] w-[24%] -rotate-[8deg]",
    },
    {
      base: "left-[40%] top-[12%] z-[9] w-[23%] rotate-0",
      hover: "left-[37%] top-[11%] z-[9] w-[24%] rotate-[2deg]",
    },
    {
      base: "left-[53%] top-[9%] z-[10] w-[22%] rotate-[5deg]",
      hover: "left-[56%] top-[6%] z-[10] w-[24%] rotate-[9deg]",
    },
    {
      base: "left-[66%] top-[16%] z-[11] w-[21%] rotate-[10deg]",
      hover: "left-[74%] top-[15%] z-[11] w-[22%] rotate-[17deg]",
    },
  ],
  6: [
    {
      base: "left-[12%] top-[16%] z-[7] w-[19%] -rotate-[10deg]",
      hover: "left-[3%] top-[16%] z-[7] w-[21%] -rotate-[18deg]",
    },
    {
      base: "left-[22%] top-[8%] z-[8] w-[19%] -rotate-[6deg]",
      hover: "left-[16%] top-[4%] z-[8] w-[21%] -rotate-[10deg]",
    },
    {
      base: "left-[34%] top-[12%] z-[9] w-[20%] -rotate-[2deg]",
      hover: "left-[31%] top-[11%] z-[9] w-[22%] -rotate-[1deg]",
    },
    {
      base: "left-[46%] top-[7%] z-[10] w-[20%] rotate-[2deg]",
      hover: "left-[47%] top-[2%] z-[10] w-[22%] rotate-[7deg]",
    },
    {
      base: "left-[57%] top-[11%] z-[11] w-[19%] rotate-[6deg]",
      hover: "left-[63%] top-[10%] z-[11] w-[21%] rotate-[12deg]",
    },
    {
      base: "left-[68%] top-[16%] z-[12] w-[18%] rotate-[10deg]",
      hover: "left-[77%] top-[17%] z-[12] w-[19%] rotate-[18deg]",
    },
  ],
  7: [
    {
      base: "left-[10%] top-[17%] z-[7] w-[18%] -rotate-[10deg]",
      hover: "left-[2%] top-[17%] z-[7] w-[19%] -rotate-[18deg]",
    },
    {
      base: "left-[18%] top-[9%] z-[8] w-[18%] -rotate-[7deg]",
      hover: "left-[11%] top-[6%] z-[8] w-[20%] -rotate-[11deg]",
    },
    {
      base: "left-[28%] top-[14%] z-[9] w-[19%] -rotate-[4deg]",
      hover: "left-[24%] top-[14%] z-[9] w-[21%] -rotate-[4deg]",
    },
    {
      base: "left-[39%] top-[8%] z-[10] w-[19%] rotate-0",
      hover: "left-[39%] top-[6%] z-[10] w-[21%] rotate-[1deg]",
    },
    {
      base: "left-[50%] top-[12%] z-[11] w-[19%] rotate-[4deg]",
      hover: "left-[54%] top-[12%] z-[11] w-[21%] rotate-[6deg]",
    },
    {
      base: "left-[60%] top-[8%] z-[12] w-[18%] rotate-[7deg]",
      hover: "left-[68%] top-[5%] z-[12] w-[20%] rotate-[11deg]",
    },
    {
      base: "left-[69%] top-[17%] z-[13] w-[17%] rotate-[10deg]",
      hover: "left-[80%] top-[17%] z-[13] w-[18%] rotate-[17deg]",
    },
  ],
  8: [
    {
      base: "left-[8%] top-[18%] z-[7] w-[17%] -rotate-[11deg]",
      hover: "left-[1%] top-[18%] z-[7] w-[18%] -rotate-[20deg]",
    },
    {
      base: "left-[15%] top-[10%] z-[8] w-[17%] -rotate-[9deg]",
      hover: "left-[9%] top-[7%] z-[8] w-[18%] -rotate-[13deg]",
    },
    {
      base: "left-[25%] top-[15%] z-[9] w-[18%] -rotate-[6deg]",
      hover: "left-[21%] top-[15%] z-[9] w-[19%] -rotate-[7deg]",
    },
    {
      base: "left-[36%] top-[9%] z-[10] w-[18%] -rotate-[2deg]",
      hover: "left-[34%] top-[6%] z-[10] w-[19%] -rotate-[1deg]",
    },
    {
      base: "left-[47%] top-[13%] z-[11] w-[18%] rotate-[2deg]",
      hover: "left-[47%] top-[13%] z-[11] w-[19%] rotate-[3deg]",
    },
    {
      base: "left-[57%] top-[8%] z-[12] w-[18%] rotate-[6deg]",
      hover: "left-[60%] top-[5%] z-[12] w-[19%] rotate-[8deg]",
    },
    {
      base: "left-[67%] top-[12%] z-[13] w-[17%] rotate-[9deg]",
      hover: "left-[72%] top-[11%] z-[13] w-[18%] rotate-[13deg]",
    },
    {
      base: "left-[75%] top-[18%] z-[14] w-[15%] rotate-[11deg]",
      hover: "left-[82%] top-[19%] z-[14] w-[16%] rotate-[18deg]",
    },
  ],
  9: [
    {
      base: "left-[25%] bottom-[60%] z-[7] w-[35%] -rotate-[7deg]",
      hover: "left-[20%] bottom-[75%] z-[7] w-[35%] -rotate-[9deg]",
    },
    {
      base: "right-[25%] bottom-[60%] z-[8] w-[35%] rotate-[7deg]",
      hover: "right-[20%] bottom-[70%] z-[8] w-[35%] rotate-[9deg]",
    },
    {
      base: "left-[14%] bottom-[40%] z-[9] w-[35%] -rotate-[20deg]",
      hover: "left-[4%] bottom-[50%] z-[9] w-[35%] -rotate-[22deg]",
    },
    {
      base: "left-[33%] bottom-[40%] z-[11] w-[35%] rotate-0",
      hover: "left-[33%] bottom-[55%] z-[11] w-[35%] rotate-0",
    },
    {
      base: "right-[14%] bottom-[40%] z-[10] w-[35%] rotate-[20deg]",
      hover: "right-[4%] bottom-[50%] z-[10] w-[35%] rotate-[22deg]",
    },
    {
      base: "left-[0%] bottom-[8%] z-[12] w-[35%] -rotate-[30deg]",
      hover: "left-[-10%] bottom-[18%] z-[12] w-[35%] -rotate-[35deg]",
    },
    {
      base: "left-[20%] bottom-[12%] z-[13] w-[35%] -rotate-[10deg]",
      hover: "left-[15%] bottom-[22%] z-[13] w-[35%] -rotate-[10deg]",
    },
    {
      base: "right-[25%] bottom-[12%] z-[14] w-[35%] rotate-[10deg]",
      hover: "right-[20%] bottom-[22%] z-[14] w-[35%] rotate-[14deg]",
    },
    {
      base: "right-[0%] bottom-[8%] z-[15] w-[35%] rotate-[12deg]",
      hover: "right-[-10%] bottom-[18%] z-[15] w-[35%] rotate-[18deg]",
    },
  ],
  10: [
    {
      base: "left-[6%] top-[18%] z-[7] w-[15%] -rotate-[12deg]",
      hover: "left-[0%] top-[18%] z-[7] w-[16%] -rotate-[20deg]",
    },
    {
      base: "left-[11%] top-[10%] z-[8] w-[15%] -rotate-[10deg]",
      hover: "left-[6%] top-[8%] z-[8] w-[16%] -rotate-[15deg]",
    },
    {
      base: "left-[20%] top-[16%] z-[9] w-[16%] -rotate-[7deg]",
      hover: "left-[16%] top-[16%] z-[9] w-[17%] -rotate-[10deg]",
    },
    {
      base: "left-[30%] top-[9%] z-[10] w-[16%] -rotate-[4deg]",
      hover: "left-[27%] top-[7%] z-[10] w-[17%] -rotate-[5deg]",
    },
    {
      base: "left-[40%] top-[14%] z-[11] w-[16%] -rotate-[1deg]",
      hover: "left-[38%] top-[14%] z-[11] w-[17%] -rotate-[1deg]",
    },
    {
      base: "left-[49%] top-[7%] z-[12] w-[16%] rotate-[2deg]",
      hover: "left-[49%] top-[5%] z-[12] w-[17%] rotate-[3deg]",
    },
    {
      base: "left-[58%] top-[12%] z-[13] w-[16%] rotate-[5deg]",
      hover: "left-[60%] top-[12%] z-[13] w-[17%] rotate-[7deg]",
    },
    {
      base: "left-[67%] top-[8%] z-[14] w-[16%] rotate-[8deg]",
      hover: "left-[71%] top-[4%] z-[14] w-[17%] rotate-[11deg]",
    },
    {
      base: "left-[75%] top-[13%] z-[15] w-[14%] rotate-[10deg]",
      hover: "left-[81%] top-[12%] z-[15] w-[15%] rotate-[15deg]",
    },
    {
      base: "left-[81%] top-[19%] z-[16] w-[11%] rotate-[12deg]",
      hover: "left-[87%] top-[20%] z-[16] w-[12%] rotate-[19deg]",
    },
  ],
};

const sizeClasses = {
  sm: {
    wrapper: "w-[9.75rem]",
    stage: "h-[7.5rem] w-[8.2rem]",
    back: "bottom-[0.95rem] w-[86%]",
    label: "mt-2 text-[0.88rem]",
  },
  md: {
    wrapper: "w-[11.5rem]",
    stage: "h-[8.75rem] w-[9.6rem]",
    back: "bottom-[1.05rem] w-[87%]",
    label: "mt-2 text-[1rem]",
  },
  lg: {
    wrapper: "w-[13rem]",
    stage: "h-[9.75rem] w-[10.85rem]",
    back: "bottom-[1.15rem] w-[88%]",
    label: "mt-2.5 text-[1.5rem]",
  },
} as const;

function Folder({
  icons,
  label,
  onClick,
  className = "",
  folderClassName = "",
  labelClassName = "",
  size = "md",
}: FolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const sizeConfig = sizeClasses[size];
  const visibleIcons = icons.slice(0, 10);
  const iconLayouts = iconLayoutByCount[visibleIcons.length] ?? iconLayoutByCount[10];

  return (
    <div
      className={`${sizeConfig.wrapper} relative ${onClick ? "cursor-pointer" : ""} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className={`relative mx-auto ${sizeConfig.stage} ${folderClassName}`}>
        <img
          src={folderBack}
          alt=""
          className={`pointer-events-none absolute inset-x-0 mx-auto opacity-90 ${sizeConfig.back}`}
        />

        {visibleIcons.map((icon, index) => {
          const motion = iconLayouts[index] ?? iconLayouts[iconLayouts.length - 1];

          return (
            <Icon
              key={`${label}-${icon}-${index}`}
              alt={icon}
              className={`absolute object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.34)] transition-all duration-500 ease-out ${
                isHovered ? motion.hover : motion.base
              }`}
              imgClassName={`transition-all duration-500 ease-out ${
                isHovered
                  ? "saturate-100 grayscale-0 brightness-100"
                  : "saturate-0 grayscale brightness-[0.95]"
              }`}
            >
              {icon}
            </Icon>
          );
        })}

        <img
          src={folderFront}
          alt=""
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto w-full"
        />
      </div>

      <p
        className={`jersey-font text-center text-primary-400 ${sizeConfig.label} ${labelClassName}`}
      >
        {label}
      </p>
    </div>
  );
}

export default Folder;
