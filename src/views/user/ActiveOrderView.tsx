import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { Order } from "../../types/Order"
import { formatToIdr } from "../../types/Formatter"
import { retrieveOrder, cancelOrder } from "../../services/OrderApiService"
import { LocalizedOrderStatus } from "../../types/OrderStatus"
import Container from "../../components/user/core/Container"
import UpperSection from "../../components/user/core/UpperSection"

export default function ActiveOrderView() {
  const { purchaseId: purchaseId } = useParams<{ purchaseId: string }>();
  const [order, setOrder] = useState<Order>();
  const navigate = useNavigate()

  const fetchOrder = async () => {
    try {
      console.log(purchaseId)
      if (purchaseId) {
        const response = await retrieveOrder(purchaseId);
        setOrder(response);
      }
    } catch (error) {
      console.error(error)
      navigate('/')
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [purchaseId])

  const handleCancelOrder = async () => {
    try {
      if (purchaseId) {
        await cancelOrder(purchaseId);
        navigate('/cart')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <UpperSection title="Pesanan Aktif" />
      <Container>
        {order ? (
          <div className="bg-secondary-400 p-4 rounded-lg text-[0.65rem] md:text-sm lg:text-lg">
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
                    <td className="p-2 text-center">Biaya:</td>
                    <td className="p-2 text-right">{
                      formatToIdr(
                        order.deliveryFee
                      )
                    }</td>
                  </tr>
                  <tr className="border-t">
                    <td colSpan={3} className="p-2 text-left"></td>
                    <td className="p-2 text-center">Total:</td>
                    <td className="p-2 text-right">{
                      formatToIdr(
                        order.transactions[0].amount
                      )
                    }</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {order.status === "PENDING" &&
              <>
                <button className="p-2 mt-4 bg-red-500 text-white rounded-lg mr-4 border border-red-800" onClick={() => handleCancelOrder()}>
                  Batalkan Pesanan
                </button>
                <button className="p-2 mt-4 bg-green-500 text-white rounded-lg mr-4 border border-green-800" onClick={() => {
                  window.open(order.transactions[0].paymentUrl, '_blank');
                }}>
                  Halaman Pembayaran
                </button>
              </>
            }
          </div>
        ) : <p>Loading...</p>}
      </Container>
    </>
  )
}