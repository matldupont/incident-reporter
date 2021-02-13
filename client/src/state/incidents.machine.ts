import { Machine, assign } from 'xstate';

const defaultData: IncidentData = {
  '2C3AA63H75H632197': {
    vin: '2C3AA63H75H632197',
    make: 'Nissan',
    model: 'Rogue',
    year: 2019,
    incidents: [
      { note: 'Hit a post', dateTime: new Date() },
      { note: 'Hit a post', dateTime: new Date() },
      { note: 'Hit a post', dateTime: new Date() },
    ],
  },
  '94MAA63H75H632197': {
    vin: '94MAA63H75H632197',
    make: 'Tesla',
    model: 'Model S',
    year: 2020,
    incidents: [{ dateTime: new Date(), note: 'Cyclist was riding around and hit the back bumper.  what a turd.' }],
  },
  '2C3AA63H89E632197': {
    vin: '2C3AA63H89E632197',
    make: 'Toyota',
    model: 'RAV4',
    year: 2017,
    incidents: [{ dateTime: new Date(), note: 'Hit a post' }],
  },
  '2C3AA63H75H637849': {
    vin: '2C3AA63H75H637849',
    make: 'Mazda',
    model: '6',
    year: 2019,
    incidents: [{ dateTime: new Date(), note: 'Broken window' }],
  },
};

interface IncidentsContext {
  incidentData: IncidentData;
  error: {
    message: string;
  } | null;
}

// SERVICES
const getIncidents = async () => {
  // return get(`${incidentsEndpoint}`);
};

const addIncident = async () => {
  // return post(`${incidentEndpoint})
};

export enum IncidentEventTypes {
  GET,
  ADD,
}

type IncidentsEvent = { type: 'GET' } | { type: 'GET_RETRY' } | { type: 'ADD' } | { type: 'ADD_RETRY' };

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
      incidentData: defaultData,
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
            actions: ['cacheSubscriptions', 'onSuccess'],
          },
          onError: {
            target: 'failure_adding',
            actions: 'cacheError',
          },
        },
      },
      success_adding: {
        after: {
          500: {
            target: 'idle',
          },
        },
      },
      failure_adding: {
        on: {
          GET: 'adding',
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
      // cacheError: assign({
      //   error: (ctx, evt) => {
      //     const error = evt?.data?.response?.data || evt?.data;

      //     const message = error?.message || 'There was an error with the request';

      //     return {
      //       message,
      //     };
      //   },
      // }),
      cacheIncidents: assign({
        // incidents: (ctx, evt) => {
        //   return evt?.data?.data?.subscriptions;
        // },
      }),
      onSuccess: () => {
        // Placeholder - overridden when used by component
      },
    },
  }
);
