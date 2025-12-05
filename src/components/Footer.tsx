const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">#</span> Built with{" "}
          <span className="text-primary">Python</span> mindset &{" "}
          <span className="text-accent">automation</span> expertise
        </p>
        <p className="font-mono text-xs text-muted-foreground mt-2">
          © {new Date().getFullYear()} Aashish Bagmar. All rights reserved.
        </p>
        <p className="font-mono text-xs text-muted-foreground mt-1">
          <span className="text-muted-foreground"># Interests: </span>
          <span className="text-accent">Badminton</span>
          <span className="text-muted-foreground"> | </span>
          <span className="text-accent">Volleyball</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
