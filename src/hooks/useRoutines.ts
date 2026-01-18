import { useState, useEffect, useCallback } from 'react';
import type { Routine, Exercise } from '../types/routine';
import { storageService } from '../services/storage';

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoutines = () => {
      const savedRoutines = storageService.getRoutines();
      setRoutines(savedRoutines);
      setLoading(false);
    };

    loadRoutines();
  }, []);

  const addRoutine = useCallback((name: string, description?: string) => {
    const newRoutine: Routine = {
      id: crypto.randomUUID(),
      name,
      description,
      exercises: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    storageService.addRoutine(newRoutine);
    setRoutines(prev => [...prev, newRoutine]);
    return newRoutine;
  }, []);

  const updateRoutine = useCallback((routineId: string, updates: Partial<Routine>) => {
    setRoutines(prev => {
      const updated = prev.map(routine => 
        routine.id === routineId 
          ? { ...routine, ...updates, updatedAt: new Date() }
          : routine
      );
      
      const updatedRoutine = updated.find(r => r.id === routineId);
      if (updatedRoutine) {
        storageService.updateRoutine(updatedRoutine);
      }
      
      return updated;
    });
  }, []);

  const deleteRoutine = useCallback((routineId: string) => {
    storageService.deleteRoutine(routineId);
    setRoutines(prev => prev.filter(r => r.id !== routineId));
  }, []);

  const addExercise = useCallback((routineId: string, exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: crypto.randomUUID(),
    };

    setRoutines(prev => {
      const updated = prev.map(routine => 
        routine.id === routineId 
          ? { 
              ...routine, 
              exercises: [...routine.exercises, newExercise],
              updatedAt: new Date()
            }
          : routine
      );
      
      const updatedRoutine = updated.find(r => r.id === routineId);
      if (updatedRoutine) {
        storageService.updateRoutine(updatedRoutine);
      }
      
      return updated;
    });
  }, []);

  const updateExercise = useCallback((routineId: string, exerciseId: string, updates: Partial<Exercise>) => {
    setRoutines(prev => {
      const updated = prev.map(routine => 
        routine.id === routineId 
          ? {
              ...routine,
              exercises: routine.exercises.map(ex => 
                ex.id === exerciseId ? { ...ex, ...updates } : ex
              ),
              updatedAt: new Date()
            }
          : routine
      );
      
      const updatedRoutine = updated.find(r => r.id === routineId);
      if (updatedRoutine) {
        storageService.updateRoutine(updatedRoutine);
      }
      
      return updated;
    });
  }, []);

  const deleteExercise = useCallback((routineId: string, exerciseId: string) => {
    setRoutines(prev => {
      const updated = prev.map(routine => 
        routine.id === routineId 
          ? {
              ...routine,
              exercises: routine.exercises.filter(ex => ex.id !== exerciseId),
              updatedAt: new Date()
            }
          : routine
      );
      
      const updatedRoutine = updated.find(r => r.id === routineId);
      if (updatedRoutine) {
        storageService.updateRoutine(updatedRoutine);
      }
      
      return updated;
    });
  }, []);

  const getRoutineById = useCallback((id: string) => {
    return routines.find(r => r.id === id);
  }, [routines]);

  return {
    routines,
    loading,
    addRoutine,
    updateRoutine,
    deleteRoutine,
    addExercise,
    updateExercise,
    deleteExercise,
    getRoutineById,
  };
}