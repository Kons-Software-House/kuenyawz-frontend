import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";

import Backdrop from "../core/Backdrop";
import { useModal } from "../../../contexts/ModalContext";

export default function RegisterModal() {
  const { setShowLoginModal, setShowRegisterModal } = useModal();
  return (
    <Backdrop onClose={() => { setShowRegisterModal(false) }}>
      <div className="p-5">
        <h1 className="text-2xl font-clear font-bold text-center tracking-wide">Daftar</h1>
        <div className="flex flex-col gap-4 px-8 py-4">
          <Formik initialValues={{ phone: '', password: '' }} onSubmit={(values) => { console.log(values) }}>
            <Form className="flex flex-col gap-4">
              <Field name="phone" type="text" placeholder="Nomor Telepon" className="p-2 border border-gray-300 rounded" />
              <Field name="password" type="password" placeholder="Kata Sandi" className="p-2 border border-gray-300 rounded" />
              <Field name="password" type="password" placeholder="Ulangi Kata Sandi" className="p-2 border border-gray-300 rounded" />
              <RegisterButton onClick={() => { setShowRegisterModal(false) }}>
              </RegisterButton>
            </Form>
          </Formik>
          <p className="text-center text-gray-500">Atau masuk menggunakan metode berikut</p>
          <button className="text-center text-text-light underline underline-offset-2" type="button" onClick={() => { setShowLoginModal(true); setShowRegisterModal(false) }}>Sudah punya akun? Login di sini</button>
        </div>
      </div>
    </Backdrop>
  )
}

type LoginButtonProps = {
  onClick: () => void;
}

function RegisterButton({ onClick }: LoginButtonProps) {
  const hoverVariant = {
    default: { width: "0%" },
    hover: { width: "100%" },
  }

  return (
    <motion.button className='border bg-secondary-200 hover:text-white transition ease-in-out duration-300 rounded-lg mt-3 h-10' type="submit" onClick={onClick}>
      <motion.div className='relative z-50 flex h-10 justify-end hover:justify-start' initial="default" whileHover="hover">
        <p className="flex w-full justify-center items-center">
          Masuk
        </p>
        <motion.div variants={hoverVariant} className='absolute bg-tetriary-500 w-10 top-0 bottom-0 z-[-1] rounded-lg'>
        </motion.div>
      </motion.div>
    </motion.button >
  )
}