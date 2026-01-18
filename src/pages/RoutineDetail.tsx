import { useState, useEffect } from 'react';
import { useRoutines } from '../hooks/useRoutines';
import { ExerciseItem } from '../components/ExerciseItem';
import { ExerciseForm } from '../components/ExerciseForm';
import { RoutineForm } from '../components/RoutineForm';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import type { Exercise, ExerciseFormData, RoutineFormData } from '../types/routine';

interface RoutineDetailProps {
  routineId: string;
  onBack: () => void;
}

export function RoutineDetail({ routineId, onBack }: RoutineDetailProps) {
  const { 
    getRoutineById, 
    updateRoutine, 
    addExercise, 
    updateExercise, 
    deleteExercise 
  } = useRoutines();
  
  const [routine, setRoutine] = useState(() => getRoutineById(routineId));
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [showEditRoutine, setShowEditRoutine] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [exerciseToDelete, setExerciseToDelete] = useState<string | null>(null);

  useEffect(() => {
    const updatedRoutine = getRoutineById(routineId);
    setRoutine(updatedRoutine);
  }, [routineId, getRoutineById]);

  if (!routine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Rutina no encontrada</p>
          <Button onClick={onBack}>Volver</Button>
        </div>
      </div>
    );
  }

  const handleUpdateRoutine = (data: RoutineFormData) => {
    updateRoutine(routine.id, data);
    setShowEditRoutine(false);
  };

  const handleAddExercise = (data: ExerciseFormData) => {
    addExercise(routine.id, data);
    setShowAddExercise(false);
  };

  const handleUpdateExercise = (data: ExerciseFormData) => {
    if (editingExercise) {
      updateExercise(routine.id, editingExercise.id, data);
      setEditingExercise(null);
    }
  };

  const handleDeleteExercise = (exerciseId: string) => {
    deleteExercise(routine.id, exerciseId);
    setExerciseToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {routine.name}
            </h1>
            {routine.description && (
              <p className="text-sm text-gray-600 truncate">
                {routine.description}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowEditRoutine(true)}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors ml-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>

        {/* Add Exercise Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowAddExercise(true)}
            className="w-full flex justify-between"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Añadir ejercicio
          </Button>
        </div>

        {/* Exercises List */}
        {routine.exercises.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            }
            title="No hay ejercicios"
            description="Añade ejercicios a tu rutina para empezar a entrenar"
            actionLabel="Añadir ejercicio"
            onAction={() => setShowAddExercise(true)}
          />
        ) : (
          <div className="space-y-4">
            {routine.exercises.map((exercise) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                onEdit={() => setEditingExercise(exercise)}
                onDelete={() => setExerciseToDelete(exercise.id)}
              />
            ))}
          </div>
        )}

        {/* Add Exercise Modal */}
        <Modal
          isOpen={showAddExercise}
          onClose={() => setShowAddExercise(false)}
          title="Nuevo ejercicio"
        >
          <ExerciseForm
            onSubmit={handleAddExercise}
            onCancel={() => setShowAddExercise(false)}
          />
        </Modal>

        {/* Edit Exercise Modal */}
        <Modal
          isOpen={!!editingExercise}
          onClose={() => setEditingExercise(null)}
          title="Editar ejercicio"
        >
          {editingExercise && (
            <ExerciseForm
              initialData={editingExercise}
              onSubmit={handleUpdateExercise}
              onCancel={() => setEditingExercise(null)}
            />
          )}
        </Modal>

        {/* Edit Routine Modal */}
        <Modal
          isOpen={showEditRoutine}
          onClose={() => setShowEditRoutine(false)}
          title="Editar rutina"
        >
          <RoutineForm
            initialData={routine}
            onSubmit={handleUpdateRoutine}
            onCancel={() => setShowEditRoutine(false)}
          />
        </Modal>

        {/* Delete Exercise Confirmation Modal */}
        <Modal
          isOpen={!!exerciseToDelete}
          onClose={() => setExerciseToDelete(null)}
          title="Eliminar ejercicio"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              ¿Estás seguro de que quieres eliminar este ejercicio?
            </p>
            <div className="flex space-x-3">
              <Button
                variant="danger"
                onClick={() => exerciseToDelete && handleDeleteExercise(exerciseToDelete)}
                className="flex-1"
              >
                Eliminar
              </Button>
              <Button
                variant="secondary"
                onClick={() => setExerciseToDelete(null)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}