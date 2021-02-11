import { GlobalStyle } from './styles/global';

import { Header } from './components/header';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <main>
        <button>New Incident</button>
        <div>List goes here</div>
      </main>
    </div>
  );
}

export default App;
