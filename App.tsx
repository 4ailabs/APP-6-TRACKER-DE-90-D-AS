import React from 'react';
import { useTracker } from './hooks/useTracker';
import Onboarding from './components/Onboarding';
import Grid from './components/Grid';
import Header from './components/Header';
import Stats from './components/Stats';
import Celebration from './components/Celebration';
import PhasesLegend from './components/PhasesLegend';

const App: React.FC = () => {
  const { 
    state, 
    stats, 
    startTracker, 
    toggleDay, 
    resetTracker,
    celebrationMessage,
    clearMessage
  } = useTracker();

  if (!state.config.isConfigured) {
    return <Onboarding onStart={startTracker} />;
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-12">
      <Header 
        config={state.config} 
        days={state.days} 
        onReset={resetTracker} 
      />

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-8">
        
        {/* Top Stats Overview */}
        <Stats stats={stats} />

        {/* The Grid */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-semibold text-gray-800 mb-4">Tu Calendario de Progreso</h3>
           <Grid days={state.days} onToggle={toggleDay} />
           <PhasesLegend />
        </div>

      </main>

      <Celebration 
        message={celebrationMessage} 
        onClose={clearMessage} 
      />
    </div>
  );
};

export default App;
