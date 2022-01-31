import { AppRoutes } from './routes/AppRoutes'
import { AuthMethodProvider } from './context/AuthMethodContext';

export default function App() {
  return (
    <AuthMethodProvider>
        <AppRoutes />
    </AuthMethodProvider>
  )
}