import { useState } from 'react';
import { Home } from './pages/Home';
import { RoutineDetail } from './pages/RoutineDetail';

type AppState = 
  | { view: 'home' }
  | { view: 'routine'; routineId: string };

function App() {
  const [appState, setAppState] = useState<AppState>({ view: 'home' });

  const navigateToRoutine = (routineId: string) => {
    setAppState({ view: 'routine', routineId });
  };

  const navigateToHome = () => {
    setAppState({ view: 'home' });
  };

  return (
    <div className="app">
      {appState.view === 'home' && (
        <Home onRoutineSelect={navigateToRoutine} />
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
