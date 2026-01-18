import type { Routine } from '../types/routine';

const STORAGE_KEY = 'gym-routines';

export const storageService = {
  getRoutines(): Routine[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const routines = JSON.parse(data);
      return routines.map((routine: any) => ({
        ...routine,
        createdAt: new Date(routine.createdAt),
        updatedAt: new Date(routine.updatedAt),
      }));
    } catch (error) {
      console.error('Error loading routines:', error);
      return [];
    }
  },

  saveRoutines(routines: Routine[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
    } catch (error) {
      console.error('Error saving routines:', error);
    }
  },

  addRoutine(routine: Routine): void {
    const routines = this.getRoutines();
    routines.push(routine);
    this.saveRoutines(routines);
  },

  updateRoutine(updatedRoutine: Routine): void {
    const routines = this.getRoutines();
    const index = routines.findIndex(r => r.id === updatedRoutine.id);
    if (index !== -1) {
      routines[index] = updatedRoutine;
      this.saveRoutines(routines);
    }
  },

  deleteRoutine(routineId: string): void {
    const routines = this.getRoutines();
    const filtered = routines.filter(r => r.id !== routineId);
    this.saveRoutines(filtered);
  },

  getRoutineById(id: string): Routine | undefined {
    const routines = this.getRoutines();
    return routines.find(r => r.id === id);
  }
};