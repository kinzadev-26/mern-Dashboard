import { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Trash2, CheckCircle, Circle, X } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'

const TaskList = () => {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', description: '' })
  const [submitting, setSubmitting] = useState(false)

  const API_URL = 'http://localhost:5000/api/tasks'

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchTasks()
  }, [token])

  const handleCreateTask = async (e) => {
    e.preventDefault()
    if (!newTask.title.trim()) return
    setSubmitting(true)
    try {
      const res = await axios.post(API_URL, newTask, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks([res.data, ...tasks])
      setNewTask({ title: '', description: '' })
      setShowModal(false)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending'
      const res = await axios.put(
        `${API_URL}/${task._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)))
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks(tasks.filter((t) => t._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'All') return true
    return t.status === filter
  })

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task List</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-xl font-medium hover:opacity-90 transition"
        >
          <Plus size={18} />
          New Task
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['All', 'Pending', 'Completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === f
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {loading ? (
          <p className="text-gray-400 text-center py-8">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No tasks found.</p>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <button onClick={() => toggleStatus(task)}>
                    {task.status === 'Completed' ? (
                      <CheckCircle size={20} className="text-purple-600" />
                    ) : (
                      <Circle size={20} className="text-gray-300" />
                    )}
                  </button>
                  <div>
                    <p
                      className={`font-medium ${
                        task.status === 'Completed'
                          ? 'text-gray-400 line-through'
                          : 'text-gray-800'
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-gray-400">{task.description}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">New Task</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Task title"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Description (optional)</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Task description"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
              >
                {submitting ? 'Adding...' : 'Add Task'}
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default TaskList