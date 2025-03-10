import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <Routes>
          <Route path="/instant-consultation" element={<InstantConsultation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
