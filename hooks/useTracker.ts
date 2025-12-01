import { useState, useEffect, useMemo } from 'react';
import { AppState, DayData, UserConfig, Stats } from '../types';
import { APP_STORAGE_KEY } from '../constants';

const getInitialDays = (startDateStr: string): DayData[] => {
  const startDate = new Date(startDateStr);
  return Array.from({ length: 90 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    d.setHours(0, 0, 0, 0); // Normalize time
    return {
      id: i + 1,
      date: d.toISOString(),
      completed: false,
    };
  });
};

const initialState: AppState = {
  config: {
    pattern: '',
    tool: '',
    startDate: '',
    isConfigured: false,
  },
  days: [],
};

export const useTracker = () => {
  const [state, setState] = useState<AppState>(initialState);
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure days exist if configured (migration or safety check)
        if (parsed.config.isConfigured && (!parsed.days || parsed.days.length === 0)) {
           parsed.days = getInitialDays(parsed.config.startDate);
        }
        setState(parsed);
      } catch (e) {
        console.error("Error parsing saved state", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (state.config.isConfigured) {
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const startTracker = (pattern: string, tool: string, startDate: string) => {
    const newDays = getInitialDays(startDate);
    setState({
      config: {
        pattern,
        tool,
        startDate,
        isConfigured: true,
      },
      days: newDays,
    });
  };

  const toggleDay = (dayId: number) => {
    const dayIndex = state.days.findIndex(d => d.id === dayId);
    if (dayIndex === -1) return;

    const day = state.days[dayIndex];
    const dayDate = new Date(day.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Prevent clicking future days
    if (dayDate > today) {
      alert("No puedes marcar días futuros. ¡Paciencia!");
      return;
    }

    const isCompleting = !day.completed;

    if (!isCompleting) {
      if (!window.confirm("¿Seguro que quieres desmarcar este día?")) {
        return;
      }
    }

    const newDays = [...state.days];
    newDays[dayIndex] = { ...day, completed: isCompleting };

    setState(prev => ({ ...prev, days: newDays }));

    // Milestone Messages
    if (isCompleting) {
      checkMilestones(dayId);
    }
  };

  const checkMilestones = (dayId: number) => {
    if (dayId === 1) setCelebrationMessage("¡Primer día! El viaje de 90 días comienza. 🚀");
    else if (dayId === 7) setCelebrationMessage("¡Una semana! Tu cerebro está empezando a notar la diferencia. 🌱");
    else if (dayId === 30) setCelebrationMessage("¡Fase 1 completa! El hábito se está formando. 🧱");
    else if (dayId === 60) setCelebrationMessage("¡Fase 2 completa! Tus circuitos neuronales se fortalecen. ⚡");
    else if (dayId === 90) setCelebrationMessage("¡LO LOGRASTE! 90 días de práctica. Tu cerebro ha cambiado. 🎉");
  };

  const resetTracker = () => {
    if (window.confirm("¿Estás seguro de que quieres reiniciar? Perderás todo tu progreso actual.")) {
      localStorage.removeItem(APP_STORAGE_KEY);
      setState(initialState);
      window.location.reload();
    }
  };

  const stats: Stats = useMemo(() => {
    const completedCount = state.days.filter(d => d.completed).length;
    const percentage = Math.round((completedCount / 90) * 100);

    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // To calc current streak accurately, we look backwards from yesterday or today
    // But simplistic approach: iterate all days, reset on false.
    // However, if I missed yesterday, current streak is 0. 
    // Let's do a robust simple pass for Longest, and a specific check for Current.
    
    // Sort just in case
    const sortedDays = [...state.days].sort((a, b) => a.id - b.id);
    
    // Longest Streak
    for (const day of sortedDays) {
      const dayDate = new Date(day.date);
      const today = new Date();
      today.setHours(0,0,0,0);
      
      // Stop calculating longest streak based on future days, they shouldn't break it yet,
      // but simplistic logic: only count streaks of completed days.
      if (day.completed) {
        tempStreak++;
      } else {
        if (tempStreak > longestStreak) longestStreak = tempStreak;
        tempStreak = 0;
      }
    }
    if (tempStreak > longestStreak) longestStreak = tempStreak;

    // Current Streak logic: Backwards from Today
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Check if today is completed
    const todayIndex = sortedDays.findIndex(d => new Date(d.date).getTime() === today.getTime());
    
    let searchIndex = todayIndex;
    
    // If today is future (user picked start date in future), streak is 0
    if (searchIndex !== -1) {
       // If today is not completed, check yesterday. If yesterday is not completed, streak is 0.
       if (!sortedDays[searchIndex].completed) {
         searchIndex--;
       }
       
       while (searchIndex >= 0 && sortedDays[searchIndex].completed) {
         currentStreak++;
         searchIndex--;
       }
    }

    return {
      completedCount,
      percentage,
      currentStreak,
      longestStreak
    };
  }, [state.days]);

  return {
    state,
    stats,
    startTracker,
    toggleDay,
    resetTracker,
    celebrationMessage,
    clearMessage: () => setCelebrationMessage(null)
  };
};
