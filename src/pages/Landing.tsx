
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="p-8 space-y-6 max-w-lg w-full mx-4 animate-fade-in">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            MADE BY SAKSHYAM PAUDEL
          </h1>
          <div className="space-y-2 text-muted-foreground">
            <p>Class 10 'C' Student</p>
            <p>Made using HTML, React, and TypeScript</p>
            <p>Supported and guided by Rakesh Sir</p>
          </div>
        </div>
        <Button 
          className="w-full text-lg h-12" 
          onClick={() => navigate('/game')}
        >
          Start Game
        </Button>
      </Card>
    </div>
  );
};

export default Landing;
