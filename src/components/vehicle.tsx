import * as React from 'react';
import { Stack } from './stack';
import { Text } from './text';

type VehicleProps = {
  vehicle: VehicleData;
};

export const Vehicle: React.FC<VehicleProps> = ({ vehicle }) => {
  if (!vehicle) return null;
  return (
    <Stack>
      <Text>{vehicle.vin}</Text>
      <Text>{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</Text>
    </Stack>
  );
};
