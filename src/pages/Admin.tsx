import { Shield } from "lucide-react";
import { dummyOutages } from "@/data/dummyData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  reported: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  investigating: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  resolved: "bg-green-500/20 text-green-500 border-green-500/30",
};

const Admin = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor all outage reports</p>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyOutages.map((outage) => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 border border-border rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong className="text-primary">Demo Mode:</strong> This dashboard displays static data for demonstration purposes. 
            In production, this would connect to a real backend system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
