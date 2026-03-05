import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './page/main/HomePage';
import Lessons from './page/main/Lessons';
import Games from './page/main/Games';
import Leaderboard from './page/main/Liderboard';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/games" element={<Games />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;