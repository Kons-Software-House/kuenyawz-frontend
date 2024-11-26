import Backdrop from "../core/Backdrop";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useModal } from "../../../contexts/ModalContext";
import { useEffect, useState } from "react";
import { Variant } from "../../../types/Product";
import { addToUserCart } from "../../../services/UserApiService";

type AddToCartModalProps = {
  variants: Variant[];
}

export default function AddToCartModal({ variants }: AddToCartModalProps) {
  const { setShowAddToCartModal } = useModal();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(variants.length > 0 ? variants[0] : null);
  const [minQuantity, setMinQuantity] = useState(selectedVariant?.minQuantity || 1);

  const validateValues = (values: { quantity: number }) => {
    const errors: Partial<{ quantity: string }> = {};

    if (selectedVariant) {
      if (values.quantity < selectedVariant?.minQuantity) errors.quantity = `Jumlah minimal ${selectedVariant?.minQuantity || 1}`;
    }

    return errors;
  }

  useEffect(() => {
    console.log(selectedVariant?.minQuantity)
    setMinQuantity(selectedVariant?.minQuantity || 1)
  }, [selectedVariant])

  const handleAddToCart = async (values: { quantity: number, note: string }) => {
    if (selectedVariant) {
      await addToUserCart(selectedVariant.variantId.toString(), values.quantity, values.note)
      setShowAddToCartModal(false)
    }
  }

  return (
    <Backdrop onClose={() => { setShowAddToCartModal(false) }}>
      <div className="py-4">
        <h1 className="text-2xl font-clear font-bold text-center tracking-wide">Tambah ke Keranjang</h1>
        <Formik initialValues={{ quantity: minQuantity, note: '' }} onSubmit={(values) => { handleAddToCart(values) }} validate={validateValues}>
          <Form className="flex flex-col gap-4 px-8 py-4">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Pilih Varian</span>
              <div className="flex gap-2">
                {variants.map((variant, index) => (
                  <div key={index} className={`flex flex-col grow items-center justify-center p-2 rounded-md cursor-pointer ${selectedVariant === variant ? 'bg-secondary-100 text-white' : 'bg-white'}`} onClick={() => setSelectedVariant(variant)}>
                    <span>{variant.type}</span>
                    <span>Rp {variant.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-lg font-semibold">Jumlah</span>
              <Field name="quantity" type="number" placeholder="Jumlah" className="p-2 border border-gray-300 rounded" />
            </div>
            <ErrorMessage name="quantity" component="p" className="text-red-500 text-sm" />
            <div className="grid grid-cols-2">
              <span className="text-lg font-semibold">Catatan</span>
              <Field name="note" placeholder="Catatan" className="p-2 border border-gray-300 rounded" />
            </div>
            <ErrorMessage name="note" component="p" className="text-red-500 text-sm" />
            <button className="bg-secondary-100 text-white p-2 rounded-md" type="submit">Tambah ke Keranjang</button>
          </Form>
        </Formik>
      </div>
    </Backdrop>
  )
}