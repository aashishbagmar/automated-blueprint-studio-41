import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "Automating workflows, scraping data, building solutions.";

  useEffect(() => {
    // Typewriter effect
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-line", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 }
      );

      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="container mx-auto px-6 text-center">
        <div className="code-block inline-block px-8 py-6 mb-8">
          <p className="hero-line font-mono text-muted-foreground text-sm mb-2">
            <span className="text-primary">#!/usr/bin/env python3</span>
          </p>
          <p className="hero-line font-mono text-muted-foreground text-sm">
            <span className="text-accent"># Automation & Web Scraping Specialist</span>
          </p>
        </div>

        <h1
          ref={titleRef}
          className="hero-line font-mono text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight"
        >
          <span className="text-primary">def</span>{" "}
          <span className="text-foreground">automate_everything</span>
          <span className="text-muted-foreground">(</span>
          <span className="text-accent">data</span>
          <span className="text-muted-foreground">):</span>
        </h1>

        <h2 className="hero-line text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gradient">
          Aashish Bagmar
        </h2>

        <p className="hero-line text-xl md:text-2xl text-muted-foreground mb-8">
          Python Developer & Automation Engineer
        </p>

        <div className="hero-line code-block inline-block px-6 py-4 glow-border">
          <p className="font-mono text-sm md:text-base">
            <span className="text-muted-foreground">{">>> "}</span>
            <span className="text-foreground">{typedText}</span>
            <span className="cursor-blink text-primary">|</span>
          </p>
        </div>

        <div className="hero-line mt-12 flex gap-6 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground font-mono rounded-lg hover:glow-border-intense transition-all duration-300"
          >
            view_projects()
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-primary text-primary font-mono rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            contact_me()
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
