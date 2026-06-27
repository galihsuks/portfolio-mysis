import folderBack from "../../assets/elements/folder-back.svg";
import folderFront from "../../assets/elements/folder-front.svg";
import Icon, { type IconName } from "./Icon";

type FolderIconItem =
  | IconName
  | {
      name: IconName;
      alt?: string;
      className?: string;
      wrapperClassName?: string;
    };

type FolderProps = {
  icons: FolderIconItem[];
  label: string;
  className?: string;
  folderClassName?: string;
  labelClassName?: string;
  size?: "sm" | "md" | "lg";
};

const iconLayouts = [
  "left-[4%] top-[12%] z-[6] w-[18%] -rotate-[18deg]",
  "left-[16%] top-[3%] z-[7] w-[20%] -rotate-[8deg]",
  "left-[31%] top-[11%] z-[8] w-[20%] rotate-[7deg]",
  "left-[47%] top-[2%] z-[9] w-[20%] rotate-[10deg]",
  "left-[62%] top-[10%] z-[10] w-[19%] -rotate-[8deg]",
  "left-[73%] top-[15%] z-[11] w-[17%] rotate-[13deg]",
];

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
    label: "mt-2 text-[0.95rem]",
  },
  lg: {
    wrapper: "w-[13rem]",
    stage: "h-[9.75rem] w-[10.85rem]",
    back: "bottom-[1.15rem] w-[88%]",
    label: "mt-2.5 text-[1.05rem]",
  },
} as const;

function Folder({
  icons,
  label,
  className = "",
  folderClassName = "",
  labelClassName = "",
  size = "md",
}: FolderProps) {
  const sizeConfig = sizeClasses[size];

  return (
    <div className={`${sizeConfig.wrapper} relative ${className}`}>
      <div className={`relative mx-auto ${sizeConfig.stage} ${folderClassName}`}>
        <img
          src={folderBack}
          alt=""
          className={`pointer-events-none absolute inset-x-0 mx-auto opacity-90 ${sizeConfig.back}`}
        />

        {icons.map((icon, index) => {
          const iconItem =
            typeof icon === "string"
              ? { name: icon, alt: icon, className: "", wrapperClassName: "" }
              : {
                  name: icon.name,
                  alt: icon.alt ?? icon.name,
                  className: icon.className ?? "",
                  wrapperClassName: icon.wrapperClassName ?? "",
                };

          return (
            <Icon
              key={`${label}-${iconItem.name}-${index}`}
              alt={iconItem.alt}
              className={`absolute object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.34)] ${
                iconLayouts[index] ?? iconLayouts[iconLayouts.length - 1]
              } ${iconItem.wrapperClassName}`}
              imgClassName={iconItem.className}
            >
              {iconItem.name}
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
        className={`inter-font text-center font-semibold text-primary-400 ${sizeConfig.label} ${labelClassName}`}
      >
        {label}
      </p>
    </div>
  );
}

export default Folder;
