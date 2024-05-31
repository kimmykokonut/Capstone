import './App.css'
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Header from './components/Header'
import TripControl from './components/TripControl';
import Footer from './components/Footer';

function App() {
  function ConditionalHeader() {
    const location = useLocation();
    return location.pathname !== '/' && <Header />;
  }

  return (
    <>
      <Router>
        <ConditionalHeader />
        <TripControl />
        <Footer />
      </Router>
    </>
  )
}

export default App
