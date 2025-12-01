import React, { useState } from 'react';
import { TOOL_OPTIONS } from '../constants';
import { Brain, ArrowRight } from 'lucide-react';

interface Props {
  onStart: (pattern: string, tool: string, startDate: string) => void;
}

const Onboarding: React.FC<Props> = ({ onStart }) => {
  const [pattern, setPattern] = useState('');
  const [selectedTool, setSelectedTool] = useState(TOOL_OPTIONS[0]);
  const [customTool, setCustomTool] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pattern) return;
    
    const finalTool = selectedTool === 'Otro' ? customTool : selectedTool;
    if (!finalTool) return;

    onStart(pattern, finalTool, startDate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tracker de 90 Días 🎯</h1>
          <p className="text-gray-600">El cambio neuroplástico requiere práctica consistente y deliberada.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué patrón estás cambiando?
            </label>
            <input
              type="text"
              required
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Ej. Procrastinación, Ansiedad social..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué herramienta vas a practicar?
            </label>
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white mb-2"
            >
              {TOOL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            
            {selectedTool === 'Otro' && (
              <input
                type="text"
                required
                value={customTool}
                onChange={(e) => setCustomTool(e.target.value)}
                placeholder="Escribe tu herramienta..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all animate-fade-in"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de inicio
            </label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#48bb78] hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Comenzar mis 90 días <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
