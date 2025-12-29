import { RouterProvider } from 'react-router-dom';
import { AllRouter } from './utils/Routes';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from 'sonner';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AllRouter} />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
