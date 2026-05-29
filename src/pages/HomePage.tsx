import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

export function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <h1 className="title">Tic Tac Toe</h1>
      <p className="subtitle">A classic game for two players</p>
      <div className="rules">
        <h2>How to Play</h2>
        <ul>
          <li>The game is played on a 3x3 grid</li>
          <li>Players take turns placing X or O</li>
          <li>The first to get 3 in a row wins</li>
          <li>If all cells fill with no winner, it&apos;s a draw</li>
        </ul>
      </div>
      {user ? (
        <Button onClick={() => navigate('/game')}>Start Game</Button>
      ) : (
        <div className="home-actions">
          <Button onClick={() => navigate('/login')}>Login to Play</Button>
          <Button variant="secondary" onClick={() => navigate('/register')}>
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
