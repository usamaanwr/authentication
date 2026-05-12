import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"
import { useAuth } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  
  const successMsg = location.state?.message || ""
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await axiosInstance.post("/user/login", { email, password })
      const userData = res.data?.data?.user
      login(userData) // Context mein user set karo
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">

                {successMsg && (
                  <div className="alert alert-success py-2 text-sm mb-2">
                    {successMsg}
                  </div>
                )}

                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div>
                  <a className="link link-hover text-sm">Forgot password?</a>
                </div>

                {error && (
                  <div className="alert alert-error py-2 text-sm mt-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-neutral mt-4 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Login"
                  )}
                </button>

                <p className="text-center text-sm mt-2">
                  Don't have an account?{" "}
                  <Link to="/register" className="link link-primary">
                    Register here
                  </Link>
                </p>

              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login