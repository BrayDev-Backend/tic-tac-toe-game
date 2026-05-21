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
