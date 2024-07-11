import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import WorkoutForm from './WorkoutForm';
import Graph from './Graph';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        
        <Routes>
          <Route path="/" element={<WorkoutForm />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;