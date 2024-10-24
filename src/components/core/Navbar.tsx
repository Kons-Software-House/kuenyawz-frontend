import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Icon from "../../assets/Navbar/Logo.png"
import UserIcon from "../../assets/Navbar/UserIcon.png"

export default function Navbar() {
  return (
    <motion.div exit={{ rotate: -180, transition: { duration: 2 } }} transition={{ duration: 3 }}>
      <nav className={`w-full text-base font-nav text-xl bg-black/10 absolute z-20 h-16`}>
        <div className="h-full w-full text-inherit flex gap-4">
          <div className={"basis-3/12 flex items-center justify-end"}>
            <Link to="/">
              <img src={Icon} className="aspect-[4/2] h-14 mt-1 object-cover brightness-75 hover:brightness-125" />
            </Link>
          </div>
          <ul className="grow flex items-center">
            <NavButton text="Produk Kami" href="/products" />
            <NavButton text="Kalender" href="/calendar" />
            <NavButton text="Tentang Kami" href="/contact" />
          </ul>
          <div className="basis-3/12 flex items-center justify-end gap-4">
            <Link to="/login">
              <div className="border-2 border-black rounded-lg">
                <motion.button className="px-4 py-1" whileHover={{ scale: 1.1 }}>
                  Masuk
                </motion.button>
              </div>
            </Link>
            <Link to="/cart">
              <motion.img src={CartIcon} className="h-8" whileHover={{ scale: 1.1 }} />
            </Link>
          </div>
        </div>
      </nav >
    </motion.div>
  )
}

type NavButtonProps = {
  text: string;
  href: string;
}

function NavButton(
  { text, href }: NavButtonProps
) {

  const textUnderlineVariant = {
    default: { width: "0%" },
    hover: { width: "100%" },
  }

  const textVariant = {
    default: { color: "#000000" },
    hover: { color: "#FFFFFF" },
  }

  return (
    <li className="grow flex justify-center mt-4">
      <Link to={href}>
        <motion.div className="text-inherit lg:text-md flex items-end hover:items-start flex-col font-semibold tracking-wider" initial="default" whileHover="hover">
          <motion.p variants={textVariant}>
            {text}
          </motion.p>
          <motion.div className="h-1 bg-white" variants={textUnderlineVariant} />
        </motion.div>
      </Link>
    </li>
  )
}