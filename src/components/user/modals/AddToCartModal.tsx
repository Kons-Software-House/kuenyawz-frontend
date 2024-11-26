import Backdrop from "../core/Backdrop";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useModal } from "../../../contexts/ModalContext";
import { useEffect, useState } from "react";
import { Variant } from "../../../types/Product";
import { addToUserCart } from "../../../services/UserApiService";
import { formatToIdr } from "../../../types/Formatter";
import { motion } from "framer-motion";
import { LighterBorderColors } from "../core/Colors";

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
    <Backdrop onClose={() => { setShowAddToCartModal(false) }} width="w-[32rem]">
      <div className="py-6 font-clear">
        <h1 className="text-xl font-clear font-bold text-center tracking-wide">Tambah ke Keranjang</h1>
        <Formik initialValues={{ quantity: minQuantity, note: '' }} onSubmit={(values) => { handleAddToCart(values) }} validate={validateValues}>
          {({ setFieldValue }) => (
            <Form className="flex flex-col gap-4 px-8 py-4">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold">Pilih Varian</span>
                <div className="flex gap-1">
                  {variants.map((variant, index) => (
                    <div
                      key={index}
                      className={`flex flex-col grow items-center justify-center p-1 rounded-md cursor-pointer ${selectedVariant === variant ? 'bg-secondary-100 text-white' : 'bg-white'}`}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setFieldValue('quantity', variant.minQuantity);
                      }}
                    >
                      <span className={`${selectedVariant === variant ? 'drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]' : ''} font-semibold`}>{variant.type}</span>
                      <span className={`${selectedVariant === variant ? 'drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]' : ''}`}>{formatToIdr(variant.price)} / pc</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-semibold">Jumlah</span>
                <Field name="quantity" type="number" placeholder="Jumlah" className="px-2 py-1 border border-gray-300 rounded" />
              </div>
              <ErrorMessage name="quantity" component="p" className="text-red-500 text-sm" />
              <div className="grid grid-cols-2">
                <span className="font-semibold">Catatan</span>
                <Field name="note" placeholder="Catatan" className="px-2 py-1 border border-gray-300 rounded" />
              </div>
              <ErrorMessage name="note" component="p" className="text-red-500 text-sm" />
              {/* <button className="bg-secondary-100 text-white p-2 rounded-md" type="submit">Tambah ke Keranjang</button> */}
              <AddToCartButton />
            </Form>
          )}
        </Formik>
      </div>
    </Backdrop>
  )
}

function AddToCartButton() {
  const hoverVariant = {
    default: { width: "10%", top: "50%", left: "90%", x: "-50%", y: "-50%", transition: { duration: 0.3 } },
    hover: { width: "100%", top: "0%", left: "0%", x: "0%", y: "0%", transition: { duration: 0.3 } },
  }

  const floatingAnimation = {
    // x: [10, -20, 10],
    scaleX: [0.8, 1, 0.8], // slight scaling to make it "bounce"
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: "easeInOut",
    },
  };

  return (
    <div className={`border-8 ${LighterBorderColors['bg-secondary-200']} p-2 flex flex-col gap-2 rounded-2xl`}>
      <motion.button type="submit" className={`bg-secondary-100 grow text-white hover:text-black transition ease-in-out duration-300 rounded-xl h-12`}>
        <motion.div className='relative z-50 flex h-full' initial="default" whileHover="hover">
          <p className={`flex w-full justify-center items-center font-bold tracking-wide text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:drop-shadow`}>
            Tambah Ke Keranjang --/
          </p>
          <motion.div variants={hoverVariant} animate={floatingAnimation} className={`absolute w-10 bg-secondary-500 bottom-0 z-[-1] rounded-xl`}>
          </motion.div>
        </motion.div>
      </motion.button >
    </div>
  )
}