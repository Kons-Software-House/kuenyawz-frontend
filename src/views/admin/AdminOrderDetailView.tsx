import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Order } from "../../types/Order"
import { formatToIdr } from "../../types/Formatter"
import { LocalizedOrderStatus } from "../../types/OrderStatus"
import { retrieveOrder, confirmOrder, refundOrder } from "../../services/OrderApiService"
import Sidebar from "../../components/admin/views/AdminDashboardView/Sidebar"

export default function AdminOrderDetailView() {
  const { purchaseId } = useParams<{ purchaseId: string }>()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<Order>()

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true)
      try {
        if (purchaseId) {
          const response = await retrieveOrder(purchaseId)
          setOrder(response)
          console.log(response)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [purchaseId])

  const handleConfirmOrder = async (purchaseId: string) => {
    try {
      await confirmOrder(purchaseId)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const handleRefundOrder = async (purchaseId: string) => {
    try {
      await refundOrder(purchaseId)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold py-4 font-semi">Detil Pesanan</h1>
        {loading ? <p>Loading...</p> : order ? (
          <div className="bg-secondary-300 p-4">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold">Order ID: {order.purchaseId}</h2>
                <p>Tanggal Pemesanan: {new Date(order.eventDate).toLocaleDateString()}</p>
                <p>Status: {LocalizedOrderStatus[order.status as keyof typeof LocalizedOrderStatus]}</p>
              </div>
              <div className="w-1/2">
                <h2 className="font-bold">Alamat KIrim</h2>
                <p>{order.fullAddress}</p>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="font-bold">Order Items</h2>
              <table className="w-full bg-secondary-250">
                <thead>
                  <tr className="border-b bg-secondary-100">
                    <th className="text-left p-2">Nama Produk</th>
                    <th className="text-left p-2">Varian</th>
                    <th className="text-center p-2">Jumlah</th>
                    <th className="text-center p-2">Catatan</th>
                    <th className="text-right p-2">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {order.purchaseItems.map((item) => (
                    <tr key={item.variant.variantId} className="border-b">
                      <td className="p-2">{item.product.name}</td>
                      <td className="p-2">{item.variant.type}</td>
                      <td className="p-2 text-center">{item.quantity}</td>
                      <td className="p-2 text-center">{item.note ? item.note : '-'}</td>
                      <td className="p-2 text-right">{formatToIdr(item.boughtPrice)}</td>
                    </tr>
                  ))}
                  <tr className="border-t">
                    <td colSpan={3} className="p-2 text-left"></td>
                    <td className="p-2 text-center">Total:</td>
                    <td className="p-2 text-right">{
                      formatToIdr(
                        order.purchaseItems.reduce((acc, item) => acc + item.boughtPrice * item.quantity, 0)
                      )
                    }</td>
                  </tr>
                </tbody>
              </table>
              {/* Confirm or cancel */}
              {order.status === 'CONFIRMING' ? (
                <div className="mt-4">
                  <button className="p-2 bg-green-500 text-white rounded-lg mr-4 border border-green-800" onClick={() => handleConfirmOrder(order.purchaseId)}>
                    Konfirmasi Pesanan
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-lg mr-4 border border-red-800" onClick={() => handleRefundOrder(order.purchaseId)}>
                    Batalkan Pesanan
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : <p>Order not found</p>}
      </div>
    </div>
  )
}