import './index.css';
import PrivateRoutes from './components/privateRoutes';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContextProvider';

export default function App() {

  console.log('Rendering App');

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
            <PrivateRoutes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
