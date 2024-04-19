import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'
import TripControl from './components/TripControl';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Router>
        <Header />
        <TripControl />
        <Footer />
      </Router>
    </>
  )
}

export default App
