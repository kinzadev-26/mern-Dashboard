import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

const CalendarPage = () => {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedEvent, setSelectedEvent] = useState(null)

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const events = [
    { date: 5, title: 'Sprint Planning', color: 'bg-purple-500', time: '10:00 AM', desc: 'Plan tasks for the upcoming sprint with the team.' },
    { date: 12, title: 'Client Call', color: 'bg-pink-500', time: '02:00 PM', desc: 'Discuss project progress with the client.' },
    { date: 18, title: 'Design Review', color: 'bg-indigo-500', time: '11:00 AM', desc: 'Review latest UI designs with the design team.' },
    { date: 22, title: 'Project Deadline', color: 'bg-fuchsia-500', time: '05:00 PM', desc: 'Final submission for the Week 2 project.' },
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d)
  }

  const isToday = (day) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()

  const getEvent = (day) => events.find((e) => e.date === day)

  const handleDayClick = (day) => {
    const event = getEvent(day)
    if (event) setSelectedEvent(event)
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Calendar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="flex gap-2">
              <button onClick={handlePrevMonth} className="p-2 rounded-lg hover:bg-gray-100">
                <ChevronLeft size={18} className="text-gray-600" />
              </button>
              <button onClick={handleNextMonth} className="p-2 rounded-lg hover:bg-gray-100">
                <ChevronRight size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const event = day ? getEvent(day) : null
              return (
                <div
                  key={idx}
                  onClick={() => day && handleDayClick(day)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm relative ${
                    day ? 'cursor-pointer hover:bg-gray-50' : ''
                  } ${
                    isToday(day)
                      ? 'bg-gradient-to-br from-purple-600 to-pink-500 text-white font-bold'
                      : 'text-gray-700'
                  }`}
                >
                  {day}
                  {event && !isToday(day) && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${event.color}`}></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {events.map((event, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedEvent(event)}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
              >
                <div className={`w-2 h-10 rounded-full ${event.color}`}></div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                  <p className="text-xs text-gray-400">
                    {monthNames[currentMonth]} {event.date}, {currentYear}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-3 h-3 rounded-full ${selectedEvent.color}`}></div>
              <button onClick={() => setSelectedEvent(null)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{selectedEvent.title}</h3>
            <p className="text-sm text-purple-600 font-medium mb-3">
              {monthNames[currentMonth]} {selectedEvent.date}, {currentYear} • {selectedEvent.time}
            </p>
            <p className="text-sm text-gray-600">{selectedEvent.desc}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default CalendarPage