import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LighterBorderColors } from "./Colors";
import { useTransitionColor } from "../../contexts/TransitionColorContext";

type ProductCardProps = {
  background: 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500'
  picture?: string
  title?: string
}

export default function ProductCard({ background, picture, title }: ProductCardProps) {
  const { setTransitionColor } = useTransitionColor();
  const beforeBackground = {
    'bg-tetriary-100': 'before:bg-tetriary-100',
    'bg-tetriary-200': 'before:bg-tetriary-200',
    'bg-tetriary-300': 'before:bg-tetriary-300',
    'bg-tetriary-400': 'before:bg-tetriary-400',
    'bg-tetriary-500': 'before:bg-tetriary-500',
    'bg-tetriary-600': 'before:bg-tetriary-600',
  }
  const hoverVariant = {
    default: { x: "20%", opacity: 0 },
    hover: { x: "0%", opacity: 1 },
  }
  return (
    <Link to="/produk" onClick={() => { setTransitionColor(background) }}>
      <motion.div className={`aspect-[2/3] relative flex justify-center items-center ${LighterBorderColors[background]} border-4
         before:absolute before:-inset-0 before:rotate-6 ${beforeBackground[background]} hover:before:rotate-12 before:-z-10 before:transition-transform before:duration-300`} initial='default' whileHover='hover'>
        <motion.p className="absolute font-fancy text-2xl lg:text-3xl text-white text-shadow-sm overflow-hidden text-center" variants={hoverVariant}>
          {title}
        </motion.p>
        <img src={picture} alt="" className="w-full h-full object-cover" />
      </motion.div>
    </Link>
  )
}