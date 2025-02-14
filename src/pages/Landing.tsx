
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/game');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="p-8 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight text-center text-gradient">
          MADE BY SAKSHYAM PAUDEL
        </h1>
      </Card>
    </div>
  );
};

export default Landing;
