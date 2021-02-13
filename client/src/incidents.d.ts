type VehicleData = {
  vin: string;
  make: string;
  model: string;
  year: number;
  incidents: VehicleIncidentData[];
};

type VehicleIncidentData = {
  dateTime: Date;
  note: string;
};

type IncidentData = Record<string, VehicleData>;
