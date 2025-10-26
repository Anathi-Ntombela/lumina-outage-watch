import { OutageReport } from "@/data/dummyData";

const STORAGE_KEY = "lumina_outages";

export const localStorageService = {
  // Get all outages from localStorage
  getOutages: (): OutageReport[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  },

  // Add a new outage report
  addOutage: (outage: {
    location: string;
    description: string;
    contact?: string;
  }): OutageReport => {
    try {
      const outages = localStorageService.getOutages();
      const newOutage: OutageReport = {
        ...outage,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        status: "reported",
      };
      outages.unshift(newOutage); // Add to beginning
      localStorage.setItem(STORAGE_KEY, JSON.stringify(outages));
      return newOutage;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      throw error;
    }
  },

  // Update outage status (for admin)
  updateOutageStatus: (
    id: string,
    status: OutageReport["status"],
    eta?: string
  ): void => {
    try {
      const outages = localStorageService.getOutages();
      const updatedOutages = outages.map((outage) =>
        outage.id === id ? { ...outage, status, eta } : outage
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOutages));
    } catch (error) {
      console.error("Error updating localStorage:", error);
      throw error;
    }
  },

  // Clear all outages (for testing)
  clearOutages: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      throw error;
    }
  },

  // Initialize with dummy data if empty
  initializeDummyData: (dummyData: OutageReport[]): void => {
    try {
      const existing = localStorageService.getOutages();
      if (existing.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
      }
    } catch (error) {
      console.error("Error initializing dummy data:", error);
    }
  },
};
