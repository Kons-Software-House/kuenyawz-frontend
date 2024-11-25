import { useEffect, useState } from "react"
import Container from "../../components/user/core/Container"
import UpperSection from "../../components/user/core/UpperSection"
import { useAuth } from "../../contexts/AuthContext"
import { retrieveUserCart, deleteFromUserCart, updateCartItem } from "../../services/UserApiService"
import { CartItem } from "../../types/CartItem"
import { Link } from "react-router-dom"
import { Field, Form, Formik } from "formik"

export default function CartView() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const retrieveCartItems = async () => {
    try {
      const response = await retrieveUserCart()
      setCartItems(response)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteCartItem = async (cartItemId: string) => {
    try {
      await deleteFromUserCart(cartItemId)
      retrieveCartItems()
    } catch (error) {
      console.error(error)
    } finally {
      retrieveCartItems()
    }
  }

  const handleUpdateCartItem = async (cartItemId: string, variantId: string, quantity: number, note: string) => {
    try {
      await updateCartItem(cartItemId, variantId, quantity, note)
      retrieveCartItems()
    } catch (error) {
      console.error(error)
    } finally {
      retrieveCartItems()
    }
  }


  useEffect(() => {
    retrieveCartItems()
  }, [])

  return (
    <>
      <UpperSection title="Keranjang" subtitle="Daftar Kreasi Pilihan Anda" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 text-sm">
          <div className="col-span-2">
            <div className="grid grid-cols-1 bg-secondary-500 w-full p-8 rounded-md shadow-xl gap-2">
              <div className="flex pl-10 pr-2 p-2 font-bold bg-secondary-100 rounded-md shadow-md gap-2">
                <span className="grow">Produk</span>
                <span className="w-28 text-center">Harga</span>
                <span className="w-14 text-center">Jumlah</span>
                <span className="w-28 text-center">Total</span>
                <span className="w-6"></span>
              </div>
              {cartItems.map((cartItem, index) => (
                <CartItemComponent key={index} cartItem={cartItem} handleDeleteCartItem={handleDeleteCartItem} handleUpdateCartItem={handleUpdateCartItem} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 lg:flex lg:flex-col w-full gap-4">
            <CartSummary cartItems={cartItems} />
            <BuyingDetails />
          </div>
        </div>
      </Container>
    </>
  )
}

type CartItemComponentProps = {
  cartItem: CartItem
  handleDeleteCartItem: (cartItemId: string) => void
  handleUpdateCartItem: (cartItemId: string, variantId: string, quantity: number, note: string) => void
}

function CartItemComponent({ cartItem, handleDeleteCartItem, handleUpdateCartItem }: CartItemComponentProps) {
  const variant = cartItem.product.variants.find(
    variant => variant.variantId.toString() === cartItem.selectedVariantId.toString()
  )

  return (
    <>
      <div className="flex pl-10 pr-2 p-1 bg-white rounded-md shadow-md gap-2 items-center">
        <div className="grow">
          <Link to={`/produk/${cartItem.product.productId}`}>
            <div className="flex gap-4 grow">
              <img src={cartItem.product.images ? cartItem.product.images[0] : ''} alt={cartItem.product.name} className="aspect-[6/9] w-12 object-cover rounded-md bg-gray-100 border-2 border-secondary-100" />
              <div className="flex flex-col gap-2 justify-center">
                <span className="font-semibold">{cartItem.product.name}</span>
                <span>{cartItem.product.category}</span>
              </div>
            </div>
          </Link>
        </div>
        <span className="w-28 text-center">Rp {variant?.price}</span>
        <Formik initialValues={{ quantity: cartItem.quantity }} onSubmit={(values) => { handleUpdateCartItem(cartItem.cartItemId.toString(), cartItem.selectedVariantId.toString(), values.quantity, cartItem.note) }}>
          {({ submitForm }) => (
            <Form className="w-14 flex justify-center">
              <Field name='quantity' type="number" className="w-12 text-center border border-black rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onBlur={submitForm}
              />
            </Form>
          )}
        </Formik>
        <span className="w-28 text-center">Rp {(variant?.price ?? 0) * cartItem.quantity}</span>
        <button className="w-6 text-red-900 font-bold font-clear text-sm" onClick={() => handleDeleteCartItem(cartItem.cartItemId.toString())}>[X]</button>
      </div>
    </>
  )
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
  const formattedSubtotal = subtotal.toLocaleString('id-ID')
  const formattedTotal = total.toLocaleString('id-ID')

  return (
    <div className="bg-secondary-500 w-full p-8 rounded-md shadow-xl">
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

function BuyingDetails() {
  const { phone } = useAuth()
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