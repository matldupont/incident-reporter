import * as React from 'react';
import { useIncidentsService } from '../state/incident-provider';
import { Stack } from './stack';
import { Vehicle } from './vehicle';

export const VehicleList: React.FC = () => {
  const { incidentData } = useIncidentsService();

  console.log('incidents', incidentData);

  if (!incidentData) return null;

  return (
    <Stack
      // position="absolute"
      // bottom="0"
      // height="calc(100% - 12rem)"
      alignSelf="center"
      maxWidth="40rem"
      width="100%"
      p={2}
      overflow="scroll"
    >
      {Object.keys(incidentData).map((vin, idx) => (
        <Vehicle vehicle={incidentData[vin]} key={`${idx}-${vin}`} />
      ))}
    </Stack>
  );
};
