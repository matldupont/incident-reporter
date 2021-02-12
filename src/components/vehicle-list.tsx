import * as React from 'react';
import { useIncidentsService } from '../state/incident-provider';
import { Stack } from './stack';
import { Vehicle } from './vehicle';
import { ReportLink } from './report-link';
import { Box } from './box';

export const VehicleList: React.FC = () => {
  const { incidentData } = useIncidentsService();

  console.log('incidents', incidentData);

  if (!incidentData) return null;

  return (
    <Stack>
      <Box justifyContent="center" display={['none', 'none', 'flex']}>
        <ReportLink alignSelf="center" to="/report">
          Report an Incident
        </ReportLink>
      </Box>
      <Stack
        // position="absolute"
        // bottom="0"
        // height="calc(100% - 12rem)"
        alignSelf="center"
        width="100%"
        p={2}
        overflow="scroll"
      >
        {Object.keys(incidentData).map((vin, idx) => (
          <Vehicle vehicle={incidentData[vin]} key={`${idx}-${vin}`} />
        ))}
      </Stack>
    </Stack>
  );
};
