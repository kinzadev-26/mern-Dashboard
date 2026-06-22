import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, CheckSquare, Clock } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import StatsCard from '../components/StatsCard'

const Analytics = () => {
  const weeklyData = [
    { day: 'Mon', tasks: 12 },
    { day: 'Tue', tasks: 19 },
    { day: 'Wed', tasks: 14 },
    { day: 'Thu', tasks: 22 },
    { day: 'Fri', tasks: 18 },
    { day: 'Sat', tasks: 9 },
    { day: 'Sun', tasks: 6 },
  ]

  const growthData = [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 600 },
    { month: 'Mar', users: 750 },
    { month: 'Apr', users: 900 },
    { month: 'May', users: 1100 },
    { month: 'Jun', users: 1240 },
  ]

  const statusData = [
    { name: 'Completed', value: 342, color: '#a855f7' },
    { name: 'Pending', value: 128, color: '#ec4899' },
    { name: 'Overdue', value: 24, color: '#f472b6' },
  ]

  const stats = [
    { icon: Users, label: 'Total Users', value: '1,240', color: 'bg-purple-500' },
    { icon: CheckSquare, label: 'Tasks Completed', value: '342', color: 'bg-pink-500' },
    { icon: Clock, label: 'Avg. Completion Time', value: '2.4 days', color: 'bg-indigo-500' },
    { icon: TrendingUp, label: 'Growth Rate', value: '+18%', color: 'bg-fuchsia-500' },
  ]

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Weekly Tasks Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Weekly Task Activity</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="tasks" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Status Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Task Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
              >
                {statusData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {statusData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Growth Line Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">User Growth (6 Months)</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: '#ec4899', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  )
}

export default Analytics