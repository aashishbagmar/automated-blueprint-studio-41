import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize EmailJS on component mount
  useEffect(() => {
    // Your EmailJS Public Key - Get from https://dashboard.emailjs.com/
    // Replace with your actual public key once you create EmailJS account
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "service_nw8kx79";
    
    if (publicKey && publicKey !== "service_nw8kx79") {
      emailjs.init(publicKey);
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (formData.message.length < 10) {
        toast({
          title: "Error",
          description: "Message must be at least 10 characters",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Get credentials from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if credentials are set
      if (!serviceId || !templateId || !publicKey) {
        toast({
          title: "Configuration Error",
          description: "Please set up EmailJS credentials. Check EMAILJS_QUICK_START.md for instructions.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: "bagmaraashish@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Message sent! ✅",
          description:
            "Thanks for reaching out. I'll get back to you soon.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description:
          "Failed to send message. Please try again or email me directly at bagmaraashish@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
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
              { icon: "github", href: "https://github.com/aashishbagmar/Projects", label: "GitHub" },
              { icon: "linkedin", href: "https://linkedin.com/in/aashishbagmar", label: "LinkedIn" },
              { icon: "email", href: "mailto:bagmaraashish@gmail.com", label: "Email" },
            ].map((social) => (
              <a
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary hover:glow-border transition-all duration-300"
                aria-label={social.label}
              >
                <span className="font-mono text-xs">{`<${social.icon[0]}/>`}</span>
              </a>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="font-mono text-sm text-muted-foreground mb-2">
              <span className="text-accent">email</span>
              <span className="text-muted-foreground"> = </span>
              <a href="mailto:bagmaraashish@gmail.com" className="text-primary hover:glow-text">
                "bagmaraashish@gmail.com"
              </a>
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-accent">phone</span>
              <span className="text-muted-foreground"> = </span>
              <a href="tel:+917588833694" className="text-primary hover:glow-text">
                "+91 7588833694"
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
