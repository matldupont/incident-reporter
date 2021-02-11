import * as React from 'react';
import { useMachine } from '@xstate/react';
import { incidentsMachine } from './incidents.machine';

type IncidentsContextType = {
  incidents?: Incident[];
  incidentsError: string | null;
  hasIncidentsError: boolean;
  isIncidentsLoading: boolean;
  isIncidentsSuccessful: boolean;
};

const defaultContext: IncidentsContextType = {
  incidents: [],
  incidentsError: null,
  hasIncidentsError: false,
  isIncidentsLoading: false,
  isIncidentsSuccessful: false,
};

const IncidentsContext = React.createContext<IncidentsContextType>(defaultContext);

const IncidentsProvider: React.FC<React.ReactPropTypes> = (props) => {
  // Subscriptions

  const [currentIncidentsState, sendIncidentsEvent] = useMachine(incidentsMachine);

  const getIncidents = () => {
    sendIncidentsEvent('GET');
  };

  const hasIncidentsError = currentIncidentsState.matches('failure');
  const isIncidentsLoading = currentIncidentsState.matches('loading');
  const isIncidentsSuccessful = currentIncidentsState.matches('success');
  const { incidents } = currentIncidentsState.context;
  const incidentsError = currentIncidentsState.context?.error?.message;

  React.useEffect(() => {
    getIncidents();
  }, []);

  const value: IncidentsContextType = React.useMemo(
    () =>
      ({
        incidents,
        incidentsError,
        hasIncidentsError,
        isIncidentsLoading,
        isIncidentsSuccessful,
      } as IncidentsContextType),
    [incidents, incidentsError, hasIncidentsError, isIncidentsLoading, isIncidentsSuccessful]
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
