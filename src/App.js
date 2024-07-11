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
        <h2>
          <FontAwesomeIcon icon={faDumbbell} /> 筋トレ記録・分析アプリ
        </h2>
        <Routes>
          <Route path="/" element={<WorkoutForm />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
        <Link to="/graph">
          <FontAwesomeIcon icon={faChartLine} /> 進捗グラフを見る
        </Link>
      </div>
    </Router>
  );
}

export default App;