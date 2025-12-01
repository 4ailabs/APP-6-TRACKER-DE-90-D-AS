import React from 'react';
import { PHASES } from '../constants';

const PhasesLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-6 justify-center text-xs md:text-sm text-gray-500">
      {PHASES.map((phase) => (
        <div key={phase.name} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full border-2 ${phase.colorClass.replace('border', 'bg').replace('400', '500').replace('500', '500')}`}></div>
          <span className={phase.textClass.replace('600', '700')}>{phase.name}</span>
        </div>
      ))}
    </div>
  );
};

export default PhasesLegend;
