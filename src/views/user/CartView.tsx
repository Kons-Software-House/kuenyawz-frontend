import { useEffect, useState } from "react"
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"

import { CartItem } from "../../types/CartItem"
import { formatToIdr } from "../../types/Formatter"
import { retrieveUserCart, deleteFromUserCart, updateCartItem } from "../../services/UserApiService"
import Container from "../../components/user/core/Container"
import UpperSection from "../../components/user/core/UpperSection"

export default function CartView() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const retrieveCartItems = async () => {
    try {
      const response = await retrieveUserCart()
      const sorted = response.sort((a: CartItem, b: CartItem) => a.product.name.localeCompare(b.product.name))
      setCartItems(sorted)
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

  const handleUpdateCartItem = async (cartItemId: string, quantity: number, variantId?: string, note?: string) => {
    try {
      if (note && variantId) {
        await updateCartItem(cartItemId, quantity, note, variantId);
      } else if (note) {
        await updateCartItem(cartItemId, quantity, note);
      } else if (variantId) {
        await updateCartItem(cartItemId, quantity, variantId);
      } else {
        await updateCartItem(cartItemId, quantity);
      }
      retrieveCartItems()
    } catch (error) {
      console.error(error)
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
        <div className="grid grid-cols-1 w-full font-clear">
          <div className="col-span-2">
            <div className="grid grid-cols-1 bg-secondary-500 w-full p-8 rounded-md shadow-lg gap-2">
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
          <div className="mt-4 flex flex-col gap-4">
            <CartSummary cartItems={cartItems} />
            <button className="bg-secondary-500 rounded-md shadow-lg p-2">
              <Link to="/checkout" className="text-black text-lg font-semi">Lanjutkan ke Pembayaran</Link>
            </button>
          </div>
        </div>
      </Container>
    </>
  )
}

type CartItemComponentProps = {
  cartItem: CartItem
  handleDeleteCartItem: (cartItemId: string) => void
  handleUpdateCartItem: (cartItemId: string, quantity: number, variantId?: string, note?: string) => void
}

function CartItemComponent({ cartItem, handleDeleteCartItem, handleUpdateCartItem }: CartItemComponentProps) {
  const variant = cartItem.product.variants.find(
    variant => variant.variantId.toString() === cartItem.selectedVariantId.toString()
  )

  return (
    <>
      <div className="flex pl-10 pr-2 p-1 bg-white rounded-md shadow-md gap-2 items-center">
        <div className="grow">
          <div className="flex gap-4 grow">
            <Link to={`/produk/${cartItem.product.productId}`}>
              <img src={cartItem.product.images ? cartItem.product.images[0] : ''} alt={cartItem.product.name} className="aspect-[6/9] w-12 object-cover rounded-md bg-gray-100 border border-gray-400 rounded" />
            </Link>
            <div className="flex flex-col gap-2 justify-center">
              <Link to={`/produk/${cartItem.product.productId}`}>
                <span className="font-semibold">{cartItem.product.name}</span>
              </Link>
              <Formik initialValues={{ selectedVariantId: cartItem.selectedVariantId }} onSubmit={(values) => { handleUpdateCartItem(cartItem.cartItemId.toString(), cartItem.quantity, values.selectedVariantId.toString()) }}>
                {({ submitForm }) => (
                  <Form className="w-28">
                    <Field as="select" name='selectedVariantId' className="w-full border border-gray-400 rounded" onBlur={submitForm}>
                      {cartItem.product.variants.map((variant, index) => (
                        <option key={index} value={variant.variantId.toString()}>{variant.type}</option>
                      ))}
                    </Field>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <span className="w-28 text-center">{formatToIdr(variant?.price ?? 0)}</span>
        <Formik initialValues={{ quantity: cartItem.quantity }} onSubmit={(values) => { handleUpdateCartItem(cartItem.cartItemId.toString(), values.quantity) }}>
          {({ submitForm, setFieldValue }) => (
            <Form className="w-14 flex justify-center">
              <Field name='quantity' type="number" className="w-12 text-center border border-gray-400 rounded rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" min={variant?.minQuantity} max={variant?.maxQuantity}
                onBlur={
                  (e: React.FocusEvent<HTMLInputElement>) => {
                    let value = parseInt(e.target.value)
                    if (variant) {
                      if (value < variant?.minQuantity) {
                        value = variant?.minQuantity
                      } else if (value > variant?.maxQuantity) {
                        value = variant?.maxQuantity
                      }
                    }
                    setFieldValue('quantity', value)
                    submitForm()
                  }
                }
              />
            </Form>
          )}
        </Formik>
        <span className="w-28 text-center">{formatToIdr((variant?.price ?? 0) * cartItem.quantity)}</span>
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


  const formattedSubtotal = formatToIdr(subtotal)

  return (
    <div className="bg-secondary-500 w-full p-8 rounded-md shadow-lg">
      <span className="text-xl font-semibold">Rincian</span>
      <hr className="bg-black my-2 border-black" />
      <div className="grid grid-cols-2">
        <span>Subtotal</span>
        <span className="text-end">{formattedSubtotal}</span>
      </div>
    </div>
  )
}