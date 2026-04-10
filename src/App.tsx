import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { EventSearchPage } from './pages/EventSearchPage';
import { EventDetailPage } from './pages/EventDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<EventSearchPage />} />
            <Route path="/event/:eventId" element={<EventDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

