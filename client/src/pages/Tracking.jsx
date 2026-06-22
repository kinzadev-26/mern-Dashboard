import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Play, Pause, CheckCircle } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

const Tracking = () => {
  const navigate = useNavigate()

  const [trackingItems, setTrackingItems] = useState([
    { task: 'Design Review', project: 'uTask Dashboard', time: '2h 15m', status: 'running' },
    { task: 'API Integration', project: 'Backend Module', time: '1h 40m', status: 'paused' },
    { task: 'Client Presentation', project: 'Q3 Roadmap', time: '0h 45m', status: 'paused' },
    { task: 'Bug Fixes', project: 'Mobile App', time: '3h 20m', status: 'completed' },
  ])

  const weeklyHours = [
    { day: 'Mon', hours: 6.5 },
    { day: 'Tue', hours: 7.2 },
    { day: 'Wed', hours: 5.8 },
    { day: 'Thu', hours: 8.0 },
    { day: 'Fri', hours: 6.2 },
  ]

  const maxHours = Math.max(...weeklyHours.map((d) => d.hours))

  const toggleItemStatus = (idx) => {
    setTrackingItems((prev) =>
      prev.map((item, i) => {
        if (i !== idx) return item
        if (item.status === 'running') return { ...item, status: 'paused' }
        if (item.status === 'paused') return { ...item, status: 'running' }
        return item
      })
    )
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Time Tracking</h1>
        <button
          onClick={() => navigate('/tasks')}
          className="text-sm text-purple-600 font-medium hover:underline"
        >
          Go to Task List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Today's Activity</h2>
          <div className="space-y-3">
            {trackingItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleItemStatus(idx)}
                    disabled={item.status === 'completed'}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                      item.status === 'running'
                        ? 'bg-purple-500 hover:bg-purple-600'
                        : item.status === 'completed'
                        ? 'bg-green-500 cursor-default'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {item.status === 'running' && <Pause size={16} className="text-white" />}
                    {item.status === 'paused' && <Play size={16} className="text-white" />}
                    {item.status === 'completed' && <CheckCircle size={16} className="text-white" />}
                  </button>
                  <div>
                    <p className="font-medium text-gray-800">{item.task}</p>
                    <p className="text-xs text-gray-400">{item.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                  <Clock size={16} />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">This Week</h2>
          <div className="flex items-end justify-between h-40 mb-4">
            {weeklyHours.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-6 rounded-t-lg bg-gradient-to-t from-purple-600 to-pink-400 cursor-pointer hover:opacity-80 transition"
                  style={{ height: `${(item.hours / maxHours) * 100}%` }}
                  title={`${item.hours} hrs`}
                ></div>
                <span className="text-xs text-gray-400">{item.day}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-500">Total Hours</p>
            <p className="text-2xl font-bold text-gray-800">33.7 hrs</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Tracking