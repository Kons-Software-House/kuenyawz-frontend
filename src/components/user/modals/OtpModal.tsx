import Backdrop from "../core/Backdrop";

import { Formik, Form, Field, FieldProps } from "formik";
import { motion } from "framer-motion";
import { useModal } from "../../../contexts/ModalContext";
import { useAuth } from "../../../contexts/AuthContext";

interface OtpFormValues {
  phone: string;
}

export default function OtpModal() {
  const { setShowLoginModal, setShowOtpModal, setShowRegisterModal } = useModal();
  const { otpCountdown, handleSendOtp, handleVerifyOtp } = useAuth();

  return (
    <Backdrop onClose={() => { setShowOtpModal(false) }}>
      <div className="p-5">
        <h1 className="text-2xl font-clear font-bold text-center tracking-wide">Daftar</h1>
        <div className="flex flex-col gap-4 px-8 py-4">
          <Formik initialValues={{ phone: '' }} onSubmit={(values) => { handleSendOtp(values.phone) }}>
            <Form className="flex flex-col gap-4">
              <div className="flex w-full">
                <div className="bg-gray-200 w-12 flex items-center justify-center border border-gray-300 rounded">
                  <p className="font-semibold">
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
              {
                otpCountdown > 0 ? (
                  <button type="submit" className="text-text-light rounded-lg underline w-20" disabled={true}>Kirim ulang OTP ({otpCountdown})</button>
                ) : (
                  <button type="submit" className="text-text-light rounded-lg underline w-20 font-bold">Kirim OTP</button>
                )
              }
            </Form>
          </Formik>
          <Formik initialValues={{ otp: '' }} onSubmit={async (values) => { (await handleVerifyOtp(values.otp)) ? (setShowRegisterModal(true), setShowOtpModal(false)) : null }}>
            <Form className="flex flex-col gap-4">
              <Field name="otp">
                {({ field, form }: FieldProps<string, OtpFormValues>) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Kode OTP"
                    className="p-2 border border-gray-300 rounded"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      // Only allow numbers
                      const numbersOnly = value.replace(/[^\d]/g, '');

                      form.setFieldValue('otp', numbersOnly);

                      // 6 digits max
                      if (numbersOnly.length > 6) {
                        form.setFieldValue('otp', numbersOnly.slice(0, 6));
                      }
                    }}
                  />
                )}
              </Field>
              <VerifyButton />
            </Form>
          </Formik>
          <button className="text-center text-text-light underline underline-offset-2" type="button" onClick={() => { setShowLoginModal(true); setShowOtpModal(false) }}>Sudah punya akun? Login di sini</button>
        </div>
      </div>
    </Backdrop >
  )
}

function VerifyButton() {

  return (
    <motion.button className='border bg-secondary-200 hover:text-white transition ease-in-out duration-300 rounded-lg mt-3 h-10' type="submit" >
      <motion.div className='relative z-50 flex h-10 justify-end hover:justify-start' initial="default" whileHover="hover">
        <p className="flex w-full justify-center items-center">
          Lanjut
        </p>
      </motion.div>
    </motion.button >
  )
}