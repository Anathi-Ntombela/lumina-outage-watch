import { useState, useMemo } from "react";
import { Clock, MapPin, AlertCircle, Search, Download } from "lucide-react";
import { useOutages } from "@/contexts/OutageContext";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusColors = {
  reported: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  investigating: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  resolved: "bg-green-500/20 text-green-500 border-green-500/30",
};

const Feed = () => {
  const { outages, isLoading } = useOutages();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter and search outages
  const filteredOutages = useMemo(() => {
    return outages.filter((outage) => {
      const matchesSearch =
        outage.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outage.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || outage.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [outages, searchQuery, statusFilter]);

  // Export to JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(filteredOutages, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `outage-reports-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading outages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <AlertCircle className="h-12 w-12 text-primary mx-auto mb-4 animate-glow-pulse" />
          <h1 className="text-4xl font-bold mb-2 text-foreground">Outage Updates</h1>
          <p className="text-muted-foreground">Real-time status of reported power issues</p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-card border-border">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={handleExport}
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredOutages.length} of {outages.length} reports
            </span>
          </div>
        </div>

        {/* Outage List */}
        <div className="space-y-4">
          {filteredOutages.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">No outages match your filters.</p>
            </div>
          ) : (
            filteredOutages.map((outage, index) => (
              <div
                key={outage.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
