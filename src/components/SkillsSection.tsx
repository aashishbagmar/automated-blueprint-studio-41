import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Python", category: "language" },
  { name: "Selenium WebDriver", category: "automation" },
  { name: "BeautifulSoup", category: "scraping" },
  { name: "Requests", category: "api" },
  { name: "REST APIs", category: "api" },
  { name: "Tkinter", category: "gui" },
  { name: "Pandas", category: "data" },
  { name: "Scikit-learn", category: "ml" },
  { name: "HTML", category: "web" },
  { name: "CSS", category: "web" },
  { name: "smtplib", category: "automation" },
  { name: "python-dotenv", category: "tool" },
  { name: "JSON", category: "data" },
  { name: "pyperclip", category: "tool" },
  { name: "datetime", category: "tool" },
  { name: "Web Scraping", category: "concept" },
  { name: "Automation", category: "concept" },
  { name: "API Integration", category: "concept" },
  { name: "Data Workflows", category: "concept" },
  { name: "Git", category: "tool" },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".skill-item", {
        opacity: 0,
        y: 30,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.7)",
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
    <section id="skills" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="font-mono text-3xl md:text-4xl text-center mb-4">
          <span className="text-primary">import</span>{" "}
          <span className="text-foreground">skills</span>
        </h2>
        <p className="text-center text-muted-foreground font-mono mb-16">
          # The technologies I work with
        </p>

        <div className="code-block p-8 glow-border max-w-4xl mx-auto">
          <div className="project-header mb-6">
            <span className="terminal-dot bg-destructive"></span>
            <span className="terminal-dot bg-yellow-500"></span>
            <span className="terminal-dot bg-primary"></span>
            <span className="ml-4 font-mono text-sm text-muted-foreground">
              requirements.txt
            </span>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <span key={skill.name} className="skill-item skill-tag">
                {skill.name}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="font-mono text-sm text-muted-foreground text-center">
              <span className="text-primary">$</span> pip install -r
              requirements.txt
              <span className="cursor-blink text-primary ml-1">|</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
