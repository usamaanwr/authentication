// pages/Dashboard.jsx
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"

function Dashboard() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">

      <div className="max-w-3xl mx-auto p-6">

        {/* Welcome Card */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body items-center text-center">
            <div className="avatar mb-2">
              <div className="w-24 rounded-full ring ring-primary ring-offset-2">
                <img src={user?.avatar} alt="avatar" />
              </div>
            </div>
            <h2 className="card-title text-2xl">
              Welcome, {user?.fullName}!
            </h2>
            <p className="text-base-content/60">@{user?.username}</p>
          </div>
        </div>

        {/* User Details Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title mb-4">Your Profile</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-xs text-base-content/50 uppercase tracking-wider mb-1">
                  Full Name
                </p>
                <p className="font-semibold">{user?.fullName}</p>
              </div>

              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-xs text-base-content/50 uppercase tracking-wider mb-1">
                  Username
                </p>
                <p className="font-semibold">@{user?.username}</p>
              </div>

              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-xs text-base-content/50 uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="font-semibold">{user?.email}</p>
              </div>

              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-xs text-base-content/50 uppercase tracking-wider mb-1">
                  Account Status
                </p>
                <span className="badge badge-success">Active</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard