import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import {Toaster} from "react-hot-toast"
function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster 
          position="top-center" 
          reverseOrder={false} 
          toastOptions={{
            // Agar aap chaho toh yahan default duration set kar sakte ho (e.g., 3 seconds)
            duration: 3000,
          }}
        />
        <AuthProvider>
          <Navbar />

          {/* Saare pages ke routes yahan handle honge */}
          <Routes>
            <Route path="/" element={<Register />} />
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
