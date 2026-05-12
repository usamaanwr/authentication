import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8">
      {/* Brand */}
      <div className="navbar-start">
        <Link to="/register" className="btn btn-ghost text-xl font-bold text-emerald-600">
          Auth
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex"></div>

      {/* End Section */}
      <div className="navbar-end gap-3">

        {/* Agar user login nahi hai — Login + Register dikhao */}
        {!user ? (
          <>
            <Link
              to="/login"
              className="btn btn-ghost text-emerald-600 border border-emerald-600 hover:bg-emerald-50 px-6"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-emerald-600 text-white hover:bg-emerald-700 px-6 border-none"
            >
              Register
            </Link>
          </>
        ) : (
          /* Agar user login hai — Avatar + Logout dikhao */
          <>
            <div className="avatar">
              {/* <div className="w-9 rounded-full ring ring-emerald-500 ring-offset-2">
                <img src={user?.avatar} alt="avatar" />
              </div> */}
            </div>
            {/* <span className="text-sm font-medium hidden sm:block">
              @{user?.username}
            </span> */}
            <button
              onClick={handleLogout}
              className="btn btn-error btn-sm"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default Navbar;