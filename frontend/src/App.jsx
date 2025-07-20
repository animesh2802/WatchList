// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Movies from './pages/Movies';
import Shows from './pages/Shows';
import Watched from './pages/Watched';
import ToWatch from './pages/ToWatch';
import Details from './pages/Details';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/watched" element={<Watched />} />
        <Route path="/to-watch" element={<ToWatch />} />
        <Route path="/details/:media_type/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;