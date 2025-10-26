import { Clock, MapPin, AlertCircle } from "lucide-react";
import { dummyOutages } from "@/data/dummyData";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  reported: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  investigating: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  resolved: "bg-green-500/20 text-green-500 border-green-500/30",
};

const Feed = () => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <AlertCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-foreground">Outage Updates</h1>
          <p className="text-muted-foreground">Real-time status of reported power issues</p>
        </div>

        <div className="space-y-4 animate-slide-up">
          {dummyOutages.map((outage, index) => (
            <div
              key={outage.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{outage.location}</h3>
                    <p className="text-sm text-muted-foreground">{outage.description}</p>
                  </div>
                </div>
                
                <Badge className={statusColors[outage.status]}>
                  {outage.status.charAt(0).toUpperCase() + outage.status.slice(1)}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(outage.timestamp)}
                </div>
                {outage.eta && (
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-primary">ETA:</span>
                    {outage.eta}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {dummyOutages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No outages reported at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
