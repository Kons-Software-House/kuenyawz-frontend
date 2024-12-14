import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { motion } from "framer-motion";

import Backdrop from "../core/Backdrop";
import { useAuth } from "../../../contexts/AuthContext";
import { useModal } from "../../../contexts/ModalContext";
import Hidden from "../../../assets/Forms/Hidden.svg";
import Visible from "../../../assets/Forms/Visible.svg";

interface RegisterFormValues {
  fullName: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterModal() {
  const { setShowRegisterModal } = useModal();
  const { handleRegister, isAuthenticated, phone } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      setShowRegisterModal(false);
    }
  }, [isAuthenticated, setShowRegisterModal])

  const validateValues = (values: RegisterFormValues) => {
    const errors: Partial<RegisterFormValues> = {};

    if (values.fullName.length < 4) errors.fullName = 'Nama lengkap minimal 4 karakter';
    if (values.fullName.length > 128) errors.fullName = 'Nama lengkap maksimal 128 karakter';
    if (values.password.length < 8) errors.password = 'Kata sandi minimal 8 karakter';
    if (values.password !== values.confirmPassword) errors.confirmPassword = 'Kata sandi tidak sama';

    return errors;
  }

  return (
    <Backdrop onClose={() => { setShowRegisterModal(false) }} width="w-[25rem]">
      <div className="p-5 font-clear">
        <h1 className="text-2xl font-clear font-bold text-center tracking-wide">Daftar</h1>
        <div className="flex">
          <div className="text-text-dark w-full flex items-center justify-center">
            <p>
              +62 {phone.slice(0, 3)} {phone.slice(3, 7)} {phone.slice(7, 14)}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-8 py-4">
          <Formik initialValues={{ fullName: '', password: '', confirmPassword: '' }} onSubmit={(values) => { handleRegister(values.fullName, phone, values.password); }} validate={validateValues}>
            <Form className="flex flex-col gap-4" autoComplete='on'>
              <Field name="fullName" placeholder="Nama Lengkap" className="p-2 border border-gray-300 rounded" />
              <ErrorMessage name="fullName" component="p" className="text-red-500 text-sm" />
              <div className="relative">
                <Field name="password">
                  {({ field }: FieldProps<string, RegisterFormValues>) => (
                    <input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Kata Sandi"
                      className="p-2 border border-gray-300 rounded w-full"
                      autoComplete="off"
                    />
                  )}
                </Field>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img src={showPassword ? Visible : Hidden} alt="Show Password" className="w-4 h-4" />
                </button>
              </div>
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              <div className="relative">
                <Field name="confirmPassword">
                  {({ field }: FieldProps<string, RegisterFormValues>) => (
                    <input
                      {...field}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Konfirmasi Kata Sandi"
                      className="p-2 border border-gray-300 rounded w-full"
                      autoComplete="off"
                    />
                  )}
                </Field>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img src={showConfirmPassword ? Visible : Hidden} alt="Show Password" className="w-4 h-4" />
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm" />
              <RegisterButton />
            </Form>
          </Formik>
        </div>
      </div>
    </Backdrop>
  )
}


function RegisterButton() {
  const hoverVariant = {
    default: { width: "0%" },
    hover: { width: "100%" },
  }

  return (
    <motion.button className='border bg-secondary-200 hover:text-white transition ease-in-out duration-300 rounded-lg mt-3 h-10' type="submit">
      <motion.div className='relative z-50 flex h-10 justify-end hover:justify-start' initial="default" whileHover="hover">
        <p className="flex w-full justify-center items-center">
          Daftar
        </p>
        <motion.div variants={hoverVariant} className='absolute bg-tetriary-500 w-10 top-0 bottom-0 z-[-1] rounded-lg'>
        </motion.div>
      </motion.div>
    </motion.button >
  )
}