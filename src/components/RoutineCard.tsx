import type { Routine } from '../types/routine';
import { Card } from './ui/Card';

interface RoutineCardProps {
  routine: Routine;
  onClick: () => void;
  onDelete: () => void;
}

export function RoutineCard({ routine, onClick, onDelete }: RoutineCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Card onClick={onClick} className="animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {routine.name}
          </h3>
          {routine.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {routine.description}
            </p>
          )}
          <div className="flex items-center mt-3 space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {routine.exercises.length} ejercicios
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(routine.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="ml-3 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </Card>
  );
}