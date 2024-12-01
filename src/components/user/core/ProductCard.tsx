import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { CategoryColors, LighterBorderColors } from "./Colors";
import { Product } from "../../../types/Product";
import { useTransitionColor } from "../../../contexts/TransitionColorContext";
import React from "react";

type ProductCardProps = {
  product: Product
}

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  const { setTransitionColor } = useTransitionColor();
  const background = CategoryColors[product.category] as "bg-tetriary-100" | "bg-tetriary-200" | "bg-tetriary-300" | "bg-tetriary-400" | "bg-tetriary-500";
  const beforeBackground = {
    'bg-tetriary-100': 'before:bg-tetriary-100',
    'bg-tetriary-200': 'before:bg-tetriary-200',
    'bg-tetriary-300': 'before:bg-tetriary-300',
    'bg-tetriary-400': 'before:bg-tetriary-400',
    'bg-tetriary-500': 'before:bg-tetriary-500',
  }
  const hoverVariant = {
    default: { x: "20%", opacity: 0 },
    hover: { x: "0%", opacity: 1 },
  }
  return (
    <Link to={`/produk/${product.productId}`} onClick={() => { setTransitionColor(background) }}>
      <motion.div className={`relative aspect-[2/3] relative flex justify-center items-center ${LighterBorderColors[background]} border-4
       before:absolute before:-inset-0 before:rotate-6 ${beforeBackground[background]} hover:before:rotate-12 before:-z-10 before:transition-transform before:duration-300`} initial='default' whileHover='hover'>
        <motion.p className="absolute font-fancy text-lg sm:text-2xl xl:text-3xl text-white text-shadow-sm overflow-hidden text-center" variants={hoverVariant}>
          {product.name}
        </motion.p>
        <img src={(product.images ? product.images[0] : '')} alt="" className="w-full h-full object-cover" />
        <div className={`absolute bottom-0 left-0 right-0 text-[0.4rem] sm:text-xs text-center block lg:hidden bg-white`}>
          {product.name}
        </div>
      </motion.div>
    </Link>
  )
})