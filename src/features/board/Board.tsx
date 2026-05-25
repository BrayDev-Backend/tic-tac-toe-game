import { useGame } from '../../hooks/useGame';
import { Cell } from './Cell';

export function Board() {
  const { state, makeMove } = useGame();

  return (
    <div className="board">
      {state.board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => makeMove(index)}
          disabled={state.result !== null}
        />
      ))}
    </div>
  );
}
