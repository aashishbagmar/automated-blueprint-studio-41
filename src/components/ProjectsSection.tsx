import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "amazon_price_tracker",
    description: "Automated price monitoring system that scrapes Amazon product prices and sends email alerts when prices drop. Built with BeautifulSoup and custom headers to avoid blocking.",
    tech: ["Python", "BeautifulSoup", "Requests", "smtplib", "python-dotenv"],
    link: "https://github.com/aashishbagmar/Projects",
  },
  {
    name: "password_manager",
    description: "Secure GUI application for encrypted credential storage with password generation and one-click copying. User-friendly interface built with Tkinter.",
    tech: ["Python", "Tkinter", "JSON", "pyperclip", "random"],
    link: "https://github.com/aashishbagmar/Projects",
  },
  {
    name: "habit_tracker",
    description: "API-based habit logging system using Pixela API with date-wise tracking and visual progress charts. Helps maintain consistency with daily habit tracking.",
    tech: ["Python", "Requests", "datetime", "Pixela API"],
    link: "https://github.com/aashishbagmar/Projects",
  },
  {
    name: "form_filler_bot",
    description: "Intelligent web automation bot that auto-fills forms using Selenium, handling dynamic elements, dropdowns, and secure credential management.",
    tech: ["Python", "Selenium WebDriver", "dotenv"],
    link: "https://github.com/aashishbagmar/Projects",
  },
  {
    name: "cookie_clicker_bot",
    description: "Automated gaming bot that interacts with dynamic webpage elements, implementing timed clicks and progress tracking for Cookie Clicker game.",
    tech: ["Python", "Selenium", "WebDriver"],
    link: "https://github.com/aashishbagmar/Projects",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".project-item", 
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="font-mono text-3xl md:text-4xl text-center mb-4">
          <span className="text-foreground">projects</span>
          <span className="text-muted-foreground"> = [</span>
        </h2>
        <p className="text-center text-muted-foreground font-mono mb-16">
          # Featured work from my portfolio
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item project-card block group opacity-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-header">
                <span className="terminal-dot bg-destructive"></span>
                <span className="terminal-dot bg-yellow-500"></span>
                <span className="terminal-dot bg-primary"></span>
                <span className="ml-4 font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {project.name}.py
                </span>
              </div>

              <div className="p-6">
                <pre className="font-mono text-xs mb-4 text-muted-foreground overflow-hidden">
                  <code>
                    <span className="text-muted-foreground">"""</span>
                    {"\n"}
                    <span className="text-foreground">{project.description}</span>
                    {"\n"}
                    <span className="text-muted-foreground">"""</span>
                  </code>
                </pre>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono bg-secondary rounded text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-primary font-mono text-sm group-hover:glow-text transition-all">
                  <span>run()</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="text-center text-muted-foreground font-mono mt-16">
          <span className="text-muted-foreground">]</span>
        </p>
      </div>
    </section>
  );
};

export default ProjectsSection;
