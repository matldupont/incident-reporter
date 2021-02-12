import * as React from 'react';
import { GlobalStyle } from './styles/global';
import { TrovThemeProvider } from './styles/theme-provider';
import { Header, Main } from './components/layout';
import { IncidentsProvider } from './state/incident-provider';
import { VehicleList } from './components/vehicle-list';

const App: React.FC = () => {
  return (
    <TrovThemeProvider>
      <GlobalStyle />
      <Header />
      <Main>
        <IncidentsProvider>
          <VehicleList />
        </IncidentsProvider>
      </Main>
    </TrovThemeProvider>
  );
};

export default App;
