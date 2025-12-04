const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">#</span> Built with{" "}
          <span className="text-primary">Python</span> mindset &{" "}
          <span className="text-accent">clean code</span> principles
        </p>
        <p className="font-mono text-xs text-muted-foreground mt-2">
          © {new Date().getFullYear()} Alex Python. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
