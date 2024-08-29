import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
const LoginPage = lazy(() => import('./pages/Login-Page'));
const RegisterPage = lazy(() => import('./pages/Register-Page'));
const TaskPage = lazy(() => import('./pages/Task-Page'));


const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  return auth.token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth.token ? <Navigate to="/tasks" /> : children;
};



function index() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <PrivateRoute>
                    <TaskPage />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/tasks" />} />
            </Routes>
          </Suspense>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default index;
