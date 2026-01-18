import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 ease-out';
  const interactiveClasses = onClick ? 'hover:shadow-md hover:border-gray-200 cursor-pointer active:scale-[0.98]' : '';

  return (
    <div 
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}