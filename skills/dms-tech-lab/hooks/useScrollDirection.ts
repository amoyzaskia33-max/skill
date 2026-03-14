import { useState, useEffect } from "react";

/**
 * 스크롤 방향 감지 훅
 */
export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤 여부 확인
      setIsScrolled(currentScrollY > threshold);

      // 스크롤 방향 확인
      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scrollDirection, isScrolled };
}
