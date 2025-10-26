export interface OutageReport {
  id: string;
  location: string;
  description: string;
  contact?: string;
  status: "reported" | "investigating" | "resolved";
  eta?: string;
  timestamp: string;
}

export const dummyOutages: OutageReport[] = [
  {
    id: "1",
    location: "Downtown District, Main Street",
    description: "Power outage affecting multiple buildings",
    contact: "+1 (555) 123-4567",
    status: "investigating",
    eta: "2 hours",
    timestamp: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    location: "Riverside Area, Oak Avenue",
    description: "Flickering lights and voltage fluctuations",
    status: "reported",
    timestamp: "2024-01-15T11:15:00Z",
  },
  {
    id: "3",
    location: "Industrial Zone, Factory Road",
    description: "Complete power loss in manufacturing facility",
    contact: "+1 (555) 987-6543",
    status: "investigating",
    eta: "4 hours",
    timestamp: "2024-01-15T09:00:00Z",
  },
  {
    id: "4",
    location: "Suburbs, Maple Drive",
    description: "Street lights not functioning",
    status: "resolved",
    timestamp: "2024-01-14T22:00:00Z",
  },
  {
    id: "5",
    location: "University Campus, Building A",
    description: "Partial power outage affecting lecture halls",
    contact: "+1 (555) 456-7890",
    status: "investigating",
    eta: "1 hour",
    timestamp: "2024-01-15T12:00:00Z",
  },
];
