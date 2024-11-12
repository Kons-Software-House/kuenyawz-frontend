import Sidebar from "../../components/admin/Sidebar"
import { CategorySpreadChart } from "../../components/admin/Charts"

export default function AdminDashboardView() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <h1 className="font-semi text-2xl text-center p-4">Admin Dashboard</h1>
          <div className="bg-red-200 h-80">
          </div>
          <CategorySpreadChart />
        </div>
      </div>
    </>
  )
}