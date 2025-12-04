import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-image", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-text", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="font-mono text-3xl md:text-4xl text-center mb-4">
          <span className="text-primary">class</span>{" "}
          <span className="text-foreground">Developer</span>
          <span className="text-muted-foreground">:</span>
        </h2>
        <p className="text-center text-muted-foreground font-mono mb-16">
          # The person behind the code
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="about-image">
            <div className="code-block p-4 glow-border">
              <div className="project-header mb-4">
                <span className="terminal-dot bg-destructive"></span>
                <span className="terminal-dot bg-yellow-500"></span>
                <span className="terminal-dot bg-primary"></span>
                <span className="ml-4 font-mono text-sm text-muted-foreground">
                  developer.py
                </span>
              </div>
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent opacity-50"></div>
                    <p className="font-mono text-muted-foreground">
                      {"<profile_image/>"}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 grid-bg opacity-20"></div>
              </div>
            </div>
          </div>

          <div className="about-text">
            <div className="code-block p-6">
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  <span className="text-primary">def</span>{" "}
                  <span className="text-foreground">__init__</span>
                  <span className="text-muted-foreground">(self):</span>
                  {"\n"}
                  {"    "}
                  <span className="text-muted-foreground">self.</span>
                  <span className="text-accent">passion</span>
                  <span className="text-muted-foreground"> = </span>
                  <span className="text-yellow-400">"Clean, efficient code"</span>
                  {"\n\n"}
                  {"    "}
                  <span className="text-muted-foreground">self.</span>
                  <span className="text-accent">experience</span>
                  <span className="text-muted-foreground"> = </span>
                  <span className="text-primary">5</span>
                  <span className="text-muted-foreground"> # years</span>
                  {"\n\n"}
                  {"    "}
                  <span className="text-muted-foreground">self.</span>
                  <span className="text-accent">focus</span>
                  <span className="text-muted-foreground"> = [</span>
                  {"\n"}
                  {"        "}
                  <span className="text-yellow-400">"Backend Development"</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  {"        "}
                  <span className="text-yellow-400">"Automation & DevOps"</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  {"        "}
                  <span className="text-yellow-400">"Data Engineering"</span>
                  {"\n"}
                  {"    "}
                  <span className="text-muted-foreground">]</span>
                </code>
              </pre>
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              I transform complex problems into elegant, automated solutions. With a
              deep love for Python and clean architecture, I build systems that are
              not just functional, but maintainable and scalable.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              From web APIs to data pipelines, my code follows best practices and
              always prioritizes readability. Because good code should tell a story.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
