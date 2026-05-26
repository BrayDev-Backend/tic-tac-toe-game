import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from '../context/GameContext';
import { HomePage } from '../pages/HomePage';
import { GamePage } from '../pages/GamePage';
import { ResultPage } from '../pages/ResultPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}
