import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, DollarSign, CheckSquare, TrendingUp } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import Navbar from '../components/Navbar'
import StatsCard from '../components/StatsCard'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([
    { name: 'Sprint Daily Meeting', time: '09:00 AM', done: true },
    { name: 'Design Review', time: '11:30 AM', done: true },
    { name: 'Client Presentation', time: '02:00 PM', done: false },
    { name: 'Code Deployment', time: '04:30 PM', done: false },
  ])

  const stats = [
    { icon: Users, label: 'Total Users', value: '1,240', color: 'bg-purple-500', path: '/analytics' },
    { icon: DollarSign, label: 'Revenue', value: '$8,350', color: 'bg-pink-500', path: '/analytics' },
    { icon: CheckSquare, label: 'Tasks Done', value: '342', color: 'bg-indigo-500', path: '/tasks' },
    { icon: TrendingUp, label: 'Growth', value: '+18%', color: 'bg-fuchsia-500', path: '/analytics' },
  ]

  const recentActivity = [
    { title: 'New user registered', time: '5 min ago', color: 'bg-purple-500', path: '/analytics' },
    { title: 'Task "Design Review" completed', time: '20 min ago', color: 'bg-pink-500', path: '/tasks' },
    { title: 'New comment on Dashboard task', time: '1 hour ago', color: 'bg-indigo-500', path: '/inbox' },
    { title: 'Meeting scheduled with team', time: '2 hours ago', color: 'bg-fuchsia-500', path: '/calendar' },
  ]

  const toggleTask = (idx) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, done: !t.done } : t))
    )
  }

  return (
    <DashboardLayout>
      <Navbar user={user} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            onClick={() => navigate(stat.path)}
            className="cursor-pointer hover:-translate-y-1 transition-transform"
          >
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
            <button
              onClick={() => navigate('/inbox')}
              className="text-xs text-purple-600 font-medium hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, idx) => (
              <div
                key={idx}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition"
              >
                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Today's Tasks</h2>
            <button
              onClick={() => navigate('/tasks')}
              className="text-xs text-purple-600 font-medium hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {tasks.map((task, idx) => (
              <div
                key={idx}
                onClick={() => toggleTask(idx)}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
              >
                <div>
                  <p
                    className={`text-sm font-medium ${
                      task.done ? 'text-gray-400 line-through' : 'text-gray-800'
                    }`}
                  >
                    {task.name}
                  </p>
                  <p className="text-xs text-gray-400">{task.time}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 transition ${
                    task.done
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-300'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard