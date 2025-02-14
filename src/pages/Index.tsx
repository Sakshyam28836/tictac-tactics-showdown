
import { useState } from 'react';
import GameBoard from '@/components/GameBoard';
import GameModeSelector from '@/components/GameModeSelector';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index = () => {
  const [gameMode, setGameMode] = useState<'pve' | 'pvp' | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [showModes, setShowModes] = useState(false);

  const handleModeSelect = (mode: 'pve' | 'pvp') => {
    setGameMode(mode);
    toast(`Selected ${mode === 'pve' ? 'Player vs AI' : 'Player vs Player'} mode`);
  };

  const handleDifficultySelect = (level: 'easy' | 'medium' | 'hard') => {
    setDifficulty(level);
    toast(`AI difficulty set to ${level}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-lg p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-center tracking-tight">Tic-Tac-Toe</h1>
        {!showModes ? (
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="w-48 h-16 text-lg"
              onClick={() => setShowModes(true)}
            >
              Start Game
            </Button>
          </div>
        ) : !gameMode ? (
          <GameModeSelector onSelect={handleModeSelect} />
        ) : gameMode === 'pve' && !difficulty ? (
          <div className="animate-slide-up">
            <h2 className="text-xl font-medium mb-4 text-center">Select AI Difficulty</h2>
            <div className="flex flex-col gap-3">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultySelect(level)}
                  className="px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors capitalize"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <GameBoard
            gameMode={gameMode}
            difficulty={difficulty}
            onRestart={() => {
              setGameMode(null);
              setDifficulty(null);
              setShowModes(false);
            }}
          />
        )}
      </Card>
      <footer className="mt-8 text-sm text-muted-foreground text-center">
        <p>© 2025 by Sakshyam Paudel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
