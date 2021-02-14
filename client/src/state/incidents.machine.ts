import { Machine, assign } from 'xstate';
import incidentsAPI from '../api/incidents';

interface IncidentsContext {
  incidentData: IncidentData;
  error: {
    message: string;
  } | null;
}

// SERVICES
const getIncidents = async () => {
  return incidentsAPI.get('/incidents');
};

const addIncident = async (ctx: IncidentsContext, evt: IncidentsEvent) => {
  return incidentsAPI.post('/incidents', evt.payload);
};

type IncidentsEvent =
  | { type: 'GET'; data: { data: Record<string, VehicleData>; response: { data: { message: string } } }; payload: VehicleIncidentData }
  | { type: 'ADD'; data: { data: Record<string, VehicleData>; response: { data: { message: string } } }; payload: VehicleIncidentData };

// SUBSCRIPTIONS MACHINE

interface IncidentsStateSchema {
  states: {
    idle: Record<string, unknown>;
    getting: Record<string, unknown>;
    success_getting: Record<string, unknown>;
    failure_getting: Record<string, unknown>;
    adding: Record<string, unknown>;
    success_adding: Record<string, unknown>;
    failure_adding: Record<string, unknown>;
  };
}

export const incidentsMachine = Machine<IncidentsContext, IncidentsStateSchema, IncidentsEvent>(
  {
    id: 'incidents-machine',
    initial: 'idle',
    context: {
      incidentData: {},
      error: null,
    },
    states: {
      idle: {
        on: {
          GET: 'getting',
          ADD: 'adding',
        },
      },
      getting: {
        invoke: {
          id: 'get-incidents',
          src: 'getIncidents',
          onDone: {
            target: 'success_getting',
            actions: ['cacheIncidents', 'onSuccess'],
          },
          onError: {
            target: 'failure_getting',
            actions: 'cacheError',
          },
        },
      },
      success_getting: {
        after: {
          500: {
            target: 'idle',
          },
        },
      },
      failure_getting: {
        on: {
          GET: 'getting',
        },
      },
      adding: {
        invoke: {
          id: 'add-incident',
          src: 'addIncident',
          onDone: {
            target: 'success_adding',
            actions: ['cacheIncidents', 'onSuccess'],
          },
          onError: {
            target: 'failure_adding',
            actions: 'cacheError',
          },
        },
      },
      success_adding: {
        after: {
          4000: {
            target: 'idle',
          },
        },
        on: { ADD: 'adding' },
      },
      failure_adding: {
        on: {
          ADD: 'adding',
        },
      },
    },
  },
  {
    services: {
      getIncidents,
      addIncident,
    },
    actions: {
      cacheError: assign({
        error: (ctx, evt) => {
          const error = evt?.data?.response?.data || evt?.data;

          const message = error?.message || 'There was an error with the request';

          return {
            message,
          };
        },
      }),
      cacheIncidents: assign({
        incidentData: (ctx, evt) => {
          return evt?.data?.data;
        },
      }),
      onSuccess: () => {
        // Placeholder - overridden when used by component
      },
    },
  }
);
