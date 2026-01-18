# Gym Routines - Aplicación de Rutinas de Gimnasio

Una aplicación web moderna, minimalista y mobile-first para crear y gestionar rutinas de gimnasio. Desarrollada con React, TypeScript, Vite y Tailwind CSS.

## ✨ Características

- **Mobile-first**: Diseñada primero para móviles con excelente experiencia en tablet y desktop
- **PWA**: Instalable como aplicación nativa en dispositivos móviles
- **Offline**: Funciona sin conexión usando localStorage
- **Minimalista**: Interfaz limpia inspirada en Linear, Apple Fitness y Notion
- **TypeScript**: Código completamente tipado para mayor robustez
- **Responsive**: Se adapta perfectamente a cualquier tamaño de pantalla

## 🚀 Funcionalidades

### Gestión de Rutinas
- ✅ Crear rutinas personalizadas
- ✅ Editar nombre y descripción
- ✅ Eliminar rutinas con confirmación
- ✅ Vista de lista con información resumida

### Gestión de Ejercicios
- ✅ Añadir ejercicios a las rutinas
- ✅ Definir series, repeticiones y peso
- ✅ Añadir notas personalizadas
- ✅ Editar y eliminar ejercicios

### Persistencia
- ✅ Almacenamiento local (localStorage)
- ✅ No requiere backend ni login
- ✅ Datos persistentes entre sesiones

## 🛠️ Stack Técnico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.x
- **State Management**: React Hooks + Context
- **Storage**: localStorage
- **PWA**: Service Worker + Web App Manifest

## 📱 Instalación y Uso

### Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la build
npm run preview
```

### Como PWA

1. Abre la aplicación en tu navegador móvil
2. Busca la opción "Añadir a pantalla de inicio" o "Instalar app"
3. La aplicación se instalará como una app nativa

## 🎨 Diseño

### Paleta de Colores
- **Primario**: Verde fitness (#22c55e)
- **Fondo**: Gris muy claro (#f9fafb)
- **Texto**: Gris oscuro (#111827)
- **Bordes**: Gris suave (#e5e7eb)

### Tipografía
- **Fuente**: System font stack (-apple-system, BlinkMacSystemFont, Inter)
- **Jerarquía**: Clara diferenciación de tamaños
- **Peso**: Medium para botones, semibold para títulos

### UX/UI
- **Botones grandes**: Fácil uso con una mano
- **Espaciado generoso**: Mucho aire entre elementos
- **Bordes suaves**: rounded-xl en todos los componentes
- **Transiciones**: Suaves y naturales (200ms ease-out)
- **Estados vacíos**: Bien diseñados con call-to-action

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/                 # Componentes base reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── EmptyState.tsx      # Estado vacío
│   ├── ExerciseForm.tsx    # Formulario de ejercicios
│   ├── ExerciseItem.tsx    # Item de ejercicio
│   ├── RoutineCard.tsx     # Tarjeta de rutina
│   └── RoutineForm.tsx     # Formulario de rutinas
├── hooks/
│   ├── useLocalStorage.ts  # Hook para localStorage
│   └── useRoutines.ts      # Hook principal de rutinas
├── pages/
│   ├── Home.tsx           # Página principal
│   └── RoutineDetail.tsx  # Detalle de rutina
├── services/
│   └── storage.ts         # Servicio de almacenamiento
├── types/
│   └── routine.ts         # Tipos TypeScript
├── App.tsx               # Componente principal
├── main.tsx             # Punto de entrada
└── index.css           # Estilos globales
```

## 🔧 Decisiones Arquitectónicas

### Gestión de Estado
- **React Hooks**: useState, useEffect, useCallback para estado local
- **Custom Hooks**: useRoutines para lógica de negocio centralizada
- **No Redux**: Evitado por simplicidad, el estado es manejable con hooks

### Persistencia
- **localStorage**: Solución simple y efectiva para datos locales
- **Servicio dedicado**: storage.ts abstrae la lógica de persistencia
- **Tipado completo**: Todos los datos están tipados correctamente

### Componentes
- **Funcionales**: Solo componentes funcionales con hooks
- **Pequeños**: Ningún archivo supera 350 líneas
- **Reutilizables**: Componentes UI base en carpeta ui/
- **Separación clara**: UI separada de lógica de negocio

### Styling
- **Tailwind CSS**: Utility-first para desarrollo rápido
- **Componentes CSS**: Clases personalizadas para patrones comunes
- **Mobile-first**: Breakpoints pensados desde móvil hacia desktop

## 📱 PWA Features

- **Manifest**: Configurado para instalación nativa
- **Service Worker**: Cache básico para funcionamiento offline
- **Iconos**: SVG escalable para todos los tamaños
- **Tema**: Colores consistentes con la marca

## 🎯 Próximas Mejoras

- [ ] Importar/exportar rutinas
- [ ] Temporizador de descanso
- [ ] Historial de entrenamientos
- [ ] Gráficos de progreso
- [ ] Rutinas predefinidas
- [ ] Modo oscuro

## 📄 Licencia

MIT License - Siéntete libre de usar este código para tus proyectos.