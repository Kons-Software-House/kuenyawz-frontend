import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

import { useAuth } from "../../../contexts/AuthContext";
import { useModal } from "../../../contexts/ModalContext";
import CartIcon from "../../../assets/Navbar/Cart.svg"
import Main from "../../../assets/Navbar/Main.png"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modalContext = useModal()
  const { isAuthenticated, handleLogout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <motion.div>
      <nav className={`w-full text-base font-nav bg-black/10 fixed z-30 h-16 px-4 md:px-12 lg:text-xl flex items-center`}>
        <div className="h-full w-full flex items-center justify-between">
          <div className={"lg:basis-1/3 flex items-center justify-start"}>
            <Link to="/">
              <motion.img src={Main} className="h-10 md:h-12 mt-1 object-cover" />
            </Link>
          </div>

          <ul className="hidden md:flex grow items-center justify-center mx-6 space-x-6">
            <NavButton text="Produk" href="/menu" />
            <NavButton text="Kalender" href="/kalender" />
            <NavButton text="Tentang" href="/tentang-kami" />
          </ul>

          <div className="basis-1/3 flex items-center justify-end gap-4">
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div onClick={handleLogout}>
                  <div className="border-2 border-black rounded-lg text-sm lg:text-xl">
                    <motion.button
                      className="px-3 py-1 md:px-4 md:py-1 font-semibold"
                      whileHover={{ scale: 1.1 }}
                    >
                      Keluar
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div onClick={() => { modalContext.setShowLoginModal(true) }}>
                  <div className="border-2 border-black rounded-lg text-sm lg:text-xl">
                    <motion.button
                      className="px-3 py-1 md:px-4 md:py-1 font-semibold"
                      whileHover={{ scale: 1.1 }}
                    >
                      Masuk
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            <Link
              to={isAuthenticated ? "/keranjang" : "#"}
              onClick={() => {
                if (!isAuthenticated) {
                  modalContext.setShowLoginModal(true)
                }
              }}
            >
              <motion.img
                src={CartIcon}
                className="h-6 md:h-8"
                whileHover={{ scale: 1.1 }}
              />
            </Link>

            {/* Mobile Hamburger Menu */}
            <button
              className="md:hidden z-50 relative"
              onClick={toggleMenu}
            >
              <div className={`w-6 h-0.5 bg-black`} />
              <div className={`w-6 h-0.5 bg-black my-1 `} />
              <div className={`w-6 h-0.5 bg-black`} />
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 md:hidden z-40"
                onClick={toggleMenu}
              />

              {/* Slide-in Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
                className="fixed top-0 right-0 w-40 h-full bg-secondary-500 z-50 shadow-lg"
              >
                <Link to="/" onClick={() => { setIsMenuOpen(false) }} className='w-full flex items-center justify-center mt-2'>
                  <motion.img src={Main} className="h-8 mt-1 object-cover" />
                </Link>
                <div className="flex flex-col py-6 items-center w-full">
                  <ul className='font-nav tracking-wider font-bold text-lg w-full px-5'>
                    <NavButtonSmall text="Produk" href="/menu" setIsMenuOpen={setIsMenuOpen} />
                    <NavButtonSmall text="Kalender" href="/kalender" setIsMenuOpen={setIsMenuOpen} />
                    <NavButtonSmall text="Tentang" href="/tentang-kami" setIsMenuOpen={setIsMenuOpen} />
                    <li>
                      <button className='flex justify-between w-full' onClick={() => { isAuthenticated ? handleLogout() : modalContext.setShowLoginModal(true) }}>
                        <p className="text-lg font-bold tracking-[1.2px] text-black">
                          {isAuthenticated ? "Keluar" : "Masuk"}
                        </p>
                        <div>
                          [ ]
                        </div>
                      </button>
                      <hr className='bg-black mb-4' />
                    </li>
                  </ul>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.div >
  )
}

type NavButtonSmallProps = {
  text: string;
  href: string;
  setIsMenuOpen: (value: boolean) => void;
}

function NavButtonSmall(
  { text, href, setIsMenuOpen }: NavButtonSmallProps
) {
  return (
    <li>
      <Link to={href} onClick={() => setIsMenuOpen(false)}>
        <div className='flex justify-between w-full'>
          <p className="text-lg font-bold tracking-[1.2px] text-black">
            {text}
          </p>
          <div>
            [ ]
          </div>
        </div>
        <hr className='bg-black mb-4' />
      </Link>
    </li>
  )
}

type NavButtonProps = {
  text: string;
  href: string;
  onClick?: () => void;
}

function NavButton(
  { text, href, onClick }: NavButtonProps
) {
  const textUnderlineVariant = {
    default: { width: "0%" },
    hover: { width: "100%" },
  }

  const textVariant = {
    default: { color: "#000000" },
    hover: { color: "#888888" },
  }

  return (
    <li>
      <Link to={href} onClick={onClick}>
        <motion.div
          className="text-md flex items-end hover:items-start flex-col font-extrabold tracking-[1.2px] text-black"
          initial="default"
          whileHover="hover"
        >
          <motion.p variants={textVariant}>
            {text}
          </motion.p>
          <motion.div className="h-1 bg-black" variants={textUnderlineVariant} />
        </motion.div>
      </Link>
    </li>
  )
}