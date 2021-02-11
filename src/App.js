import * as React from 'react';
import { GlobalStyle } from './styles/global';
import { TrovThemeProvider } from './styles/theme-provider';
import { Header, Main } from './components/layout';
import { IncidentsProvider } from './state/incident-provider';

const App: React.FC = () => {
  return (
    <TrovThemeProvider>
      <GlobalStyle />
      <Header />
      <Main>
        <IncidentsProvider>
          <button>New Incident</button>
          <div>List goes here</div>
        </IncidentsProvider>
      </Main>
    </TrovThemeProvider>
  );
};

export default App;
