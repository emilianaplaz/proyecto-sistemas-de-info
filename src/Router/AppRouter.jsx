import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login';
import Home from '../Pages/Home';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    // element: <LoginPage />,
    element: <Login />,
  }
]);