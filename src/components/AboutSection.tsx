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
                  <span className="text-yellow-400">"Automation & Data Workflows"</span>
                  {"\n\n"}
                  {"    "}
                  <span className="text-muted-foreground">self.</span>
                  <span className="text-accent">education</span>
                  <span className="text-muted-foreground"> = </span>
                  <span className="text-yellow-400">"BE - AI & Data Science"</span>
                  {"\n"}
                  {"    "}
                  <span className="text-muted-foreground">self.</span>
                  <span className="text-accent">university</span>
                  <span className="text-muted-foreground"> = </span>
                  <span className="text-yellow-400">"SPPU, Pune"</span>
                  {"\n"}
                  {"    "}
                  <span className="text-muted-foreground">self.</span>
                  <span className="text-accent">sgpa</span>
                  <span className="text-muted-foreground"> = </span>
                  <span className="text-primary">8.71</span>
                  {"\n\n"}
                  {"    "}
                  <span className="text-muted-foreground">self.</span>
                  <span className="text-accent">expertise</span>
                  <span className="text-muted-foreground"> = [</span>
                  {"\n"}
                  {"        "}
                  <span className="text-yellow-400">"Web Scraping & Automation"</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  {"        "}
                  <span className="text-yellow-400">"REST API Integration"</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  {"        "}
                  <span className="text-yellow-400">"GUI Development"</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  {"        "}
                  <span className="text-yellow-400">"AI/ML with Pandas & Scikit-learn"</span>
                  {"\n"}
                  {"    "}
                  <span className="text-muted-foreground">]</span>
                </code>
              </pre>
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              Python developer experienced in automating data workflows through web scraping 
              (BeautifulSoup/Selenium) and REST API integrations. I've developed practical 
              tools including an Amazon Price Tracker and Password Manager, demonstrating 
              strong problem-solving skills.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Currently in my third year pursuing Bachelor of Engineering in Artificial 
              Intelligence and Data Science at Savitribai Phule Pune University (SGPA: 8.71). 
              Expanding into AI/ML with Pandas and Scikit-learn, eager to contribute my 
              automation expertise to machine learning projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
