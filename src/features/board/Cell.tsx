import type { CellValue } from '../../utils/gameLogic';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  disabled: boolean;
}

export function Cell({ value, onClick, disabled }: CellProps) {
  return (
    <button
      className="cell"
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={`Cell ${value ? `contains ${value}` : 'empty'}`}
    >
      {value}
    </button>
  );
}
