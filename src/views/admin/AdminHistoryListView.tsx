import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Order } from "../../types/Order";
import { LocalizedOrderStatus } from "../../types/OrderStatus";
import { retrieveOrders } from "../../services/OrderApiService";
import Sidebar from "../../components/admin/views/AdminDashboardView/Sidebar";

export default function AdminHistoryListView() {
  const [loading, setLoading] = useState(true)
  const [orderHistories, setOrderHistories] = useState<Order[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrderHistories = async (newPage?: number) => {
    setLoading(true);
    if (newPage && newPage < 0) {
      newPage = 0;
    }
    if (newPage && newPage > totalPages - 1) {
      newPage = undefined;
    }

    try {
      const params = {
        page: newPage,
        pageSize: 15,
        statuses: "DELIVERED, CANCELLED"
      };

      const response = await retrieveOrders(params);
      setOrderHistories(response.content);
      setPage(response.page.number);
      setTotalPages(response.page.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrderHistories();
  }, [])

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold font-semi mb-6">Daftar Riwayat Pesanan</h1>
        </div>
        <h2 className="text-xl font-semibold font-clear">
          Riwayat Pesanan
        </h2>
        {loading ? <p>Loading...</p> : <>
          <div className="mt-4 text-sm">
            <table className="w-full bg-secondary-250">
              <thead>
                <tr className="border-b bg-secondary-100">
                  <th className="text-left p-2">Alamat Pengiriman</th>
                  <th className="text-left p-2">Tanggal Pengiriman</th>
                  <th className="text-center p-2">Status</th>
                  <th className="text-center p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orderHistories.length == 0 ? <tr><td colSpan={4} className="text-center h-14">Belum ada pesanan</td></tr> : null}
                {orderHistories
                  .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
                  .map(order => (
                    <tr key={order.purchaseId} className="border-b border-gray-200 odd:bg-[#ffffe8] even:bg-[#fefed0]">
                      <td className="p-2">{order.fullAddress}</td>
                      <td className="p-2">{order.eventDate}</td>
                      <td className="text-center p-2">{LocalizedOrderStatus[order.status as keyof typeof LocalizedOrderStatus]}</td>
                      <td className="flex justify-center p-2">
                        <Link to={`/admin/orders/${order.purchaseId.toString()}`}>
                          <button className="border-2 border-secondary-100 text-black px-4 py-1 rounded-md p-2">Detil</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button className="bg-secondary-100 text-black px-4 py-2 rounded-md" onClick={() => fetchOrderHistories(page - 1)} disabled={page === 0}>Sebelumnya</button>
            <button className="bg-secondary-100 text-black px-4 py-2 rounded-md" onClick={() => fetchOrderHistories(page + 1)} disabled={page === totalPages - 1}>Selanjutnya</button>
          </div>
        </>}
      </div>
    </div>
  )
}