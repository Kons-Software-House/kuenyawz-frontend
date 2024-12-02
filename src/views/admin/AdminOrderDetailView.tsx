import Sidebar from "../../components/admin/views/AdminDashboardView/Sidebar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { retrieveOrder } from "../../services/OrderApiService"
import { Order } from "../../types/Orders"

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold p-4">Order Detail</h1>
        {loading ? <p>Loading...</p> : order ? (
          <div className="bg-secondary-300 p-4">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold">Order ID: {order.purchaseId}</h2>
                <p>Order Date: {new Date(order.eventDate).toLocaleDateString()}</p>
                <p>Order Status: {order.status}</p>
              </div>
              <div className="w-1/2">
                <h2 className="font-bold">Shipping Address</h2>
                <p>{order.fullAddress}</p>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="font-bold">Order Items</h2>
              <table className="w-full bg-secondary-250">
                <thead>
                  <tr className="border-b bg-secondary-100">
                    <th className="text-left p-2">Product Name</th>
                    <th className="text-left p-2">Variant</th>
                    <th className="text-center p-2">Quantity</th>
                    <th className="text-right p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.purchaseItems.map((item) => (
                    <tr key={item.purchaseItemId} className="border-b">
                      <td className="p-2">{item.product.name}</td>
                      <td className="p-2">{item.variant.type}</td>
                      <td className="p-2 text-center">{item.quantity}</td>
                      <td className="p-2 text-right">{item.boughtPrice}</td>
                    </tr>
                  ))}
                  <tr className="border-t">
                    <td colSpan={3} className="p-2 text-right">Total:</td>
                    <td className="p-2 text-right">{order.transactions[0].amount}</td>
                  </tr>
                </tbody>
              </table>
              {/* Confirm or cancel */}
            </div>
          </div>
        ) : <p>Order not found</p>}
      </div>
    </div>
  )
}