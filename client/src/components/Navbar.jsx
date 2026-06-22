import { useState, useRef, useEffect } from 'react'
import { Search, Bell, User, Settings, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ user }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const notifications = [
    { title: 'New user registered', time: '5 min ago' },
    { title: 'Task "Design Review" completed', time: '20 min ago' },
    { title: 'New comment on Dashboard task', time: '1 hour ago' },
    { title: 'Meeting scheduled with team', time: '2 hours ago' },
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Good morning, {user?.name || 'there'} 
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="hidden sm:flex items-center bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm w-40"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfile(false)
            }}
            className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 relative"
          >
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-lg border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-gray-800 text-sm">Notifications</p>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                  >
                    <p className="text-sm text-gray-800">{n.title}</p>
                    <p className="text-xs text-gray-400">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile(!showProfile)
              setShowNotifications(false)
            }}
            className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold"
          >
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-gray-800 text-sm">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  navigate('/settings')
                  setShowProfile(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <User size={16} />
                My Profile
              </button>
              <button
                onClick={() => {
                  navigate('/settings')
                  setShowProfile(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <Settings size={16} />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition border-t border-gray-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar