import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { RoutineDetail } from './pages/RoutineDetail';
import { Login } from './components/Login';
import { useAuth } from './hooks/useAuth';
import { useRoutines } from './hooks/useRoutines';

type AppState = 
  | { view: 'home' }
  | { view: 'routine'; routineId: string };

function App() {
  const [appState, setAppState] = useState<AppState>({ view: 'home' });
  const { user, loading: authLoading, login, logout, isAuthenticated } = useAuth();
  const { loadDarioRoutines } = useRoutines();

  useEffect(() => {
    // Si el usuario es Dario, cargar sus rutinas predefinidas
    if (user === 'Dario') {
      loadDarioRoutines();
    }
  }, [user, loadDarioRoutines]);

  const navigateToRoutine = (routineId: string) => {
    setAppState({ view: 'routine', routineId });
  };

  const navigateToHome = () => {
    setAppState({ view: 'home' });
  };

  const handleLogin = (username: string) => {
    login(username);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      {appState.view === 'home' && (
        <Home 
          onRoutineSelect={navigateToRoutine}
          user={user}
          onLogout={logout}
        />
      )}
      
      {appState.view === 'routine' && (
        <RoutineDetail 
          routineId={appState.routineId}
          onBack={navigateToHome}
        />
      )}
    </div>
  );
}

export default App;
