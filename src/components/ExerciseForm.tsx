import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import type { ExerciseFormData } from '../types/routine';

interface ExerciseFormProps {
  initialData?: ExerciseFormData;
  onSubmit: (data: ExerciseFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ExerciseForm({ initialData, onSubmit, onCancel, loading = false }: ExerciseFormProps) {
  const [formData, setFormData] = useState<ExerciseFormData>({
    name: initialData?.name || '',
    sets: initialData?.sets || 3,
    reps: initialData?.reps || 10,
    weight: initialData?.weight || undefined,
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (formData.sets < 1) {
      newErrors.sets = 'Debe ser al menos 1 serie';
    }
    
    if (formData.reps < 1) {
      newErrors.reps = 'Debe ser al menos 1 repetición';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit({
      ...formData,
      weight: formData.weight || undefined,
      notes: formData.notes || undefined,
    });
  };

  const handleChange = (field: keyof ExerciseFormData, value: string | number | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nombre del ejercicio"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        placeholder="Ej: Press de banca"
        autoFocus
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Series"
          type="number"
          min="1"
          value={formData.sets}
          onChange={(e) => handleChange('sets', parseInt(e.target.value) || 0)}
          error={errors.sets}
        />
        
        <Input
          label="Repeticiones"
          type="number"
          min="1"
          value={formData.reps}
          onChange={(e) => handleChange('reps', parseInt(e.target.value) || 0)}
          error={errors.reps}
        />
      </div>
      
      <Input
        label="Peso (kg) - Opcional"
        type="number"
        min="0"
        step="0.5"
        value={formData.weight || ''}
        onChange={(e) => handleChange('weight', e.target.value ? parseFloat(e.target.value) : undefined)}
        placeholder="Ej: 80"
      />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Notas (opcional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Técnica, sensaciones, etc..."
          rows={3}
          className="input resize-none"
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="submit" loading={loading} className="flex-1">
          {initialData ? 'Actualizar' : 'Añadir ejercicio'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}