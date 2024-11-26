import { useEffect, useState } from "react";
import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import { motion } from "framer-motion";

import Backdrop from "../core/Backdrop";
import { useAuth } from "../../../contexts/AuthContext";
import { useModal } from "../../../contexts/ModalContext";
import Hidden from "../../../assets/Forms/hidden.svg";
import Visible from "../../../assets/Forms/visible.svg";

interface LoginFormValues {
  phone: string;
  password: string;
}

export default function LoginModal() {
  const { setShowLoginModal, setShowOtpModal } = useModal();
  const { handleLogin, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated, setShowLoginModal])

  const validateValues = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};

    if (values.phone.length < 8) errors.phone = 'Nomor telepon minimal 8 digit';

    return errors;
  }

  return (
    <Backdrop onClose={() => { setShowLoginModal(false) }} width="w-[25rem]">
      <div className="p-5 font-clear">
        <h1 className="text-2xl font-clear font-bold text-center tracking-wide">Masuk</h1>
        <div className="flex flex-col gap-4 px-8 py-4">
          <Formik initialValues={{ phone: '', password: '' }} onSubmit={(values) => { handleLogin(values.phone, values.password); }} validate={validateValues}>
            <Form className="flex flex-col gap-4" autoComplete='on'>
              <div className="flex">
                <div className="bg-gray-200 w-12 flex items-center justify-center border border-gray-300 rounded">
                  <p className="font-semibold">
                    +62
                  </p>
                </div>
                <Field name="phone">
                  {({ field, form }: FieldProps<string, LoginFormValues>) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Nomor Telepon"
                      className="p-2 border border-gray-300 rounded w-full"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        // Only allow numbers
                        const numbersOnly = value.replace(/[^\d]/g, '');

                        if (
                          numbersOnly === '' ||
                          !numbersOnly.startsWith('0') ||
                          (field.value && e.target.selectionStart !== 0)
                        ) {
                          form.setFieldValue('phone', numbersOnly);
                        }

                        // 12 digits max
                        if (numbersOnly.length > 12) {
                          form.setFieldValue('phone', numbersOnly.slice(0, 12));
                        }
                      }}
                    />
                  )}
                </Field>
              </div>
              <ErrorMessage name="phone" component="div" className="text-red-500" />
              <div className="relative">
                <Field name="password">
                  {({ field }: FieldProps<string, LoginFormValues>) => (
                    <input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Kata Sandi"
                      className="p-2 border border-gray-300 rounded w-full"
                      autoComplete="on"
                    />
                  )}
                </Field>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <img src={Visible} alt="show password" className="w-4 h-4" /> : <img src={Hidden} alt="hide password" className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end px-2  text-text-dark underline  underline-offset-2">
                <a href="/resetpassword"> Lupa Kata Sandi?</a>
              </div>
              <LoginButton />
            </Form>
          </Formik>
          <button className="text-center text-text-dark underline underline-offset-2" type="button" onClick={() => { setShowLoginModal(false); setShowOtpModal(true) }}>
            Belum punya akun? Daftar di sini
          </button>
        </div>
      </div>
    </Backdrop>
  )
}


function LoginButton() {
  const hoverVariant = {
    default: { width: "0%" },
    hover: { width: "100%" },
  }

  return (
    <motion.button className='border bg-secondary-200 hover:text-white transition ease-in-out duration-300 rounded-lg mt-3 h-10' type="submit">
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