import React from 'react';
import Confetti from 'react-confetti';
import { X } from 'lucide-react';

// Minimal window size hook implementation inside component to avoid external dep
const useSize = () => {
    const [windowSize, setWindowSize] = React.useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  
    React.useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
};

interface Props {
  message: string | null;
  onClose: () => void;
}

const Celebration: React.FC<Props> = ({ message, onClose }) => {
  const { width, height } = useSize();

  if (!message) return null;

  const isFinal = message.includes("90 días");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {isFinal && <Confetti width={width} height={height} numberOfPieces={500} recycle={false} />}
      
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform animate-bounce-in z-50">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-4xl mb-4 animate-bounce">
          {isFinal ? '🏆' : '⭐'}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Felicitaciones!</h2>
        <p className="text-lg text-gray-600 font-medium leading-relaxed">
          {message}
        </p>

        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-[#48bb78] text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-md"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Celebration;