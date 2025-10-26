const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LUMINA Connect. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Your source for real-time outage updates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
