import axios from 'axios';
const VIN_VARS = ['Make', 'Model', 'Model Year'];

export const parseVINResults = (
  results: { Variable: string; Value: string }[]
) => {
  return results
    .filter(({ Variable }) => {
      return VIN_VARS.includes(Variable);
    })
    .reduce((res, { Variable, Value }) => {
      const v = Variable === 'Model Year' ? 'year' : Variable.toLowerCase();
      return {
        ...res,
        [v]: Value,
      };
    }, {});
};

export const decodeVIN = async (vin: string) => {
  const { data } = await axios.get(
    `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
  );

  return parseVINResults(data.Results);
};
