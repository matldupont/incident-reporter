import * as React from 'react';
import { Box } from './box';
import { Stack } from './stack';
import { Input } from './input';
import { Text } from './text';
import DatePicker from 'react-datepicker';
import { Button } from './button';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

const VIN_VARS = ['Make', 'Model', 'Model Year'];

export const IncidentForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    vin: '',
    date: new Date(),
    note: '',
  });

  const parseVINResults = (results) => {
    return results
      .filter(({ Variable }) => {
        return VIN_VARS.includes(Variable);
      })
      .reduce((res, { Variable, Value }) => {
        return {
          ...res,
          [Variable]: Value,
        };
      }, {});
  };

  const submitIncidentHandler = async (e: Event) => {
    e.preventDefault();
    console.log('SUMIBT!', formData);

    try {
      const { data } = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/2C3AA63H75H632197?format=json');
      console.log('result!', parseVINResults(data.Results));
    } catch (e) {
      console.error('error decoding vin', e);
    }
  };

  const changeHandler = (key: string, value: string | Date) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <Stack mx={3}>
      <Text as="h1" fontSize={[4, 4, 5]} my={4}>
        Report a new Incident
      </Text>
      <Stack as="form" onSubmit={submitIncidentHandler}>
        <Box mb={3}>
          <Input label="VIN" value={formData.vin} onChange={(e) => changeHandler('vin', e.target.value)} />
        </Box>
        <Box mb={3}>
          <Stack as="label">
            <Text fontWeight="bold" fontSize={1}>
              Date
            </Text>
            <DatePicker selected={formData.date} onChange={(date) => changeHandler('date', date)} />
          </Stack>
        </Box>
        <Box mb={3}>
          <Input textarea label="Note" value={formData.note} onChange={(e) => changeHandler('note', e.target.value)} />
        </Box>
        <Button alignSelf="start" type="submit">
          Submit Incident
        </Button>
      </Stack>
    </Stack>
  );
};
