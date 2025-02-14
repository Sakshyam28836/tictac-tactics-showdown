
import { Button } from '@/components/ui/button';
import { User, Cpu } from 'lucide-react';

interface GameModeSelectorProps {
  onSelect: (mode: 'pve' | 'pvp') => void;
}

const GameModeSelector = ({ onSelect }: GameModeSelectorProps) => {
  return (
    <div className="space-y-6 animate-slide-up">
      <h2 className="text-xl font-medium text-center">Select Game Mode</h2>
      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onSelect('pve')}
          className="flex items-center justify-center gap-2 h-16"
        >
          <User className="w-5 h-5" />
          <span>vs</span>
          <Cpu className="w-5 h-5" />
          <span className="ml-2">Play against AI</span>
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => onSelect('pvp')}
          className="flex items-center justify-center gap-2 h-16"
        >
          <User className="w-5 h-5" />
          <span>vs</span>
          <User className="w-5 h-5" />
          <span className="ml-2">Play with Friend</span>
        </Button>
      </div>
    </div>
  );
};

export default GameModeSelector;
