import * as React from 'react';
import { Stack } from './stack';
import { Text } from './text';
import { Box } from './box';

type VehicleProps = {
  vehicle: VehicleData;
};

export const Vehicle: React.FC<VehicleProps> = ({ vehicle }) => {
  if (!vehicle) return null;
  const { incidents, vin, make, year, model } = vehicle;

  const getDateString = (date: string) => {
    return new Date(date).toDateString();
  };

  const incidentSort = (incidentA: { date: string }, incidentB: { date: string }) => {
    return incidentA.date < incidentB.date ? 1 : -1;
  };

  return (
    <Stack bg="white" borderRadius={1} border={1} p={3} mb={3}>
      <Text fontWeight="bold" mb={2}>
        {vin}
      </Text>
      <Text color="blue" fontSize={1} fontWeight="bold">{`${year} ${make} ${model}`}</Text>
      {incidents && (
        <>
          <Box alignItems="center" mt={4} mb={3}>
            <Box borderBottom={2} flex="1" />
            <Text mx={3} fontWeight="bold" fontSize={1}>{`${incidents.length} Incident${incidents.length > 1 ? 's' : ''}`}</Text>
            <Box borderBottom={2} flex="1" />
          </Box>
          <Stack>
            {incidents.sort(incidentSort).map(({ date, note }, idx) => (
              <Stack bg="grey" key={`${idx}-${date}`} py={2} borderRadius={1} mb={3} p={2}>
                <Text fontSize={0} fontWeight="bold" mb={2}>
                  {getDateString(date)}
                </Text>
                <Box p={2}>
                  <Text fontSize={1} fontWeight="regular">
                    {note}
                  </Text>
                </Box>
              </Stack>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};
