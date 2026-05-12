import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  
  return user ? children : <Navigate to="/login" />
}