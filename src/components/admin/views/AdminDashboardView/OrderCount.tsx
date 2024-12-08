import { useState, useEffect } from "react";

import { retrieveOrders } from "../../../../services/OrderApiService";
import { Order } from "../../../../types/Order";

export default function OrderCount() {
  const [confirmingOrderCount, setConfirmingOrderCount] = useState(0);
  const [confirmedOrderCount, setConfirmedOrderCount] = useState(0);
  const [processedOrderCount, setProcessedOrderCount] = useState(0);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const response = await retrieveOrders();
        const orders = response.content;
        separateActiveOrders(orders);
        separateConfirmedOrders(orders);
        separateProcessedOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const separateActiveOrders = (orders: Order[]) => {
      const activeOrders = orders.filter(order => order.status == "CONFIRMING");
      setConfirmingOrderCount(activeOrders.length);
    }

    const separateConfirmedOrders = (orders: Order[]) => {
      const activeOrders = orders.filter(order => order.status == "CONFIRMED");
      setConfirmedOrderCount(activeOrders.length);
    }

    const separateProcessedOrders = (orders: Order[]) => {
      const activeOrders = orders.filter(order => order.status == "PROCESSING");
      setProcessedOrderCount(activeOrders.length);
    }

    fetchOrderCount();
  }, []);

  return (
    <div className="p-10 flex flex-col items-center justify-between h-full">
      <div className="flex flex-col items-center p-2">
        <h2 className="font-semibold font-clear">Jumlah Pesanan Perlu Konfirmasi</h2>
        <h3 className="text-3xl">{confirmingOrderCount}</h3>
      </div>
      <div className="flex flex-col items-center p-2">
        <h2 className="font-semibold font-clear">Jumlah Pesanan Dikonfirmasi</h2>
        <h3 className="text-3xl">{confirmedOrderCount}</h3>
      </div>
      <div className="flex flex-col items-center p-2">
        <h2 className="font-semibold font-clear">Jumlah Pesanan Diproses</h2>
        <h3 className="text-3xl">{processedOrderCount}</h3>
      </div>
    </div>
  )
}