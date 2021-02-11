import logo from './assets/trov_logo_blue.svg';
// import './App.css';

function App() {
  return (
    <div>
      <header>
        <img src={logo} alt="logo" />
      </header>
      <main>
        <button>New Incident</button>
        <div>List goes here</div>
      </main>
    </div>
  );
}

export default App;
