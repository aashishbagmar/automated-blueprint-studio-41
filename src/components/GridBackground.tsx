import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GridBackground = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.to(gridRef.current, {
      backgroundPosition: "100px 100px",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div
      ref={gridRef}
      className="fixed inset-0 grid-bg opacity-30 pointer-events-none -z-20"
      style={{ backgroundPosition: "0px 0px" }}
    />
  );
};

export default GridBackground;
