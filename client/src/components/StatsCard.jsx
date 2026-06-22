const StatsCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-1">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  )
}

export default StatsCard