import * as React from 'react';
import { useMachine } from '@xstate/react';
import { incidentsMachine } from './incidents.machine';

type IncidentsContextType = {
  incidentData?: IncidentData;
  incidentsError: string | null;
  hasGetIncidentsError: boolean;
  isGettingIncidents: boolean;
  isGetIncidentsSuccessful: boolean;
  hasAddIncidentError: boolean;
  isAddingIncident: boolean;
  isAddIncidentSuccessful: boolean;
};

const defaultContext: IncidentsContextType = {
  incidentData: {},
  incidentsError: null,
  hasGetIncidentsError: false,
  isGettingIncidents: false,
  isGetIncidentsSuccessful: false,
  hasAddIncidentError: false,
  isAddingIncident: false,
  isAddIncidentSuccessful: false,
};

const IncidentsContext = React.createContext<IncidentsContextType>(defaultContext);

const IncidentsProvider: React.FC<React.ReactPropTypes> = (props) => {
  // Subscriptions

  const [currentIncidentsState, sendIncidentsEvent] = useMachine(incidentsMachine);

  const getIncidents = () => {
    sendIncidentsEvent({ type: 'GET' });
  };

  const addIncident = (payload: VehicleIncidentData) => {
    sendIncidentsEvent({ type: 'ADD', payload });
  };

  const hasGetIncidentsError = currentIncidentsState.matches('failure_getting');
  const isGettingIncidents = currentIncidentsState.matches('getting');
  const isGetIncidentsSuccessful = currentIncidentsState.matches('success_getting');
  const { incidentData } = currentIncidentsState.context;
  const incidentsError = currentIncidentsState.context?.error?.message;
  const hasAddIncidentError = currentIncidentsState.matches('failure_adding');
  const isAddingIncident = currentIncidentsState.matches('adding');
  const isAddIncidentSuccessful = currentIncidentsState.matches('success_adding');

  React.useEffect(() => {
    getIncidents();
  }, []);

  const value: IncidentsContextType = React.useMemo(
    () =>
      ({
        addIncident,
        incidentData,
        incidentsError,
        hasGetIncidentsError,
        isGettingIncidents,
        isGetIncidentsSuccessful,
        hasAddIncidentError,
        isAddingIncident,
        isAddIncidentSuccessful,
      } as IncidentsContextType),
    [
      addIncident,
      incidentData,
      incidentsError,
      hasGetIncidentsError,
      isGettingIncidents,
      isGetIncidentsSuccessful,
      hasAddIncidentError,
      isAddingIncident,
      isAddIncidentSuccessful,
    ]
  );

  return <IncidentsContext.Provider value={value} {...props} />;
};

const useIncidentsService = (): IncidentsContextType => {
  const context = React.useContext(IncidentsContext) as IncidentsContextType;
  if (!context) {
    throw new Error(`useIncidentsService must be used within an IncidentsProvider`);
  }

  return context;
};

export { IncidentsProvider, useIncidentsService };
