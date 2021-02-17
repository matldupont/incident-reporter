# Incident Reporter - Front End

## In this document

- [The Goal](#the-goal)
- [The Structure](#the-structure)
- [Containerization](#containerization)
- [Running locally](#running-locally)
- [Testing](#testing)

## The Goal

A vehicle incident reporting system.

The user is presented with a filterable list of vehicle incidents, grouped by VIN. This data is fetched from the server.

Filtering can either be done by free-typing part or all of a VIN or by selecting a date range using the respective input and date pickers.

The user may also report a new incident using the + icon to navigate to the entry form.

The form consists of three fields:

- VIN
- Date
- Note

On submission, a web call is made to the server which decodes the VIN. The resulting vehicle _make_, _model_ and _year_ in addition to the _date_ and _note_ are added to the vehicle incidents.

## The Structure

At a high level, this application consists of a [React](https://reactjs.org/) front end client and [Node.js](https://nodejs.org/en/) backend server. Data is stored in memory on the server and not persisted to a database.

### The Frontend

In addition to a foundation of React([Create React App](https://reactjs.org/docs/create-a-new-react-app.html)) and [Typescript](https://www.typescriptlang.org/), the main structure of the application leverages the React Context API as well as:

- [React Router](https://reactrouter.com/) - Routing between the incident list and incident form
- [XState](https://xstate.js.org/docs/) - UI state management for the form submission
- [Styled Components](https://styled-components.com/) - UI component creation
- [Styled System](https://styled-system.com/) - Design token and Theming for UI components
- [Axios](https://github.com/axios/axios) - Http calls to the server
- [React Datepicker](https://reactdatepicker.com/) - The filtering and form datepickers (I had to cut a corner somewhere)

### The Backend

A simple Node.js service using Typescript and:

- [Express](https://expressjs.com/)
- [Express Validator](https://express-validator.github.io/docs/)
- [ts-node-dev](https://github.com/wclr/ts-node-dev#readme)

## Containerization

Both services are available as [Docker](https://www.docker.com/) images.

### The Client

```
  docker pull matldupont/incident-client
  docker run matldupont/incident-client
```

### The Server

```
  docker pull matldupont/incident-server
  docker run matldupont/incident-server
```

With both containers running, you should be able to access the application at [http://localhost:3000](http://localhost:3000)

## Running locally

In addition to the Docker containers, the application services can also be installed and run locally.

By opening two terminals and running these commands in each service directory.

### The Client

```
cd client
yarn
yarn start
```

### The Server

```
cd server
yarn
yarn start
```

Once both services are installed and runnin, the application should be accessible at [http://localhost:3000](http://localhost:3000)

## Testing

By favouring user testing over implementation testing, this application uses a combination of unit testing for utility functions and end-to-end testing for the UI functionality. (The server is admittedly untested in terms of implementation or integration tests)

The testing is done using:

- [Jest](https://jestjs.io/) - Unit testing
- [Cypress](https://www.cypress.io/) - End-to-end Testing
- [Testing-library](https://testing-library.com/) - Testing Utilities for both Jest and Cypress
- [Cypress Axe](https://github.com/component-driven/cypress-axe) - End-to-end A11y testing ([axe-core](https://github.com/dequelabs/axe-core))

### Unit testing

```
cd client
yarn test
```

### End to End Testing (I love watching these go)

```
cd client
yarn run test:e2e
```
