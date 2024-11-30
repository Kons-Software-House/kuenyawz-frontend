import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";

import { CartItem } from "../../types/CartItem";
import { formatToIdr } from "../../types/Formatter";
import { retrieveUserCart } from "../../services/UserApiService";
import { createOrder } from "../../services/OrderApiService";
import Container from "../../components/user/core/Container";
import UpperSection from "../../components/user/core/UpperSection";
import Calendar from "../../components/user/views/CalendarView/Calendar";
import LocationPicker from "../../components/user/views/PaymentVIew/LocationPicker";
import AvailabilityTable from "../../components/user/views/CalendarView/AvailabilityTable";

interface Location {
  lat: number;
  lon: number;
  display_name: string;
}

export default function PaymentView() {
  const INITIAL_LOCATION: Location = {
    lat: -6.175402,
    lon: 106.827169,
    display_name: 'Jakarta, Indonesia'
  };
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location>(INITIAL_LOCATION);
  const [routeDistance, setRouteDistance] = useState<number | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const retrieveCartItems = async () => {
    try {
      const response = await retrieveUserCart()
      const sorted = response.sort((a: CartItem, b: CartItem) => a.product.name.localeCompare(b.product.name))
      setCartItems(sorted)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    retrieveCartItems()
  }, [])

  useEffect(() => {
    if (selectedLocation && selectedLocation.lat !== INITIAL_LOCATION.lat && selectedLocation.lon !== INITIAL_LOCATION.lon) {
      const distance = routeDistance ? routeDistance : 0
      const deliveryFee = calculateDeliveryFee(distance)
      console.log(`Delivery fee: ${deliveryFee}`)
    }
  }, [selectedLocation, routeDistance])

  const handleSubmit = async (values: any) => {
    const { fullAddress } = values
    const lat = selectedLocation.lat
    const lon = selectedLocation.lon
    const eventDate = selectedDates[2].toISOString().split('T')[0]
    const paymentType = 'FULL_PAYMENT'
    const deliveryOption = 'DELIVERY'
    const purchaseItems = cartItems.map(cartItem => {
      return {
        note: cartItem.note,
        quantity: cartItem.quantity,
        variantId: cartItem.selectedVariantId,
      }
    })
    try {
      const response = await createOrder(fullAddress, lat, lon, eventDate, paymentType, deliveryOption, purchaseItems)
      window.location.href = response.transactions[0].paymentUrl;
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <UpperSection title="Pembayaran" />
      <Container>
        <Formik initialValues={{ fullAddress: '' }} onSubmit={(values) => { handleSubmit(values) }}>
          <Form className="w-full">
            <h2 className="text-2xl font-bold font-semi mb-2 text-center">Lokasi Pengiriman</h2>
            <Field type="text" name="fullAddress" className="w-full p-2 rounded-md border border-gray-300 mb-4" placeholder="Alamat Lengkap" />
            <label className="text-md">Pilih lokasi pengiriman pada peta</label>
            <div className="w-full mb-4">
              <LocationPicker selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} routeDistance={routeDistance} setRouteDistance={setRouteDistance} />
            </div>
            <CartSummary cartItems={cartItems} routeDistance={routeDistance} selectedDates={selectedDates} />
            <h2 className="text-2xl font-bold font-semi mb-2 mt-4 text-center">Pilih Tanggal Pengiriman</h2>
            <div className="flex bg-red-200 w-full">
              <div className="flex gap-2">
                <Calendar selectable={true} selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
                <AvailabilityTable />
              </div>
            </div>
            <button type="submit" className="w-full bg-red-500 p-2 rounded-md mt-4">Pesan Sekarang</button>
          </Form>
        </Formik>
      </Container>
    </>
  );
}

type CartSummaryProps = {
  cartItems: CartItem[]
  routeDistance: number | null
  selectedDates: Date[]
}
function CartSummary({ cartItems, routeDistance }: CartSummaryProps) {
  const subtotal = cartItems.reduce((acc, cartItem) => {
    const variant = cartItem.product.variants.find(
      variant => variant.variantId.toString() === cartItem.selectedVariantId.toString()
    )
    return acc + (variant?.price ?? 0) * cartItem.quantity
  }, 0)
  const deliveryFee = calculateDeliveryFee(routeDistance ?? 0)
  const total = subtotal + 3000 + deliveryFee
  const formattedSubtotal = formatToIdr(subtotal)
  const formattedDeliveryFee = formatToIdr(deliveryFee)
  const formattedTotal = formatToIdr(total)
  return (
    <div className="bg-secondary-500 w-full p-6 rounded-md shadow-xl">
      <span className="text-xl font-semibold">Tanggal Pengiriman</span>

      <hr className="bg-black my-2 border-black" />
      <span className="text-xl font-semibold">Rincian Belanja</span>
      <hr className="bg-black my-2 border-black" />
      <span className="text-lg font-semibold">Total Belanja</span>
      <div className="grid grid-cols-2">
        <span>Subtotal</span>
        <span className="text-end">Rp {formattedSubtotal}</span>
      </div>
      <hr className="bg-black my-2 border-black" />
      <span className="text-lg font-semibold">Biaya Transaksi</span>
      <div className="grid grid-cols-2">
        <span>Biaya Layanan</span>
        <span className="text-end">Rp 4.000</span>
        <span>Biaya Pengiriman</span>
        <span className="text-end">{formattedDeliveryFee}</span>
      </div>
      <hr className="bg-black my-2 border-black" />
      <span className="text-lg font-semibold">Total Pembayaran</span>
      <div className="grid grid-cols-2">
        <span>Total</span>
        <span className="text-end">Rp {formattedTotal}</span>
      </div>
    </div>
  )
}

function calculateDeliveryFee(distance: number) {
  return Math.round(distance / 1000) * 3500
}