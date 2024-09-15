import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import ProtectedRoute from './Middlewares/ProtectedRoute';
import AuthRoutes from './Middlewares/AuthRoutes';


const routes = [
  {
    element: <App />,
    children: [
      {
        element:<AuthRoutes/>,
        children:[
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
        ]
      },

      {
        element: <ProtectedRoute />,

        children: [
          { path: "/", element: <Home /> },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);


createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
)
