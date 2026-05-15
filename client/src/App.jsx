import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />

          {/* Saare pages ke routes yahan handle honge */}
          <Routes>
            <Route path="/" element={<Register to="/register" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute>
              < Dashboard />
            </ProtectedRoute>} />
          </Routes>

        </AuthProvider>
      </BrowserRouter>
    </>
  );
}


export default App
