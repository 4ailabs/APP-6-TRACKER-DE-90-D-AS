import React from 'react';
import { UserConfig, DayData } from '../types';
import { RefreshCw } from 'lucide-react';

interface Props {
  config: UserConfig;
  days: DayData[];
  onReset: () => void;
}

const Header: React.FC<Props> = ({ config, days, onReset }) => {
  // Find current day number (first uncompleted day, or 90 if all done)
  // Or better: based on date vs start date
  const today = new Date();
  today.setHours(0,0,0,0);
  
  const currentDayObj = days.find(d => {
      const dDate = new Date(d.date);
      dDate.setHours(0,0,0,0);
      return dDate.getTime() === today.getTime();
  });
  
  // If we started in past, calculate diff. If we start in future, day 1.
  const startD = new Date(config.startDate);
  startD.setHours(0,0,0,0);
  const diffTime = Math.abs(today.getTime() - startD.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  let dayDisplay = currentDayObj ? currentDayObj.id : (today < startD ? 1 : Math.min(diffDays + 1, 90));
  if (dayDisplay > 90) dayDisplay = 90;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                DÍA {dayDisplay} / 90
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {new Date(config.startDate).toLocaleDateString()} - 
                {new Date(days[89]?.date).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              {config.pattern}
            </h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              Practicando: <span className="font-medium text-[#48bb78]">{config.tool}</span>
            </p>
          </div>
          
          <button 
            onClick={onReset}
            className="text-gray-400 hover:text-red-500 transition-colors p-2"
            title="Reiniciar tracker"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
