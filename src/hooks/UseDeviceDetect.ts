import { useState, useEffect } from "react";

export function useDeviceDetect() {
  const [device, setDevice] = useState({
    isMobile: false,
    isLandscape: false,
  });

  useEffect(() => {
    const checkDevice = () => {
      // 1. Cek apakah perangkat mendukung touch screen (Ciri khas Mobile/Tablet)
      const hasTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

      // 2. Cek apakah layar sedang dalam posisi landscape
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;

      // 3. Batasi max-width untuk landscape mobile (biasanya di bawah 932px, misal iPhone Pro Max landscape)
      const isMobileWidth = window.matchMedia("(max-width: 950px)").matches;

      // HP Landscape: Punya touch screen DAN layar landscape DAN lebar tidak melebihi monitor desktop
      const isMobileLandscape = hasTouch && isLandscape && isMobileWidth;

      // HP Portrait: Punya touch screen DAN lebar portrait (di bawah 768px)
      const isMobilePortrait =
        hasTouch && !isLandscape && window.matchMedia("(max-width: 768px)").matches;

      setDevice({
        isMobile: isMobilePortrait || isMobileLandscape,
        isLandscape: isLandscape,
      });
    };

    // Jalankan pengecekan awal
    checkDevice();

    // Dengarkan perubahan ukuran dan orientasi layar
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, []);

  return device;
}
