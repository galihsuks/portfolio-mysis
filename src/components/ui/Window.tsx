import type { ReactNode } from "react";
import { X } from "lucide-react";

type WindowSize = "sm" | "md" | "lg" | "xl";

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
  showCloseButton?: boolean;
  onClose?: () => void;
  closeLabel?: string;
};

const sizeClasses: Record<WindowSize, string> = {
  sm: "max-w-sm",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
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
  showCloseButton = true,
  onClose,
  closeLabel = "Close window",
}: WindowProps) {
  const CloseElement = onClose ? "button" : "span";

  return (
    <section className={`relative w-full ${sizeClasses[size]} ${className}`}>
      <div
        className={`relative overflow-hidden rounded-[1.9rem] bg-secondary-950/55 text-primary-400 shadow-[0_0_0_1px_rgba(64,255,30,0.08),0_0_26px_rgba(64,255,30,0.18),0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-[14px] ${panelClassName}`}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border-[1.6px] border-primary-500/88" />
        <div className="pointer-events-none absolute inset-[3px] rounded-[calc(1.9rem-3px)] border border-primary-400/18" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_28%,rgba(255,255,255,0.01)_100%)]" />
        <div className="pointer-events-none absolute inset-x-[1.2rem] top-0 h-[1.5px] rounded-full bg-primary-300/45 blur-[0.4px]" />
        <div className="pointer-events-none absolute inset-y-[1.25rem] left-0 w-[1.5px] rounded-full bg-primary-400/25 blur-[0.4px]" />
        <div className="pointer-events-none absolute inset-y-[1.25rem] right-0 w-[1.5px] rounded-full bg-primary-400/45 blur-[0.2px]" />
        <div className="pointer-events-none absolute inset-x-[1.2rem] bottom-0 h-[2px] rounded-full bg-primary-500/95" />

        {(title || showCloseButton) && (
          <div
            className={`relative z-10 flex items-start justify-between gap-4 px-6 pt-5 ${headerClassName}`}
          >
            <div className="min-w-0 flex-1">
              {title ? (
                <div
                  className={`jersey-font text-[clamp(1.1rem,1.7vw,2rem)] leading-none text-primary-400 ${titleClassName}`}
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
                className={`relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-primary-400 transition-transform duration-300 ${onClose ? "cursor-pointer hover:scale-105" : ""} ${closeButtonClassName}`}
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
