import * as React from 'react';
import { GlobalStyle } from './styles/global';
import { Header, Main } from './components/layout';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Main>
        <button>New Incident</button>
        <div>List goes here</div>
      </Main>
    </div>
  );
}

export default App;
