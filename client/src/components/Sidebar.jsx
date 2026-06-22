import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, BarChart3, ListTodo, Activity, Inbox, Settings, Calendar, Users, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: ListTodo, label: 'Task List', path: '/tasks' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Activity, label: 'Tracking', path: '/tracking' },
    { icon: Inbox, label: 'Inbox', path: '/inbox' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
  ]

  const handleNavClick = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-purple-700 to-pink-600 text-white px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold text-sm">
            uT
          </div>
          <span className="text-lg font-bold">uTask</span>
        </div>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-purple-700 to-pink-600 text-white flex flex-col p-5 z-50 flex-shrink-0 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center font-bold">
              uT
            </div>
            <span className="text-xl font-bold">uTask</span>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <button
          onClick={() => handleNavClick('/tasks')}
          className="bg-white text-purple-700 font-semibold rounded-xl py-3 mb-8 hover:bg-gray-100 transition flex-shrink-0"
        >
          + Create new task
        </button>

        <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path
            return (
              <div
                key={idx}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${isActive
                    ? 'bg-white text-purple-700 font-semibold'
                    : 'text-white/80 hover:bg-white/10'
                  }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
            )
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 transition mt-auto flex-shrink-0"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </>
  )
}

export default Sidebar