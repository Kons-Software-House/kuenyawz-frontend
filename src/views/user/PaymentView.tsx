import { useEffect, useState } from "react";

import { CartItem } from "../../types/CartItem";
import { retrieveUserCart } from "../../services/UserApiService";
import Container from "../../components/user/core/Container";
import UpperSection from "../../components/user/core/UpperSection";
import LocationPicker from "../../components/user/views/PaymentVIew/LocationPicker";
import { formatToIdr } from "../../types/Formatter";

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

  return (
    <>
      <UpperSection title="Pembayaran" />
      <Container>
        <h1 className="text-2xl font-bold font-semi mb-2">Pilih Lokasi Pengiriman</h1>
        <div className="w-full mb-4">
          <LocationPicker selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} routeDistance={routeDistance} setRouteDistance={setRouteDistance} />
        </div>
        <CartSummary cartItems={cartItems} routeDistance={routeDistance} />
      </Container>
    </>
  );
}

type CartSummaryProps = {
  cartItems: CartItem[]
  routeDistance: number | null
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