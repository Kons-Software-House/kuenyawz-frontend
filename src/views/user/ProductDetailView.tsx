import { motion, useScroll, useTransform } from "framer-motion"
import { CategoryColors, LighterBorderColors } from '../../components/user/core/Colors';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import { retrieveProductById } from "../../services/ProducApiService";
import Container from "../../components/user/core/Container"
import UpperSection from "../../components/user/core/UpperSection"
import ProductCard from "../../components/user/core/ProductCard";
import LoadingLayer from "../../components/user/core/LoadingLayer";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProduct() {
    if (productId) {
      try {
        const response = await retrieveProductById(productId)
        setProduct(response)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      console.error("Product ID is undefined")
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <>
      {isLoading ? <LoadingLayer /> : product &&
        <>
          <UpperSection title={product.name} background={CategoryColors[product.category] as 'bg-secondary-200' | 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500'} />
          <Container>
            <div className="grid grid-cols-6 lg:grid-cols-11 gap-10 w-full mb-4 -mt-20">
              <Column span2={false} moveRange={40}>
                <p className="font-semi text-xl md:text-2xl lg:text-3xl mb-4 object-cover font-semibold">
                  {product.tagline}
                </p>
                <div className={`overflow-hidden aspect-[3/4.5] bg-gray-100 w-full rounded-lg border-8 ${LighterBorderColors[CategoryColors[product.category as keyof typeof CategoryColors] as keyof typeof LighterBorderColors]} rounded-lg`}>
                  <img className="aspect-[3/4.5] w-full object-cover rounded-lg shadow-md scale-105 hover:scale-110 transition ease-in-out duration-300" draggable="false" alt="Product" src={product.images[0]} />
                </div>
                <div className="lg:h-12 lg:w-full">
                </div>
              </Column>
              <Column span2={false} moveRange={0}>
                <p className="font-poppins sm:text-mds md:text-md lg:text-lg xl:text-xl mb-4 text-justify tracking-tight pb-2">
                  {product.description}
                </p>
                <div className={`overflow-hidden aspect-[1/1] bg-gray-100 w-full rounded-lg border-8 ${LighterBorderColors[CategoryColors[product.category as keyof typeof CategoryColors] as keyof typeof LighterBorderColors]} rounded-lg`}>
                  <img className="aspect-[1/1] w-full object-cover rounded-lg shadow-md scale-105 hover:scale-110 transition ease-in-out duration-300" draggable="false" alt="Product" src={product.images[1]} />
                </div>
              </Column>
              <Column span2={true} moveRange={20}>
                <div className={`overflow-hidden aspect-[10/12] bg-gray-100 w-full rounded-lg border-8 ${LighterBorderColors[CategoryColors[product.category as keyof typeof CategoryColors] as keyof typeof LighterBorderColors]} rounded-lg`}>
                  <img className="aspect-[10/12] w-full scale-105 hover:scale-110 transition ease-in-out duration-300" draggable="false" alt="Product" src={product.images[2]} />
                </div>
                <AddToCartButton color={CategoryColors[product.category] as 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500'} />
              </Column>
            </div>
          </Container>
          <div className={`absolute left-0 right-0 -mt-[16rem] md:h-[6rem] -z-10 ${`a`}`} />
          <Container>
            <h4 className="w-full text-center text-3xl font-semi mt-4">Cocok ditambah dengan</h4>
            <div className="flex mt-6 w-full lg:w-5/6 p-8 gap-20 justify-between">
              <div className="bg-gray-100 aspect-[1/1] w-1/4">
                <ProductCard background="bg-tetriary-100" title="Baller" />
              </div>
              <div className="bg-gray-100 aspect-[1/1] w-1/4">
                <ProductCard background="bg-tetriary-300" title="Baller" />
              </div>
              <div className="bg-gray-100 aspect-[1/1] w-1/4">
                <ProductCard background="bg-tetriary-400" title="Baller" />
              </div>
            </div>
          </Container>
        </>
      }
    </>
  )
}

type ColumnProps = {
  span2: boolean
  children?: React.ReactNode
  moveRange: number
}

function Column({ span2, children, moveRange }: ColumnProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -moveRange]);

  return (
    <motion.div className={"" + (span2 ? "col-span-6 lg:col-span-5" : "col-span-3")} style={{ y }}>
      <div className="flex items-end justify-end flex h-full w-full">
        <div className="w-full flex flex-col gap-2">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

function AddToCartButton({ color }: { color: 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500' }) {
  const hoverVariant = {
    default: { width: "10%", top: "50%", left: "80%", x: "-50%", y: "-50%", transition: { duration: 0.3 } },
    hover: { width: "100%", top: "0%", left: "0%", x: "0%", y: "0%", transition: { duration: 0.3 } },
  }

  const floatingAnimation = {
    // x: [10, -20, 10],
    scaleX: [0.8, 1, 0.8], // slight scaling to make it "bounce"
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: "easeInOut",
    },
  };

  return (
    <div className={`border-8 ${LighterBorderColors[color]} p-2 flex flex-col gap-2 rounded-2xl`}>
      <motion.a className={`${color} grow text-white hover:text-black transition ease-in-out duration-300 rounded-xl h-12`} href="/">
        <motion.div className='relative z-50 flex h-full' initial="default" whileHover="hover">
          <p className={`flex w-full justify-center items-center font-bold tracking-wide text-lg`}>
            Tambah Ke Keranjang --/
          </p>
          <motion.div variants={hoverVariant} animate={floatingAnimation} className={`absolute w-10 bg-secondary-500 bottom-0 z-[-1] rounded-xl`}>
          </motion.div>
        </motion.div>
      </motion.a >
    </div>
  )
}