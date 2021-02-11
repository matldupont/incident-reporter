import { Machine, assign } from 'xstate';

const defaultData: IncidentData = {
  '2C3AA63H75H632197': {
    vin: '2C3AA63H75H632197',
    make: 'Nissan',
    model: 'Rogue',
    year: 2019,
    incidents: [{ note: 'Hit a post', dateTime: new Date() }],
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
  retries: number;
  error: {
    message: string;
  } | null;
}

// SERVICES
const getIncidents = async () => {
  // return get(`${incidentsEndpoint}`);
};

export enum IncidentEventTypes {
  GET,
  RETRY,
}

type IncidentsEvent = { type: 'GET' } | { type: 'RETRY' };

// EVENTS
const events = {
  GET: 'get',
  RETRY: 'retry',
};

// SUBSCRIPTIONS MACHINE

interface IncidentsStateSchema {
  states: {
    idle: Record<string, unknown>;
    loading: Record<string, unknown>;
    success: Record<string, unknown>;
    failure: Record<string, unknown>;
    maxRetries: Record<string, unknown>;
  };
}

export const incidentsMachine = Machine<IncidentsContext, IncidentsStateSchema, IncidentsEvent>(
  {
    id: 'incidents-machine',
    initial: 'idle',
    context: {
      retries: 0,
      incidentData: defaultData,
      error: null,
    },
    states: {
      idle: {
        on: {
          [events.GET]: 'loading',
        },
      },
      loading: {
        invoke: {
          id: 'get-subscriptions',
          src: 'getSubscriptions',
          onDone: {
            target: 'success',
            actions: ['cacheSubscriptions', 'onSuccess'],
          },
          onError: {
            target: 'failure',
            actions: 'cacheError',
          },
        },
      },
      success: {
        after: {
          500: {
            target: 'idle',
          },
        },
      },
      failure: {
        on: {
          [events.RETRY]: [
            {
              cond: 'maxRetriesReached',
              target: 'maxRetries',
            },
            {
              target: 'loading',
              actions: assign<IncidentsContext, IncidentsEvent>({
                retries: (context) => {
                  return context.retries + 1;
                },
              }),
            },
          ],
        },
      },
      maxRetries: {
        after: {
          500: {
            target: 'idle',
          },
        },
      },
    },
  },
  {
    services: {
      getIncidents,
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
    guards: {
      maxRetriesReached: (ctx: IncidentsContext) => ctx.retries >= 2,
    },
  }
);
