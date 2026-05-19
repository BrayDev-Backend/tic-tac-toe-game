export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];
export type GameResult = { winner: Player } | { draw: true } | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board: Board): GameResult {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player };
    }
  }

  if (board.every((cell) => cell !== null)) {
    return { draw: true };
  }

  return null;
}

export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}
