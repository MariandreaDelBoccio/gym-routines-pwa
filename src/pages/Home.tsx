import { useState } from 'react';
import { useRoutines } from '../hooks/useRoutines';
import { RoutineCard } from '../components/RoutineCard';
import { RoutineForm } from '../components/RoutineForm';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import type { RoutineFormData } from '../types/routine';

interface HomeProps {
  onRoutineSelect: (routineId: string) => void;
}

export function Home({ onRoutineSelect }: HomeProps) {
  const { routines, loading, addRoutine, deleteRoutine } = useRoutines();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState<string | null>(null);

  const handleCreateRoutine = (data: RoutineFormData) => {
    addRoutine(data.name, data.description);
    setShowCreateModal(false);
  };

  const handleDeleteRoutine = (routineId: string) => {
    deleteRoutine(routineId);
    setRoutineToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Mis Rutinas
          </h1>
          <p className="text-gray-600">
            Gestiona tus entrenamientos de forma sencilla
          </p>
        </div>

        {/* Create Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="w-full flex justify-between"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva rutina
          </Button>
        </div>

        {/* Routines List */}
        {routines.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
            title="No tienes rutinas"
            description="Crea tu primera rutina para empezar a entrenar de forma organizada"
            actionLabel="Crear rutina"
            onAction={() => setShowCreateModal(true)}
          />
        ) : (
          <div className="space-y-4">
            {routines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onClick={() => onRoutineSelect(routine.id)}
                onDelete={() => setRoutineToDelete(routine.id)}
              />
            ))}
          </div>
        )}

        {/* Create Routine Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Nueva rutina"
        >
          <RoutineForm
            onSubmit={handleCreateRoutine}
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!routineToDelete}
          onClose={() => setRoutineToDelete(null)}
          title="Eliminar rutina"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              ¿Estás seguro de que quieres eliminar esta rutina? Esta acción no se puede deshacer.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="danger"
                onClick={() => routineToDelete && handleDeleteRoutine(routineToDelete)}
                className="flex-1"
              >
                Eliminar
              </Button>
              <Button
                variant="secondary"
                onClick={() => setRoutineToDelete(null)}
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