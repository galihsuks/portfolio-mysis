import { useEffect, useMemo, useRef } from "react";

type CarouselProps = {
  images: string[];
  imageClassName?: string;
  autoScroll?: "right" | "left";
  className?: string;
  classNameWrapperImg?: string;
};

const AUTO_SCROLL_SPEED = 84;

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Carousel({
  images,
  imageClassName,
  autoScroll,
  className,
  classNameWrapperImg,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loopedImages = useMemo(() => [...images, ...images, ...images], [images]);

  useEffect(() => {
    const carousel = containerRef.current;

    if (!carousel || images.length === 0) {
      return;
    }

    let normalizeFrame = 0;
    let restoreBehaviorFrame = 0;
    let autoScrollFrame = 0;
    let lastTimestamp = 0;

    const getSingleLoopWidth = () => carousel.scrollWidth / 3;

    const jumpWithoutSmooth = (nextScrollLeft: number) => {
      carousel.style.scrollBehavior = "auto";
      carousel.scrollLeft = nextScrollLeft;

      cancelAnimationFrame(restoreBehaviorFrame);
      restoreBehaviorFrame = requestAnimationFrame(() => {
        carousel.style.scrollBehavior = "";
      });
    };

    const normalizeInfiniteScroll = () => {
      const singleLoopWidth = getSingleLoopWidth();

      if (!singleLoopWidth) {
        return;
      }

      if (carousel.scrollLeft < singleLoopWidth * 0.5) {
        jumpWithoutSmooth(carousel.scrollLeft + singleLoopWidth);
      } else if (carousel.scrollLeft > singleLoopWidth * 1.5) {
        jumpWithoutSmooth(carousel.scrollLeft - singleLoopWidth);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(normalizeFrame);
      normalizeFrame = requestAnimationFrame(() => {
        normalizeInfiniteScroll();
      });
    };

    const handleWheel = (event: WheelEvent) => {
      if (autoScroll) {
        event.preventDefault();
        return;
      }

      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

      if (!delta) {
        return;
      }

      event.preventDefault();
      carousel.scrollLeft += delta;
    };

    const runAutoScroll = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const deltaSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      const direction = autoScroll === "right" ? 1 : -1;

      carousel.scrollLeft += direction * AUTO_SCROLL_SPEED * deltaSeconds;
      normalizeInfiniteScroll();
      autoScrollFrame = requestAnimationFrame(runAutoScroll);
    };

    carousel.scrollLeft = getSingleLoopWidth();

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    carousel.addEventListener("wheel", handleWheel, { passive: false });

    if (autoScroll) {
      autoScrollFrame = requestAnimationFrame(runAutoScroll);
    }

    return () => {
      cancelAnimationFrame(normalizeFrame);
      cancelAnimationFrame(restoreBehaviorFrame);
      cancelAnimationFrame(autoScrollFrame);
      carousel.removeEventListener("scroll", handleScroll);
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, [autoScroll, images]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={joinClasses(
        "h-full w-full",
        autoScroll
          ? "overflow-hidden touch-none select-none"
          : "overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div className={joinClasses("flex h-full w-max items-center", classNameWrapperImg)}>
        {loopedImages.map((imageSrc, index) => (
          <img
            key={`${imageSrc}-${index}`}
            src={imageSrc}
            alt={`Carousel image ${index + 1}`}
            draggable={false}
            className={joinClasses(
              "block h-full w-auto max-w-none shrink-0 select-none object-cover",
              imageClassName,
            )}
          />
        ))}
      </div>
    </div>
  );
}
