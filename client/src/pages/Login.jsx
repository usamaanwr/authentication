import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"
import { useAuth } from "../context/AuthContext"
import { loginSchema } from "../validations/loginSchema"

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [successToast, setSuccessToast] = useState("")
 useEffect(() => {
  if (location.state?.message) {
    setSuccessToast(location.state.message)
    setTimeout(() => setSuccessToast(""), 3000)
    navigate(location.pathname, { replace: true, state: {} })
  }
}, [location.state?.message])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    try {
      await loginSchema.validate(
        { email, password },
        { abortEarly: false }
      )
    } catch (err) {
      const fieldErrors = {}
      err.inner.forEach((e) => {
        fieldErrors[e.path] = e.message
      })
      return setErrors(fieldErrors) 
    }

    setLoading(true)
    try {
      const res = await axiosInstance.post("/user/login", { email, password })
      const userData = res.data?.data?.user
      login(userData)
      navigate("/dashboard")
    } catch (err) {
      console.log(err) // ← yeh add karo

      setErrors({ api: err.response?.data?.message || "Something went wrong!" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome Back!</h1>
          <p className="py-6">
            Log in to your account to access your dashboard, manage your projects,
            and stay connected with your team.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">

                {successToast && (
                  <div className="toast toast-top toast-end z-50">
                    <div className="alert alert-success">
                      <span>{successToast}</span>
                    </div>
                  </div>
                )}

                {/* API Error */}
                {errors.api && (
                  <div className="alert alert-error py-2 text-sm mb-2">
                    {errors.api}
                  </div>
                )}

                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className={`input w-full ${errors.email ? "input-error" : ""}`}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-error text-xs mt-1">{errors.email}</p>
                )}

                {/* Password */}
                <label className="label">Password</label>
                <input
                  type="password"
                  className={`input w-full ${errors.password ? "input-error" : ""}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-error text-xs mt-1">{errors.password}</p>
                )}

                <div>
                  <a className="link link-hover text-sm">Forgot password?</a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-neutral mt-4 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : "Login"}
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