import type { ReactNode } from "react";

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
        className={`relative overflow-hidden rounded-[1.4rem] border border-primary-500/90 bg-secondary-950/55 text-primary-400 shadow-[0_0_0_1px_rgba(132,204,22,0.16),0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-[14px] ${panelClassName}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_28%,rgba(255,255,255,0.01)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary-300/40" />

        {(title || showCloseButton) && (
          <div
            className={`relative z-10 flex items-start justify-between gap-4 px-6 pt-5 ${headerClassName}`}
          >
            <div className="min-w-0 flex-1">
              {title ? (
                <div
                  className={`inter-font text-[clamp(1.1rem,1.45vw,1.7rem)] font-semibold leading-none text-primary-400 ${titleClassName}`}
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
                <span className="block text-[2.25rem] leading-none">x</span>
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
