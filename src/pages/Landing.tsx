import { Link } from "react-router-dom";
import { AlertCircle, Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center animate-slide-up">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Zap className="h-20 w-20 text-primary animate-glow-pulse" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          LUMINA Connect
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Your source for real-time outage updates
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Link to="/report" className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Report an Outage
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg transition-all"
          >
            <Link to="/feed" className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              View Updates
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
            <AlertCircle className="h-8 w-8 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold mb-2 text-foreground">Quick Reporting</h3>
            <p className="text-sm text-muted-foreground">Report outages instantly with our simple form</p>
          </div>
          
          <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
            <Eye className="h-8 w-8 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold mb-2 text-foreground">Live Updates</h3>
            <p className="text-sm text-muted-foreground">Stay informed with real-time status updates</p>
          </div>
          
          <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
            <Zap className="h-8 w-8 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold mb-2 text-foreground">Fast Response</h3>
            <p className="text-sm text-muted-foreground">Our team responds quickly to all reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
