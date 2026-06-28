import type { ReactNode } from "react";
import { X } from "lucide-react";

type WindowSize = "sm" | "md" | "lg" | "xl" | "custom";
type WindowVariant = "dark" | "light";

type WindowProps = {
  children: ReactNode;
  title?: ReactNode;
  className?: string;
  panelClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  titleClassName?: string;
  closeButtonClassName?: string;
  size?: WindowSize;
  variant?: WindowVariant;
  showCloseButton?: boolean;
  onClose?: () => void;
  closeLabel?: string;
};

const sizeClasses: Record<WindowSize, string> = {
  sm: "max-w-sm",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
  custom: "",
};

const variantClasses: Record<
  WindowVariant,
  {
    panel: string;
    outerBorder: string;
    innerBorder: string;
    overlay: string;
    topGlow: string;
    leftGlow: string;
    rightGlow: string;
    bottomGlow: string;
    title: string;
    close: string;
  }
> = {
  dark: {
    panel:
      "bg-secondary-950/55 text-primary-400 shadow-[0_0_0_1px_rgba(64,255,30,0.08),0_0_26px_rgba(64,255,30,0.18),0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-[14px]",
    outerBorder: "border-primary-500/88",
    innerBorder: "border-primary-400/18",
    overlay:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_28%,rgba(255,255,255,0.01)_100%)]",
    topGlow: "bg-primary-300/45",
    leftGlow: "bg-primary-400/25",
    rightGlow: "bg-primary-400/45",
    bottomGlow: "bg-primary-500/95",
    title: "text-primary-400",
    close: "text-primary-400",
  },
  light: {
    panel:
      "bg-[linear-gradient(135deg,rgba(239,255,237,0.92)_0%,rgba(205,255,190,0.86)_36%,rgba(155,255,121,0.78)_100%)] text-primary-700 shadow-[0_0_0_1px_rgba(255,255,255,0.30),0_14px_34px_rgba(44,122,18,0.18),0_28px_70px_rgba(64,255,30,0.30),0_38px_110px_rgba(31,122,18,0.18)] backdrop-blur-[8px]",
    outerBorder: "border-white/80",
    innerBorder: "border-white/22",
    overlay:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_38%,rgba(255,255,255,0.02)_100%)]",
    topGlow: "bg-white/85",
    leftGlow: "bg-white/40",
    rightGlow: "bg-white/52",
    bottomGlow: "bg-primary-200/90",
    title: "text-primary-600",
    close: "text-primary-500",
  },
};

function Window({
  children,
  title,
  className = "",
  panelClassName = "",
  headerClassName = "",
  bodyClassName = "",
  titleClassName = "",
  closeButtonClassName = "",
  size = "md",
  variant = "dark",
  showCloseButton = true,
  onClose,
  closeLabel = "Close window",
}: WindowProps) {
  const CloseElement = onClose ? "button" : "span";
  const variantConfig = variantClasses[variant];

  return (
    <section className={`relative w-full ${sizeClasses[size]} ${className}`}>
      <div
        className={`relative overflow-hidden rounded-[1.9rem] ${variantConfig.panel} ${panelClassName}`}
      >
        <div
          className={`pointer-events-none absolute inset-0 rounded-[inherit] border-[1.6px] ${variantConfig.outerBorder}`}
        />
        <div
          className={`pointer-events-none absolute inset-[3px] rounded-[calc(1.9rem-3px)] border ${variantConfig.innerBorder}`}
        />
        <div className={`pointer-events-none absolute inset-0 ${variantConfig.overlay}`} />
        <div
          className={`pointer-events-none absolute inset-x-[1.2rem] top-0 h-[1.5px] rounded-full blur-[0.4px] ${variantConfig.topGlow}`}
        />
        <div
          className={`pointer-events-none absolute inset-y-[1.25rem] left-0 w-[1.5px] rounded-full blur-[0.4px] ${variantConfig.leftGlow}`}
        />
        <div
          className={`pointer-events-none absolute inset-y-[1.25rem] right-0 w-[1.5px] rounded-full blur-[0.2px] ${variantConfig.rightGlow}`}
        />
        <div
          className={`pointer-events-none absolute inset-x-[1.2rem] bottom-0 h-[2px] rounded-full ${variantConfig.bottomGlow}`}
        />

        {(title || showCloseButton) && (
          <div
            className={`relative z-10 flex items-start justify-between gap-4 px-6 pt-5 ${headerClassName}`}
          >
            <div className="min-w-0 flex-1">
              {title ? (
                <div
                  className={`jersey-font text-[clamp(1.1rem,1.7vw,2rem)] leading-none ${variantConfig.title} ${titleClassName}`}
                >
                  {title}
                </div>
              ) : null}
            </div>

            {showCloseButton ? (
              <CloseElement
                {...(onClose
                  ? {
                      type: "button" as const,
                      onClick: onClose,
                      "aria-label": closeLabel,
                    }
                  : { "aria-hidden": true })}
                className={`relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${variantConfig.close} ${onClose ? "cursor-pointer hover:scale-105" : ""} ${closeButtonClassName}`}
              >
                <X strokeWidth={3} className="h-10 w-10" />
              </CloseElement>
            ) : null}
          </div>
        )}

        <div
          className={`relative z-10 px-6 pb-6 ${title || showCloseButton ? "pt-3" : "pt-6"} ${bodyClassName}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export default Window;
