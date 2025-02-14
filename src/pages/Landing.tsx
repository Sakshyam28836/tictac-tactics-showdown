
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="p-8 space-y-6 max-w-lg w-full mx-4 animate-fade-in shadow-lg border-2">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            MADE BY SAKSHYAM PAUDEL
          </h1>
          <div className="space-y-2 text-muted-foreground">
            <p className="text-lg font-medium">Class 10 'C' Student</p>
            <p className="text-base">Made using HTML, React, and TypeScript</p>
            <p className="text-base">Supported and guided by Rakesh Sir</p>
          </div>
        </div>
        <Button 
          className="w-full text-lg h-12 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-md" 
          onClick={() => navigate('/game')}
        >
          Start Game
        </Button>
        <footer className="text-sm text-muted-foreground text-center pt-4 border-t">
          <p>© {new Date().getFullYear()} Sakshyam Paudel. All rights reserved.</p>
        </footer>
      </Card>
    </div>
  );
};

export default Landing;
