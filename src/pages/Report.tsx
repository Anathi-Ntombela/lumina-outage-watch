import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, MapPin, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Report = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    contact: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.location || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in location and description fields.",
        variant: "destructive",
      });
      return;
    }

    // Demo alert
    toast({
      title: "Report Submitted! (Demo)",
      description: "Your outage report has been received. Our team will investigate shortly.",
    });

    // Reset form
    setFormData({ location: "", description: "", contact: "" });
    
    // Navigate to feed after 2 seconds
    setTimeout(() => {
      navigate("/feed");
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="max-w-2xl mx-auto animate-slide-up">
        <div className="text-center mb-8">
          <AlertCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-foreground">Report an Outage</h1>
          <p className="text-muted-foreground">Help us serve you better by reporting power issues</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Location *
            </Label>
            <Input
              id="location"
              placeholder="e.g., Downtown District, Main Street"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="bg-background border-input focus:border-primary transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background border-input focus:border-primary transition-colors min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Contact Phone (Optional)
            </Label>
            <Input
              id="contact"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="bg-background border-input focus:border-primary transition-colors"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-lg"
          >
            Submit Report
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            * Required fields. Your report helps us respond faster to power issues.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Report;
