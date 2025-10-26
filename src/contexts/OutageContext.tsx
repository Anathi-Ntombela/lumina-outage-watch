import React, { createContext, useContext, useState, useEffect } from "react";
import { OutageReport, dummyOutages } from "@/data/dummyData";
import { localStorageService } from "@/lib/localStorage";

interface OutageContextType {
  outages: OutageReport[];
  addOutage: (outage: { location: string; description: string; contact?: string }) => void;
  updateOutageStatus: (id: string, status: OutageReport["status"], eta?: string) => void;
  isLoading: boolean;
}

const OutageContext = createContext<OutageContextType | undefined>(undefined);

export const OutageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [outages, setOutages] = useState<OutageReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data on mount
  useEffect(() => {
    // Initialize with dummy data if localStorage is empty
    localStorageService.initializeDummyData(dummyOutages);
    
    // Load outages
    const loadedOutages = localStorageService.getOutages();
    setOutages(loadedOutages);
    setIsLoading(false);
  }, []);

  const addOutage = (outage: { location: string; description: string; contact?: string }) => {
    const newOutage = localStorageService.addOutage(outage);
    setOutages((prev) => [newOutage, ...prev]);
  };

  const updateOutageStatus = (
    id: string,
    status: OutageReport["status"],
    eta?: string
  ) => {
    localStorageService.updateOutageStatus(id, status, eta);
    setOutages((prev) =>
      prev.map((outage) =>
        outage.id === id ? { ...outage, status, eta } : outage
      )
    );
  };

  return (
    <OutageContext.Provider
      value={{ outages, addOutage, updateOutageStatus, isLoading }}
    >
      {children}
    </OutageContext.Provider>
  );
};

export const useOutages = () => {
  const context = useContext(OutageContext);
  if (context === undefined) {
    throw new Error("useOutages must be used within an OutageProvider");
  }
  return context;
};
