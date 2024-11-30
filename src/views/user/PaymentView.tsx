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

  return (
    <>
      <UpperSection title="Pembayaran" />
      <Container>
        <h1 className="text-2xl font-bold font-semi">Pilih Lokasi Pengiriman</h1>
        <div className="w-full mb-4">
          <LocationPicker selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
        </div>
        <CartSummary cartItems={cartItems} />
      </Container>
    </>
  );
}

type CartSummaryProps = {
  cartItems: CartItem[]
}
function CartSummary({ cartItems }: CartSummaryProps) {
  const subtotal = cartItems.reduce((acc, cartItem) => {
    const variant = cartItem.product.variants.find(
      variant => variant.variantId.toString() === cartItem.selectedVariantId.toString()
    )
    return acc + (variant?.price ?? 0) * cartItem.quantity
  }, 0)
  const total = subtotal + 3000 + 20000
  const formattedSubtotal = formatToIdr(subtotal)
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
        <span className="text-end">Rp 3.000</span>
        <span>Biaya Pengiriman</span>
        <span className="text-end">Rp 20.000</span>
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