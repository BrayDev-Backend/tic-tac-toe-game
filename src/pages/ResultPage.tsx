import { useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { Button } from '../components/Button';

export function ResultPage() {
  const { state, resetGame } = useGame();
  const navigate = useNavigate();

  const handleNewGame = () => {
    resetGame();
    navigate('/game');
  };

  const handleHome = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="page result-page">
      <h1 className="title">Game Over</h1>
      <div className="result-message">
        {'winner' in (state.result || {}) ? (
          <p>Player {(state.result as { winner: string }).winner} wins!</p>
        ) : (
          <p>It's a draw!</p>
        )}
      </div>
      <div className="result-actions">
        <Button onClick={handleNewGame}>Play Again</Button>
        <Button variant="secondary" onClick={handleHome}>
          Home
        </Button>
      </div>
    </div>
  );
}
