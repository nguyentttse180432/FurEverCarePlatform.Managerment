import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import UserPage from './pages/UserPage';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/users', element: <UserPage /> },
] as RouteObject[]);

export default router;