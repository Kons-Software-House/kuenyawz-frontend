import Backdrop from "../core/Backdrop";
import OtpProvider from "../../../contexts/OtpContext";

import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { useModal } from "../../../contexts/ModalContext";
import { useOtp } from "../../../contexts/OtpContext";

interface OtpFormValues {
  phone: string;
}

export default function OtpModal() {
  const { setShowLoginModal, setShowOtpModal } = useModal();
  const { sendOtp, otpCountdown } = useOtp();


  const validateValues = (values: OtpFormValues) => {
    const errors: Partial<OtpFormValues> = {};

    if (values.phone.length < 8) errors.phone = 'Nomor telepon minimal 8 digit';

    return errors;
  }

  return (
    <OtpProvider>
      <Backdrop onClose={() => { setShowOtpModal(false) }}>
        <div className="p-5">
          <h1 className="text-2xl font-clear font-bold text-center tracking-wide">Daftar</h1>
          <div className="flex flex-col gap-4 px-8 py-4">
            <Formik initialValues={{ phone: '', password: '', verifyPassword: '' }} onSubmit={(values) => { console.log(values) }} validate={validateValues}>
              <Form className="flex flex-col gap-4">
                <div className="flex">
                  <div className="text-text-dark bg-white w-12 flex items-center justify-center border border-gray-300 rounded">
                    <p>
                      +62
                    </p>
                  </div>
                  <Field name="phone">
                    {({ field, form }: FieldProps<string, OtpFormValues>) => (
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
                <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
                {/* button to send otp */}

                {/* <Field name="password" type="password" placeholder="Kata Sandi" className="p-2 border border-gray-300 rounded" autoComplete="off" />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              <Field name="verifyPassword" type="password" placeholder="Ulangi Kata Sandi" className="p-2 border border-gray-300 rounded" autoComplete="off" />
              <ErrorMessage name="verifyPassword" component="p" className="text-red-500 text-sm" /> */}
                <RegisterButton />
              </Form>
            </Formik>
            <button className="text-center text-text-light underline underline-offset-2" type="button" onClick={() => { setShowLoginModal(true); setShowOtpModal(false) }}>Sudah punya akun? Login di sini</button>
          </div>
        </div>
      </Backdrop>
    </OtpProvider>
  )
}

function RegisterButton() {
  const hoverVariant = {
    default: { width: "0%" },
    hover: { width: "100%" },
  }

  return (
    <motion.button className='border bg-secondary-200 hover:text-white transition ease-in-out duration-300 rounded-lg mt-3 h-10' type="submit" >
      <motion.div className='relative z-50 flex h-10 justify-end hover:justify-start' initial="default" whileHover="hover">
        <p className="flex w-full justify-center items-center">
          Kirim Kode OTP
        </p>
        <motion.div variants={hoverVariant} className='absolute bg-tetriary-500 w-10 top-0 bottom-0 z-[-1] rounded-lg'>
        </motion.div>
      </motion.div>
    </motion.button >
  )
}