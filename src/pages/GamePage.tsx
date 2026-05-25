import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { Board } from '../features/board/Board';
import { PlayerInfo } from '../features/players/PlayerInfo';
import { Button } from '../components/Button';

export function GamePage() {
  const { state, resetGame } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.result) {
      navigate('/result');
    }
  }, [state.result, navigate]);

  return (
    <div className="page game-page">
      <h1 className="title">Tic Tac Toe</h1>
      <PlayerInfo />
      <Board />
      <Button variant="secondary" onClick={resetGame}>
        Restart
      </Button>
    </div>
  );
}
