export const getInvalidFormFields = ({ vin, date, note }: { vin: string; date: Date; note: string }): string[] => {
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
  return fields;
};

export const areFilterDatesValid = (filter: FilterData): boolean => {
  if (filter.startDate && filter.endDate) {
    return filter.startDate < filter.endDate;
  }
  return true;
};

export const doesVINMatch = (vin: string, filterVin: string): boolean => {
  if (filterVin?.length > 0 && !vin.toLowerCase().includes(filterVin.toLowerCase())) {
    return false;
  }
  return true;
};

export const hasIncidentsInDateRange = (vehicleData: VehicleData, filterData: FilterData): boolean => {
  const { startDate, endDate } = filterData;
  if (!!startDate || !!endDate) {
    const incidents = vehicleData?.incidents.filter((i: { date: string }) => {
      if (startDate && new Date(i.date).getTime() < startDate.getTime()) {
        return false;
      }
      if (endDate && new Date(i.date).getTime() > endDate.getTime()) {
        return false;
      }
      return true;
    });

    if (incidents && incidents.length === 0) {
      return false;
    }
  }

  return true;
};
