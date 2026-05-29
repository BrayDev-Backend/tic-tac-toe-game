import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import { Button } from '../components/Button';

export function ResultPage() {
  const { state, resetGame } = useGame();
  const { user } = useAuth();
  const navigate = useNavigate();
  const savedRef = useRef(false);

  useEffect(() => {
    if (state.result && user && !savedRef.current) {
      savedRef.current = true;
      const isWin = 'winner' in state.result;
      addDoc(collection(db, 'scores'), {
        winnerUid: user.uid,
        winnerName: user.displayName || user.email,
        result: isWin ? 'win' : 'draw',
        createdAt: serverTimestamp(),
      });
    }
  }, [state.result, user]);

  const handleNewGame = () => {
    savedRef.current = false;
    resetGame();
    navigate('/game');
  };

  const handleHome = () => {
    savedRef.current = false;
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
          <p>It&apos;s a draw!</p>
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
