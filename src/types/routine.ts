export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RoutineFormData {
  name: string;
  description?: string;
}

export interface ExerciseFormData {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}