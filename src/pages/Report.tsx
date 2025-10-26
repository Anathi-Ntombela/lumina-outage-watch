import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, MapPin, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useOutages } from "@/contexts/OutageContext";
import { outageReportSchema } from "@/lib/validation";

const Report = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addOutage } = useOutages();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = outageReportSchema.parse(formData);

      // Add to localStorage via context
      addOutage({
        location: validatedData.location,
        description: validatedData.description,
        contact: validatedData.contact,
      });

      toast({
        title: "Report Submitted! (Demo Mode)",
        description: "Your outage report has been saved locally. In production, this would be sent to the server.",
      });

      // Reset form
      setFormData({ location: "", description: "", contact: "" });

      // Navigate to feed after 1.5 seconds
      setTimeout(() => {
        navigate("/feed");
      }, 1500);
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Validation Error",
          description: "Please check the form for errors.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit report. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="max-w-2xl mx-auto animate-slide-up">
        <div className="text-center mb-8">
          <AlertCircle className="h-12 w-12 text-primary mx-auto mb-4 animate-glow-pulse" />
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
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value });
                setErrors({ ...errors, location: "" });
              }}
              className={`bg-background border-input focus:border-primary transition-colors ${
                errors.location ? "border-destructive" : ""
              }`}
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location}</p>
            )}
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
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                setErrors({ ...errors, description: "" });
              }}
              className={`bg-background border-input focus:border-primary transition-colors min-h-[120px] ${
                errors.description ? "border-destructive" : ""
              }`}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
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
              onChange={(e) => {
                setFormData({ ...formData, contact: e.target.value });
                setErrors({ ...errors, contact: "" });
              }}
              className={`bg-background border-input focus:border-primary transition-colors ${
                errors.contact ? "border-destructive" : ""
              }`}
            />
            {errors.contact && (
              <p className="text-sm text-destructive">{errors.contact}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-lg disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            * Required fields. Your report helps us respond faster to power issues.
          </p>

          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded text-sm text-yellow-500">
            <strong>Demo Mode:</strong> Reports are saved in browser storage only. Production version will save to database.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Report;
