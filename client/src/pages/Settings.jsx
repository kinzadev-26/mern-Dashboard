import { useState } from 'react'
import { User, Lock, Bell } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'

const Settings = () => {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [notifications, setNotifications] = useState({ email: true, push: false })

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-purple-600" />
            <h2 className="font-bold text-gray-800">Profile Information</h2>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2.5 rounded-xl hover:opacity-90 transition">
              Save Changes
            </button>
          </div>
        </div>

        {/* Password Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} className="text-purple-600" />
            <h2 className="font-bold text-gray-800">Change Password</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2.5 rounded-xl hover:opacity-90 transition">
              Update Password
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Bell size={18} className="text-purple-600" />
              <h2 className="font-bold text-gray-800">Notifications</h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-600">Email Notifications</span>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                  className="w-4 h-4 accent-purple-600"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-600">Push Notifications</span>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
                  className="w-4 h-4 accent-purple-600"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Settings