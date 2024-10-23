import { motion } from "framer-motion";


export default function Navbar() {
  return (
    <nav className={`w-full text-base font-nav text-xl bg-black/10 absolute z-10 h-16`}>
      <div className="h-full w-full text-inherit flex p-2 pt-6">
        <div className={"basis-3/12 flex items-center justify-start"}>
          <div className="text-inherit">
          </div>
        </div>
        <ul className="grow flex items-center justify-between text-inherit">
          <NavButton text="KREASI KAMI" href="/products" />
          <NavButton text="KALENDER" href="/calendar" />
          <NavButton text="KONTAK KAMI" href="/contact" />
          <NavButton text="KERANJANG" href="/cart" />
        </ul>
        <div className="basis-3/12 flex items-center justify-end text-inherit">
          <div className="text-inherit">
          </div>
        </div>
      </div>
    </nav >
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
    default: { color: "#101010" },
    hover: { color: "#FFFFFF" },
  }

  return (
    <li>
      <motion.a className="text-inherit lg:text-md flex items-end hover:items-start flex-col font-semibold tracking-wider" href={href} initial="default" whileHover="hover">
        <motion.p variants={textVariant}>
          {text}
        </motion.p>
        <motion.div className="h-1 bg-white" variants={textUnderlineVariant} />
      </motion.a>
    </li>
  )
}