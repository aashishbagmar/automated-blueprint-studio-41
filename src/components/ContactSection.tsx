import { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    }, 1500);
  };

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setTimeout(() => setRipple(null), 600);
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="font-mono text-3xl md:text-4xl text-center mb-4">
          <span className="text-foreground">async</span>{" "}
          <span className="text-primary">def</span>{" "}
          <span className="text-foreground">connect</span>
          <span className="text-muted-foreground">():</span>
        </h2>
        <p className="text-center text-muted-foreground font-mono mb-16">
          # Let's build something together
        </p>

        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="code-block p-8 glow-border">
            <div className="project-header mb-6">
              <span className="terminal-dot bg-destructive"></span>
              <span className="terminal-dot bg-yellow-500"></span>
              <span className="terminal-dot bg-primary"></span>
              <span className="ml-4 font-mono text-sm text-muted-foreground">
                contact_form.py
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-mono text-sm text-muted-foreground mb-2">
                  <span className="text-accent">name</span>
                  <span className="text-muted-foreground"> = </span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:glow-border transition-all"
                  placeholder='"Your Name"'
                />
              </div>

              <div>
                <label className="block font-mono text-sm text-muted-foreground mb-2">
                  <span className="text-accent">email</span>
                  <span className="text-muted-foreground"> = </span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:glow-border transition-all"
                  placeholder='"your@email.com"'
                />
              </div>

              <div>
                <label className="block font-mono text-sm text-muted-foreground mb-2">
                  <span className="text-accent">message</span>
                  <span className="text-muted-foreground"> = </span>
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:glow-border transition-all resize-none"
                  placeholder='"""Your message here..."""'
                />
              </div>

              <button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                onClick={handleRipple}
                className="relative w-full bg-primary text-primary-foreground font-mono py-4 rounded-lg overflow-hidden hover:glow-border-intense transition-all duration-300 disabled:opacity-50"
              >
                {ripple && (
                  <span
                    className="absolute bg-background/30 rounded-full animate-ripple"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: 20,
                      height: 20,
                      marginLeft: -10,
                      marginTop: -10,
                    }}
                  />
                )}
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    sending...
                  </span>
                ) : (
                  "await send_message()"
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 flex justify-center gap-6">
            {[
              { icon: "github", href: "#", label: "GitHub" },
              { icon: "linkedin", href: "#", label: "LinkedIn" },
              { icon: "twitter", href: "#", label: "Twitter" },
            ].map((social) => (
              <a
                key={social.icon}
                href={social.href}
                className="w-12 h-12 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary hover:glow-border transition-all duration-300"
                aria-label={social.label}
              >
                <span className="font-mono text-xs">{`<${social.icon[0]}/>`}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
