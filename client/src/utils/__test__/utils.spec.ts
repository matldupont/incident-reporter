import { getInvalidFormFields, areFilterDatesValid, doesVINMatch, hasIncidentsInDateRange } from '../index';

test('getInvalidFormFields returns invalid fields', () => {
  let testDate = new Date();
  testDate.setDate(testDate.getDate() + 2);
  const formData = {
    vin: '',
    date: testDate,
    note: '',
  };

  expect(getInvalidFormFields(formData)).toEqual(['vin', 'date', 'note']);

  formData.vin = 'adsfef';
  formData.date = new Date();
  formData.note = 'Testing Note';
  expect(getInvalidFormFields(formData)).toEqual(['vin']);

  formData.vin = '2C3AA63H75H632197';
  expect(getInvalidFormFields(formData)).toEqual([]);
});

test('areFilterDatesValid properly validates', () => {
  expect(areFilterDatesValid({})).toBeTruthy();
  expect(areFilterDatesValid({ startDate: new Date() })).toBeTruthy();

  let startDate = new Date();
  startDate.setDate(startDate.getDate() - 1);
  expect(areFilterDatesValid({ startDate, endDate: new Date() })).toBeTruthy();

  startDate.setDate(startDate.getDate() + 10);
  expect(areFilterDatesValid({ startDate, endDate: new Date() })).toBeFalsy();
});

test('doesVINMatch properly checks for string inclusion as in case insensitive', () => {
  const vin = '2C3AA63H75H632197';

  expect(doesVINMatch(vin, '')).toBeTruthy();
  expect(doesVINMatch(vin, '2C3')).toBeTruthy();
  expect(doesVINMatch(vin, '2c3')).toBeTruthy();
  expect(doesVINMatch(vin, '2c3x')).toBeFalsy();
});

test('hasIncidentsInDateRange checks if the vehicle data has incidents within the filter date range', () => {
  const vehicleData: VehicleData = {
    vin: '2C3AA63H75H632197',
    make: 'Nissan',
    model: 'Rogue',
    year: 2019,
    incidents: [{ vin: '2C3AA63H75H632197', note: 'Hit a post', date: new Date().toLocaleString() }],
  };

  // start date tests
  const startDate = new Date(new Date().setHours(0, 0, 0, 0));
  expect(hasIncidentsInDateRange(vehicleData, {})).toBeTruthy();
  expect(hasIncidentsInDateRange(vehicleData, { startDate })).toBeTruthy();

  // end date tests
  const endDate = new Date(new Date().setHours(0, 0, 0, 0));
  endDate.setDate(endDate.getDate() + 1);
  expect(hasIncidentsInDateRange(vehicleData, { endDate })).toBeTruthy();

  // start and end date tests
  expect(hasIncidentsInDateRange(vehicleData, { startDate, endDate })).toBeTruthy();

  // out of range tests
  startDate.setDate(startDate.getDate() + 5);
  expect(hasIncidentsInDateRange(vehicleData, { startDate })).toBeFalsy();
  endDate.setDate(endDate.getDate() - 5);
  expect(hasIncidentsInDateRange(vehicleData, { endDate })).toBeFalsy();
});
