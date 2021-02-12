import * as React from 'react';
import { GlobalStyle } from './styles/global';
import { TrovThemeProvider } from './styles/theme-provider';
import { Header, Main } from './components/layout';
import { IncidentsProvider } from './state/incident-provider';
import { VehicleList } from './components/vehicle-list';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IncidentForm } from './components/incident-form';

const App: React.FC = () => {
  return (
    <TrovThemeProvider>
      <GlobalStyle />
      <Router>
        <Header />
        <Main>
          <IncidentsProvider>
            <Switch>
              <Route path="/report">
                <IncidentForm path="/report" />
              </Route>
              <Route path="/">
                <VehicleList path="/" />
              </Route>
            </Switch>
          </IncidentsProvider>
        </Main>
      </Router>
    </TrovThemeProvider>
  );
};

export default App;
