type VehicleData = {
  vin: string;
  make: string;
  model: string;
  year: number;
  incidents: VehicleIncidentData[];
};

type VehicleIncidentData = {
  vin: string;
  date: string;
  note: string;
};

type IncidentData = Record<string, VehicleData>;
