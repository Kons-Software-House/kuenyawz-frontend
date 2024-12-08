import CategorySpreadChart from "../../components/admin/views/AdminDashboardView/CategorySpreadChart"
import OrdersGrowthChart from "../../components/admin/views/OrdersGrowthChart"
import OrderCount from "../../components/admin/views/AdminDashboardView/OrderCount"
import Sidebar from "../../components/admin/views/AdminDashboardView/Sidebar"

export default function AdminDashboardView() {

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full p-4">
          <h1 className="font-semi text-2xl text-center p-4">Admin Dashboard</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="shadow-lg border-2 border-secondary-100 rounded-lg flex flex-col items-center">
              <h2 className="font-semibold font-clear">Sebaran Kategori</h2>
              <CategorySpreadChart />
            </div>
            <div className="shadow-lg border-2 border-secondary-100 rounded-lg flex flex-col items-center">
              <OrderCount />
            </div>
            <div className="shadow-lg border-2 border-secondary-100 rounded-lg">
            </div>
          </div>
          <div className="h-80 mt-8">
            <h2 className="font-semibold font-clear">Grafik Aktivitas Pesanan</h2>
            <OrdersGrowthChart />
          </div>
        </div>
      </div>
    </>
  )
}