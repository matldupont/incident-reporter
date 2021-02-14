import * as React from 'react';
import { useIncidentsService } from '../state/incident-provider';
import { Stack } from './stack';
import { Vehicle } from './vehicle';
import { ReportLink } from './report-link';
import { Box } from './box';
import { Text } from './text';
import { Skeleton } from './skeleton';
import { Input } from './input';
import { InputErrorMessage } from './input-error-message';
import DatePicker from 'react-datepicker';

type FilterData = {
  vin: string;
  startDate: Date | null;
  endDate: Date | null;
};

export const VehicleList: React.FC = () => {
  const { incidentData, isGettingIncidents, hasGetIncidentsError, incidentsError } = useIncidentsService();
  const [filterValue, setFilterValue] = React.useState<FilterData>({
    vin: '',
    startDate: null,
    endDate: null,
  });
  const [vinList, setVinList] = React.useState<string[]>([]);

  const setFilterDate = (key: string, value: string | Date) => {
    let fixedValue = value;
    if (value instanceof Date) {
      fixedValue = new Date(value.setHours(0, 0, 0, 0));
    }

    setFilterValue({ ...filterValue, [key]: fixedValue });
  };

  const areFilterDatesValid = () => {
    if (filterValue.startDate && filterValue.endDate) {
      return filterValue.startDate < filterValue.endDate;
    }
    return true;
  };

  const isVINValid = (vin: string) => {
    if (filterValue?.vin?.length > 0 && !vin.includes(filterValue.vin)) {
      return false;
    }
    return true;
  };

  const hasIncidentsInDateRange = (vin: string) => {
    if (!incidentData || !incidentData[vin] || !filterValue) {
      return false;
    }

    if (!!filterValue.startDate || !!filterValue.endDate) {
      const { startDate, endDate } = filterValue;
      const incidents = incidentData[vin]?.incidents.filter((i: { date: string }) => {
        if (startDate && new Date(i.date).getTime() < startDate.getTime()) {
          return false;
        }
        if (endDate && new Date(i.date).getTime() > endDate.getTime()) {
          return false;
        }
        return true;
      });

      if (incidents.length === 0) {
        return false;
      }
    }

    return true;
  };

  React.useEffect(() => {
    const filterIncidents = (vin: string) => {
      if (!isVINValid(vin)) {
        return false;
      }

      if (!hasIncidentsInDateRange(vin)) {
        return false;
      }

      return true;
    };
    if (incidentData) {
      const list: string[] = Object.keys(incidentData).filter(filterIncidents);
      setVinList(list);
    } else {
      setVinList([]);
    }
  }, [incidentData, filterValue]);

  const getContent = () => {
    if (isGettingIncidents) {
      return (
        <Stack p={2} mt={2}>
          <Box mb={3}>
            <Skeleton height="20rem" />
          </Box>
          <Skeleton height="20rem" />
        </Stack>
      );
    }

    if (hasGetIncidentsError) {
      return (
        <Box justifyContent="center" mt={4}>
          <Text color="red" fontWeight="bold">
            {incidentsError || 'There was an error fetching incidents'}
          </Text>
        </Box>
      );
    }
    if (incidentData) {
      if (vinList.length > 0) {
        return (
          <>
            <Box justifyContent="flex-end">
              <Text mb={3} fontSize={1}>{`${vinList.length} Incidents Shown`}</Text>
            </Box>
            {vinList.map((vin, idx) => (
              <Vehicle vehicle={incidentData[vin]} key={`${idx}-${vin}`} />
            ))}
          </>
        );
      }

      return (
        <Box justifyContent="center" mt={4}>
          <Text color="darkGrey">No incidents to show</Text>
        </Box>
      );
    }
  };

  return (
    <Stack>
      <Stack my="4" justifyContent={['flex-end', 'flex-end', 'flex-end', 'space-between']}>
        <Box mx={2} alignItems="stretch" justifyContent="space-between">
          <Stack width="100%" flexDirection={['column', 'column', 'column', 'row']} justifyContent="space-between">
            <Box alignSelf="flex-start">
              <Input
                label="Filter by VIN"
                value={filterValue.vin}
                onChange={(e: { target: { value: string } }) => setFilterValue({ ...filterValue, vin: e?.target?.value })}
              />
            </Box>
            <Box flex="1" mt={[4, 4, 4, 0]} alignSelf={['flex-start', 'flex-start', 'flex-start', 'flex-end']} justifyContent="flex-end">
              <Stack>
                <Text fontWeight="bold" fontSize={2} mb={3}>
                  Filter by Date Range
                </Text>
                {!areFilterDatesValid() && (
                  <InputErrorMessage aria-live="assertive" id="datepicker-error" role="alert" showErrorMessage={true}>
                    Date must be in the past
                  </InputErrorMessage>
                )}
                <Box flexDirection={['column', 'column', 'row', 'column']}>
                  <Stack as="label" mr={3}>
                    <Text fontWeight="bold" fontSize={1}>
                      Start Date
                    </Text>
                    <Box mt={1}>
                      <DatePicker selected={filterValue.startDate} onChange={(date: Date) => setFilterDate('startDate', date)} />
                    </Box>
                  </Stack>
                  <Stack as="label" mt={[3, 3, 0, 3]}>
                    <Text fontWeight="bold" fontSize={1}>
                      End Date
                    </Text>
                    <Box mt={1}>
                      <DatePicker selected={filterValue.endDate} onChange={(date: Date) => setFilterDate('endDate', date)} />
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Stack alignSelf="center" width="100%" p={2} overflow="scroll">
        {getContent()}
      </Stack>
    </Stack>
  );
};
