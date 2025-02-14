
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, X, Circle } from 'lucide-react';
import { toast } from 'sonner';

interface GameBoardProps {
  gameMode: 'pve' | 'pvp';
  difficulty?: 'easy' | 'medium' | 'hard' | null;
  onRestart: () => void;
}

type Cell = 'X' | 'O' | null;
type Winner = 'X' | 'O' | 'draw' | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const GameBoard = ({ gameMode, difficulty, onRestart }: GameBoardProps) => {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Winner>(null);

  const checkWinner = useCallback((squares: Cell[]): Winner => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Winner;
      }
    }
    return squares.every(square => square) ? 'draw' : null;
  }, []);

  const getAIMove = useCallback((squares: Cell[], difficulty: string): number => {
    const emptyCells = squares.reduce((acc: number[], cell, idx) => 
      cell === null ? [...acc, idx] : acc, []);

    if (difficulty === 'easy') {
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    // Medium and Hard difficulties use minimax with different depths
    const maxDepth = difficulty === 'medium' ? 2 : 5;

    const minimax = (board: Cell[], depth: number, isMax: boolean): number => {
      const result = checkWinner(board);
      if (result === 'O') return 10 - depth;
      if (result === 'X') return depth - 10;
      if (result === 'draw') return 0;
      if (depth >= maxDepth) return 0;

      const available = board.reduce((acc: number[], cell, idx) => 
        cell === null ? [...acc, idx] : acc, []);

      if (isMax) {
        let bestScore = -Infinity;
        for (const pos of available) {
          board[pos] = 'O';
          bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
          board[pos] = null;
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (const pos of available) {
          board[pos] = 'X';
          bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
          board[pos] = null;
        }
        return bestScore;
      }
    };

    let bestScore = -Infinity;
    let bestMove = emptyCells[0];

    for (const pos of emptyCells) {
      squares[pos] = 'O';
      const score = minimax(squares, 0, false);
      squares[pos] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = pos;
      }
    }

    return bestMove;
  }, [checkWinner]);

  const handleClick = useCallback((index: number) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      if (newWinner === 'draw') {
        toast("It's a draw!");
      } else {
        toast(`${newWinner} wins!`);
      }
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [board, currentPlayer, winner, checkWinner]);

  useEffect(() => {
    if (gameMode === 'pve' && currentPlayer === 'O' && !winner) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board, difficulty || 'easy');
        handleClick(aiMove);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameMode, currentPlayer, board, winner, difficulty, getAIMove, handleClick]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="space-y-6 animate-scale-in">
      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={!!winner || (gameMode === 'pve' && currentPlayer === 'O')}
            className={`h-24 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-200 flex items-center justify-center ${
              cell ? 'scale-100' : 'scale-95'
            }`}
          >
            {cell === 'X' && <X className="w-12 h-12 stroke-primary animate-scale-in" />}
            {cell === 'O' && <Circle className="w-12 h-12 stroke-primary animate-scale-in" />}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {winner
            ? winner === 'draw'
              ? "It's a draw!"
              : `${winner} wins!`
            : `Current player: ${currentPlayer}`}
        </p>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRestart}
          >
            Change Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
