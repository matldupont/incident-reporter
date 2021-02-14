import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box } from './box';
import { Stack } from './stack';
import { Input } from './input';
import { Text } from './text';
import DatePicker from 'react-datepicker';
import { Button } from './button';
// import axios from 'axios';
import { useIncidentsService } from '../state/incident-provider';

import 'react-datepicker/dist/react-datepicker.css';
import Spinner from './spinner';
import { InputErrorMessage } from './input-error-message';

export const IncidentForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    vin: '',
    date: new Date(),
    note: '',
  });
  const [invalidFields, setInvalidFields] = React.useState([]);

  const { addIncident, incidentsError, isAddingIncident, hasAddIncidentError, isAddIncidentSuccessful } = useIncidentsService();

  const isFormDataValid = () => {
    const { vin, date, note } = formData;
    const fields = [];
    if (vin.length !== 17) {
      fields.push('vin');
    }

    if (date.getTime() > new Date().getTime()) {
      fields.push('date');
    }

    if (note.length === 0) {
      fields.push('note');
    }
    setInvalidFields(fields);
    return fields.length === 0;
  };

  const submitIncidentHandler = async (e: Event) => {
    e.preventDefault();
    if (!isFormDataValid()) {
      return;
    }
    addIncident(formData);
  };

  const changeHandler = (key: string, value: string | Date) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <Stack mx={3}>
      <Link to="/">
        <Text color="blue">{`Back to Incident List`}</Text>
      </Link>
      <Text as="h1" fontSize={[4, 4, 5]} my={4}>
        Report a new Incident
      </Text>
      <Stack as="form" onSubmit={submitIncidentHandler}>
        <Box mb={3}>
          <Input
            errorMessage="VIN must be valid"
            hasError={invalidFields.includes('vin')}
            label="VIN"
            value={formData.vin}
            onChange={(e) => changeHandler('vin', e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <Stack as="label">
            <Text fontWeight="bold" fontSize={1}>
              Date
            </Text>
            {invalidFields.includes('date') && (
              <InputErrorMessage aria-live="assertive" id="datepicker-error" role="alert" showErrorMessage={invalidFields.includes('date')}>
                Date must be in the past
              </InputErrorMessage>
            )}
            <Box mt={1}>
              <DatePicker selected={formData.date} onChange={(date) => changeHandler('date', date)} />
            </Box>
          </Stack>
        </Box>
        <Box mb={3}>
          <Input
            errorMessage="Note cannot be left empty"
            hasError={invalidFields.includes('note')}
            textarea
            rows={6}
            label="Note"
            value={formData.note}
            onChange={(e) => changeHandler('note', e.target.value)}
          />
        </Box>
        <Stack mt={3}>
          {hasAddIncidentError && (
            <Box bg="lightRed" mb={3} border={4} borderRadius={1} p={2}>
              <Text fontSize={1} color="red">
                {incidentsError}
              </Text>
            </Box>
          )}
          {isAddIncidentSuccessful && (
            <Box bg="lightGreen" mb={3} border={5} borderRadius={1} p={2}>
              <Text fontSize={1} color="green">
                Incident has been successfully added
              </Text>
            </Box>
          )}
          <Button alignSelf="start" type="submit">
            <Box alignItems="center">
              <Text>Submit Incident</Text>
              {isAddingIncident && <Spinner ml={3} size="2.5rem" />}
            </Box>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
