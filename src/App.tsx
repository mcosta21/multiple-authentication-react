import { AppRoutes } from './routes/AppRoutes'
import { AuthProvider } from './context/Auth/AuthContext';
import './styles/styles.css';
import { LoadingProvider } from './context/LoadingContext';

export default function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </LoadingProvider>
  )
}