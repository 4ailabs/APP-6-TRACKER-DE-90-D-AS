import React from 'react';
import { Stats as StatsType } from '../types';
import { Trophy, Flame, Calendar, Target } from 'lucide-react';

interface Props {
  stats: StatsType;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-3">
    <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
      {React.isValidElement(icon) 
        ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: `w-5 h-5 ${color.replace('bg-', 'text-')}` })
        : icon
      }
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const Stats: React.FC<Props> = ({ stats }) => {
  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-end mb-2">
          <span className="font-semibold text-gray-700">Progreso Total</span>
          <span className="text-2xl font-bold text-[#48bb78]">{stats.percentage}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-[#48bb78] h-3 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
        <div className="text-right mt-1 text-xs text-gray-400">{stats.completedCount} / 90 días</div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard 
          icon={<Flame />} 
          label="Racha Actual" 
          value={`${stats.currentStreak} días`} 
          color="bg-orange-500" 
        />
        <StatCard 
          icon={<Trophy />} 
          label="Racha Larga" 
          value={`${stats.longestStreak} días`} 
          color="bg-yellow-500" 
        />
        <StatCard 
          icon={<Target />} 
          label="Faltan" 
          value={`${90 - stats.completedCount} días`} 
          color="bg-blue-500" 
        />
        <StatCard 
          icon={<Calendar />} 
          label="Completados" 
          value={stats.completedCount} 
          color="bg-green-500" 
        />
      </div>
    </div>
  );
};

export default Stats;