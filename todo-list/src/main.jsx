import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './routes/HomePage.jsx'
import TaskPage from './routes/TaskPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><HomePage /></ProtectedRoute>
  },
  {
    path: "/tasks",
    element: <ProtectedRoute><TaskPage /></ProtectedRoute>
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
   path: "/login",
   element: <LoginPage/> 
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
