import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { useTransitionColor } from "../../contexts/TransitionColorContext";
import { CategoryColors, LighterBorderColors } from "../../components/user/core/Colors";
import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import { retrieveProducts } from "../../services/ProducApiService";
import UpperSection from "../../components/user/core/UpperSection"
import Container from "../../components/user/core/Container"


export default function ProductListView() {
  return (
    <>
      <UpperSection title="Produk Kami" subtitle="Kelezatan Dalam Setiap Kreasi" />
      <Container>
        <div className='grid grid-cols-3 lg:grid-cols-4 p-8 w-full gap-14'>
          <Card background='bg-tetriary-100' />
          <Card background='bg-tetriary-200' />
          <Card background='bg-tetriary-300' />
          <Card background='bg-tetriary-400' />
          <Card background='bg-tetriary-500' title="Bitter Ballen" picture="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fappetizersandpartyrecipes.com%2Fwp-content%2Fuploads%2F2018%2F12%2FBeef-Bitterballen-Recipe.jpg&f=1&nofb=1&ipt=b3bedaf3c32d4f7e8316ecb27dd440cdb2f85074518337f1f2bd1f818d851e97&ipo=images" />
        </div >
      </Container>
    </>
  )
}

type CardProps = {
  product: Product
}

function Card({ product }: CardProps) {
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
      <motion.div className={`aspect-[2/3] relative flex justify-center items-center ${LighterBorderColors[background]} border-4
       before:absolute before:-inset-0 before:rotate-6 ${beforeBackground[background]} hover:before:rotate-12 before:-z-10 before:transition-transform before:duration-300`} initial='default' whileHover='hover'>
        <motion.p className="absolute font-fancy text-2xl lg:text-3xl text-white text-shadow-sm overflow-hidden text-center" variants={hoverVariant}>
          {product.name}
        </motion.p>
        <img src={(product.images ? product.images[0] : '')} alt="" className="w-full h-full object-cover" />
      </motion.div>
    </Link>
  )
}