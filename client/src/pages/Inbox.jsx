import { useState } from 'react'
import { Mail, MailOpen, Star, X } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

const Inbox = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Sarah Khan', subject: 'Project Update Required', preview: 'Hi, can you share the latest status on the dashboard project...', full: 'Hi, can you share the latest status on the dashboard project? The client is asking for an update before tomorrow\'s meeting. Please include screenshots if possible.', time: '10 min ago', read: false, starred: true },
    { id: 2, sender: 'Ali Hassan', subject: 'Meeting Rescheduled', preview: 'The client meeting has been moved to 3 PM tomorrow...', full: 'The client meeting has been moved to 3 PM tomorrow due to a scheduling conflict. Please update your calendar accordingly.', time: '1 hour ago', read: false, starred: false },
    { id: 3, sender: 'Team Lead', subject: 'Code Review Comments', preview: 'Left a few comments on your latest PR, please check...', full: 'Left a few comments on your latest PR, please check when you get a chance. Mostly minor naming convention suggestions.', time: '3 hours ago', read: true, starred: false },
    { id: 4, sender: 'HR Department', subject: 'Internship Certificate', preview: 'Your internship completion certificate will be issued...', full: 'Your internship completion certificate will be issued once all deliverables for Week 2 are submitted and reviewed.', time: '1 day ago', read: true, starred: true },
  ])

  const [selectedMessage, setSelectedMessage] = useState(null)

  const openMessage = (msg) => {
    setMessages(messages.map((m) => (m.id === msg.id ? { ...m, read: true } : m)))
    setSelectedMessage(msg)
  }

  const toggleStar = (id, e) => {
    e.stopPropagation()
    setMessages(messages.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)))
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Inbox</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => openMessage(msg)}
            className={`flex items-start gap-4 p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition ${
              !msg.read ? 'bg-purple-50/50' : ''
            }`}
          >
            <div className="mt-1">
              {msg.read ? (
                <MailOpen size={18} className="text-gray-300" />
              ) : (
                <Mail size={18} className="text-purple-600" />
              )}
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {msg.sender[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm ${!msg.read ? 'font-bold text-gray-800' : 'font-medium text-gray-600'}`}>
                  {msg.sender}
                </p>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p className={`text-sm ${!msg.read ? 'font-semibold text-gray-700' : 'text-gray-500'}`}>
                {msg.subject}
              </p>
              <p className="text-xs text-gray-400 truncate">{msg.preview}</p>
            </div>
            <button onClick={(e) => toggleStar(msg.id, e)} className="mt-1">
              <Star
                size={16}
                className={msg.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedMessage.sender[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{selectedMessage.sender}</p>
                  <p className="text-xs text-gray-400">{selectedMessage.time}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMessage(null)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{selectedMessage.subject}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{selectedMessage.full}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Inbox