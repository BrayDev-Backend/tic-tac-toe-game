import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Board, Player, GameResult } from '../utils/gameLogic';
import { checkWinner, createEmptyBoard } from '../utils/gameLogic';

interface GameState {
  board: Board;
  currentPlayer: Player;
  result: GameResult;
}

type GameAction =
  | { type: 'MAKE_MOVE'; index: number }
  | { type: 'RESET_GAME' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MAKE_MOVE': {
      if (state.result || state.board[action.index] !== null) {
        return state;
      }

      const newBoard = [...state.board];
      newBoard[action.index] = state.currentPlayer;

      const result = checkWinner(newBoard);
      const nextPlayer: Player = state.currentPlayer === 'X' ? 'O' : 'X';

      return {
        board: newBoard,
        currentPlayer: result ? state.currentPlayer : nextPlayer,
        result,
      };
    }
    case 'RESET_GAME':
      return {
        board: createEmptyBoard(),
        currentPlayer: 'X',
        result: null,
      };
    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  makeMove: (index: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, {
    board: createEmptyBoard(),
    currentPlayer: 'X',
    result: null,
  });

  const makeMove = (index: number) => dispatch({ type: 'MAKE_MOVE', index });
  const resetGame = () => dispatch({ type: 'RESET_GAME' });

  return (
    <GameContext.Provider value={{ state, makeMove, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
