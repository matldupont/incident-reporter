import * as React from 'react';
import { Box } from './box';
import { Stack } from './stack';
import { Input } from './input';
import { Text } from './text';
import DatePicker from 'react-datepicker';
import { Button } from './button';

import 'react-datepicker/dist/react-datepicker.css';

export const IncidentForm: React.FC = () => {
  return (
    <Stack mx={3}>
      <Text as="h1" fontSize={[4, 4, 5]} my={4}>
        Report a new Incident
      </Text>
      <Stack
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Submitting form!', e);
        }}
      >
        <Box mb={3}>
          <Input label="VIN" />
        </Box>
        <Box mb={3}>
          <Stack as="label">
            <Text fontWeight="bold" fontSize={1}>
              Date
            </Text>
            <DatePicker selected={new Date()} onChange={(date) => console.log('date', date)} />
          </Stack>
        </Box>
        <Box mb={3}>
          <Input textarea label="Note" />
        </Box>
        <Button alignSelf="start" type="submit">
          Subit Incident
        </Button>
      </Stack>
    </Stack>
  );
};
