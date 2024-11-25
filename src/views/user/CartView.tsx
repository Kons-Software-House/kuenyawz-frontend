import { useEffect, useState } from "react"
import Container from "../../components/user/core/Container"
import UpperSection from "../../components/user/core/UpperSection"
import { useAuth } from "../../contexts/AuthContext"
import { retrieveUserCart } from "../../services/UserApiService"
import { Product, Variant } from "../../types/Product"
import { CartItem } from "../../types/CartItem"

export default function CartView() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const retrieveCartItems = async () => {
    try {
      const response = await retrieveUserCart()
      setCartItems(response)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    retrieveCartItems()
  }, [])

  return (
    <>
      <UpperSection title="Keranjang" subtitle="Daftar Kreasi Pilihan Anda" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4">
          <div className="col-span-2">
            <div className="grid grid-cols-1 bg-secondary-500 w-full p-8 rounded-md shadow-xl gap-3">
              <div className="flex px-10 p-2 font-bold bg-secondary-100 rounded-md shadow-md gap-4">
                <span className="grow">Produk</span>
                <span className="w-20 text-center">Harga</span>
                <span className="w-20 text-center">Jumlah</span>
                <span className="w-20 text-center">Total</span>
              </div>
              {cartItems.map((cartItem, index) => (
                <CartItemComponent key={index} cartItem={cartItem} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 lg:flex lg:flex-col w-full gap-4">
            <CartSummary />
            <BuyingDetails />
          </div>
        </div>
      </Container>
    </>
  )
}

type CartItemComponentProps = {
  cartItem: CartItem
}

function CartItemComponent({ cartItem }: CartItemComponentProps) {
  const variant = cartItem.product.variants.find(
    variant => variant.variantId.toString() === cartItem.selectedVariantId.toString()
  )

  return (
    <div className="flex px-10 p-2 bg-white rounded-md shadow-md gap-4">
      <div className="flex gap-4 grow">
        <img src={cartItem.product.images ? cartItem.product.images[0] : ''} alt={cartItem.product.name} className="w-20 h-20 object-cover rounded-md" />
        <div className="flex flex-col gap-2">
          <span className="font-semibold">{cartItem.product.name}</span>
          <span>{cartItem.product.category}</span>
        </div>
      </div>
      <span className="w-20 text-center">Rp {variant?.price}</span>
      <span className="w-20 text-center">{cartItem.quantity}</span>
      <span className="w-20 text-center">Rp {(variant?.price ?? 0) * cartItem.quantity}</span>
    </div>
  )
}

function CartSummary() {
  return (
    <div className="bg-secondary-500 w-full p-8 rounded-md shadow-xl">
      <span className="text-xl font-semibold">Rincian Belanja</span>
      <hr className="bg-black my-2 border-black" />
      <span className="text-lg font-semibold">Total Belanja</span>
      <div className="grid grid-cols-2">
        <span>Subtotal</span>
        <span className="text-end">Rp 100.000</span>
      </div>
      <hr className="bg-black my-2 border-black" />
      <span className="text-lg font-semibold">Biaya Transaksi</span>
      <div className="grid grid-cols-2">
        <span>Biaya Layanan</span>
        <span className="text-end">Rp 3.000</span>
        <span>Biaya Layanan</span>
        <span className="text-end">Rp 3.000</span>
      </div>
    </div>
  )
}

function BuyingDetails() {
  const { fullName, phone } = useAuth()
  return (
    <div className="bg-secondary-500 w-full p-8 rounded-md shadow-xl">
      <span className="text-xl font-semibold">Detail Pembelian</span>
      <hr className="bg-black my-2 border-black" />
      <div className="grid gap-4">
        <div className="grid grid-cols-2">
          <span className="block">Nomor Telepon</span>
          <span className="block text-end">
            +62 {phone.slice(0, 3)} {phone.slice(3, 7)} {phone.slice(7, 14)}
          </span>
        </div>
        <div>
          <label htmlFor="date" className="block">Tanggal Pengiriman</label>
          <input type="date" id="date" className="w-full p-2 rounded-md" />
        </div>
        <div>
          <label htmlFor="address" className="block">Alamat</label>
          <textarea id="address" className="w-full p-2 rounded-md"></textarea>
        </div>
        <div>
          <label htmlFor="note" className="block">Catatan</label>
          <textarea id="note" className="w-full p-2 rounded-md"></textarea>
        </div>
      </div>
    </div>
  )
}