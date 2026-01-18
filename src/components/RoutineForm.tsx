import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import type { RoutineFormData } from '../types/routine';

interface RoutineFormProps {
  initialData?: RoutineFormData;
  onSubmit: (data: RoutineFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function RoutineForm({ initialData, onSubmit, onCancel, loading = false }: RoutineFormProps) {
  const [formData, setFormData] = useState<RoutineFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit(formData);
  };

  const handleChange = (field: keyof RoutineFormData, value: string) => {
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
        label="Nombre de la rutina"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        placeholder="Ej: Rutina de pecho y tríceps"
        autoFocus
      />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Descripción (opcional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe tu rutina..."
          rows={3}
          className="input resize-none"
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="submit" loading={loading} className="flex-1">
          {initialData ? 'Actualizar' : 'Crear rutina'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}