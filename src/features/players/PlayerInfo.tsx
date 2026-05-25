import { useGame } from '../../hooks/useGame';

export function PlayerInfo() {
  const { state } = useGame();

  if (state.result) return null;

  return (
    <div className="player-info">
      <span className={state.currentPlayer === 'X' ? 'active' : ''}>Player X</span>
      <span className="separator">|</span>
      <span className={state.currentPlayer === 'O' ? 'active' : ''}>Player O</span>
      <p className="turn-hint">Turn: {state.currentPlayer}</p>
    </div>
  );
}
