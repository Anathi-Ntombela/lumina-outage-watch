import { Link, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">LUMINA Connect</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/report"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/report") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Report
            </Link>
            <Link
              to="/feed"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/feed") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Updates
            </Link>
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/admin") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
