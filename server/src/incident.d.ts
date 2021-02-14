type VehicleData = {
  vin: string;
  make: string;
  model: string;
  year: string;
  incidents: {
    incident: string;
    note: string;
  }[];
};
