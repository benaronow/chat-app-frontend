import { useState, useEffect } from "react";

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

function getBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints["xl"]) return "xl";
  if (width >= breakpoints["lg"]) return "lg";
  if (width >= breakpoints["md"]) return "md";
  if (width >= breakpoints["sm"]) return "sm";
  return "base";
}

export function useBreakpoint(): {
  breakpoint: Breakpoint;
  baseCompHeight: string;
} {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    getBreakpoint(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseCompHeight = "100dvh - 2rem - 100px";

  return { breakpoint, baseCompHeight };
}
