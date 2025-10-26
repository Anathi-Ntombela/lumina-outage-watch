import { useState } from "react";
import { Shield, Search, Download } from "lucide-react";
import { useOutages } from "@/contexts/OutageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const statusColors = {
  reported: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  investigating: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  resolved: "bg-green-500/20 text-green-500 border-green-500/30",
};

const Admin = () => {
  const { outages, updateOutageStatus, isLoading } = useOutages();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOutages = outages.filter((outage) => {
    const matchesSearch =
      outage.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outage.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || outage.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    updateOutageStatus(id, newStatus as any);
    toast({
      title: "Status Updated",
      description: "Outage status has been updated successfully.",
    });
  };

  const handleExportCSV = () => {
    const headers = ["Location", "Description", "Contact", "Status", "ETA", "Timestamp"];
    const csvData = filteredOutages.map((outage) => [
      outage.location,
      outage.description,
      outage.contact || "N/A",
      outage.status,
      outage.eta || "TBD",
      outage.timestamp,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `admin-outages-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-glow-pulse" />
          <h1 className="text-4xl font-bold mb-2 text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor all outage reports</p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
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
              onClick={handleExportCSV}
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredOutages.length} of {outages.length} reports
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="text-primary font-semibold">Location</TableHead>
                  <TableHead className="text-primary font-semibold">Description</TableHead>
                  <TableHead className="text-primary font-semibold">Contact</TableHead>
                  <TableHead className="text-primary font-semibold">Status</TableHead>
                  <TableHead className="text-primary font-semibold">ETA</TableHead>
                  <TableHead className="text-primary font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOutages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      No reports found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOutages.map((outage) => (
                    <TableRow key={outage.id} className="border-border hover:bg-muted/50">
                      <TableCell className="font-medium text-foreground">
                        {outage.location}
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-md">
                        {outage.description}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {outage.contact || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[outage.status]}>
                          {outage.status.charAt(0).toUpperCase() + outage.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {outage.eta || "TBD"}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={outage.status}
                          onValueChange={(value) => handleStatusChange(outage.id, value)}
                        >
                          <SelectTrigger className="w-32 h-8 text-xs bg-background border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reported">Reported</SelectItem>
                            <SelectItem value="investigating">Investigating</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-500 text-center">
            <strong>Demo Mode:</strong> This dashboard uses browser storage. In production, connect to your backend API for persistent data and authentication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
