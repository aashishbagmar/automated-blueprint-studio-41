import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "auto_deploy",
    description: "A CI/CD pipeline automation tool that reduces deployment time by 70%. Built with Python, Docker, and GitHub Actions.",
    tech: ["Python", "Docker", "GitHub Actions", "AWS"],
    link: "#",
  },
  {
    name: "data_pipeline",
    description: "Real-time data processing pipeline handling 1M+ events/day. ETL workflows with monitoring and alerting.",
    tech: ["Python", "Apache Kafka", "PostgreSQL", "Redis"],
    link: "#",
  },
  {
    name: "api_gateway",
    description: "High-performance REST API built with FastAPI. Handles 10k+ requests/second with async processing.",
    tech: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
    link: "#",
  },
  {
    name: "task_scheduler",
    description: "Distributed task scheduling system with retry logic, dead letter queues, and comprehensive logging.",
    tech: ["Python", "Celery", "RabbitMQ", "Flower"],
    link: "#",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".project-item", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
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
    <section id="projects" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="font-mono text-3xl md:text-4xl text-center mb-4">
          <span className="text-foreground">projects</span>
          <span className="text-muted-foreground"> = [</span>
        </h2>
        <p className="text-center text-muted-foreground font-mono mb-16">
          # Featured work from my portfolio
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.link}
              className="project-item project-card block group"
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
