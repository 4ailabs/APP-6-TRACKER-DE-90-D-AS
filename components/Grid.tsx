import React from 'react';
import { DayData } from '../types';
import { PHASES } from '../constants';
import { Check, Lock } from 'lucide-react';

interface Props {
  days: DayData[];
  onToggle: (id: number) => void;
}

const Grid: React.FC<Props> = ({ days, onToggle }) => {
  const getPhaseColor = (id: number) => {
    const phase = PHASES.find(p => id >= p.start && id <= p.end);
    return phase ? phase.colorClass : 'border-gray-200';
  };
  
  const getPhaseBg = (id: number) => {
      const phase = PHASES.find(p => id >= p.start && id <= p.end);
      return phase ? phase.bgClass : '';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-10 gap-2 sm:gap-3 mb-8">
      {days.map((day) => {
        const dayDate = new Date(day.date);
        dayDate.setHours(0, 0, 0, 0);
        
        const isFuture = dayDate > today;
        const isCompleted = day.completed;
        const borderColor = getPhaseColor(day.id);
        const phaseBg = getPhaseBg(day.id);

        let statusClasses = '';
        let content = <span className="text-xs sm:text-sm text-gray-400 font-medium">{day.id}</span>;

        if (isCompleted) {
          statusClasses = 'bg-[#48bb78] border-[#48bb78] text-white shadow-md transform scale-105';
          content = <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />;
        } else if (isFuture) {
          statusClasses = `bg-gray-100 border-gray-200 cursor-not-allowed opacity-60`;
          content = (
            <div className="flex flex-col items-center">
               <span className="text-[10px] text-gray-400 mb-0.5">{day.id}</span>
               <Lock className="w-3 h-3 text-gray-300" />
            </div>
          );
        } else {
          // Available
          statusClasses = `bg-white ${borderColor} hover:border-green-400 hover:shadow-md cursor-pointer ${phaseBg}`;
          content = <span className={`text-sm font-semibold ${isCompleted ? 'text-white' : 'text-gray-600'}`}>{day.id}</span>;
        }

        return (
          <div
            key={day.id}
            onClick={() => onToggle(day.id)}
            className={`
              aspect-square rounded-lg border-2 flex items-center justify-center transition-all duration-200
              ${statusClasses}
            `}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
