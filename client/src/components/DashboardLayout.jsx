import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout