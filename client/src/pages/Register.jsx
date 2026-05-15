import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"
import { registerSchema } from "../validations/registerSchema"

function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    // Avatar check
    if (!avatar) {
      return setErrors({ avatar: "Avatar image is required!" })
    }

    // Yup validation
    try {
      await registerSchema.validate(
        { fullName, username, email, password },
        { abortEarly: false }
      )
    } catch (err) {
      const fieldErrors = {}
      err.inner.forEach((e) => {
        fieldErrors[e.path] = e.message
      })
      return setErrors(fieldErrors)
    }

    // API call
    setLoading(true)
    const formData = new FormData()
    formData.append("fullName", fullName)
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("avatar", avatar)

    try {
      await axiosInstance.post("/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      navigate("/login", {
        // state: { message: "Registration successful! Please login." }
      })
    } catch (err) {
      // console.log("backend error" , err.response.data);
      setErrors({
        api: err.response?.data?.message || "Something went wrong!"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
  <h1 className="text-5xl font-bold">Register now!</h1>
  <p className="py-6">
    Don't miss out on the latest updates and exclusive offers. 
    Sign up today and get the most out of our platform.
  </p>
</div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">

                {/* API Error */}
                {errors.api && (
                  <div className="alert alert-error py-2 text-sm mb-2">
                    {errors.api}
                  </div>
                )}

                {/* Full Name */}
                <label className="label">Full Name</label>
                <input
                  type="text"
                  className={`input w-full ${errors.fullName ? "input-error" : ""}`}
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && (
                  <p className="text-error text-xs mt-1">{errors.fullName}</p>
                )}

                {/* Username */}
                <label className="label">Username</label>
                <input
                  type="text"
                  className={`input w-full ${errors.username ? "input-error" : ""}`}
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <p className="text-error text-xs mt-1">{errors.username}</p>
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-error text-xs mt-1">{errors.password}</p>
                )}

                {/* Avatar */}
                <label className="label">Upload your image</label>
                <input
                  type="file"
                  accept="image/*"
                  className={`file-input file-input-ghost w-full ${errors.avatar ? "file-input-error" : ""}`}
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                {errors.avatar && (
                  <p className="text-error text-xs mt-1">{errors.avatar}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-neutral mt-4 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : "Register"}
                </button>

                <p className="text-center text-sm mt-2">
                  Already have an account?{" "}
                  <Link to="/login" className="link link-primary">
                    Login here
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

export default Register