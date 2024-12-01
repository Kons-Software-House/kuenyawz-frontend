import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion"
import { useParams } from "react-router-dom";
import { Forward } from "lucide-react";

import { Product } from "../../types/Product";
import { useModal } from "../../contexts/ModalContext";
import { retrieveProductById, retrieveRecommendedProducts } from "../../services/ProducApiService";
import { LighterBorderColors, CategoryColors, LighterBackgroundColors } from '../../components/user/core/Colors';
import { ProductCard } from "../../components/user/core/ProductCard";
import { useAuth } from "../../contexts/AuthContext";
import Container from "../../components/user/core/Container"
import LoadingLayer from "../../components/user/core/LoadingLayer";
import UpperSection from "../../components/user/core/UpperSection"
import AddToCartModal from "../../components/user/modals/AddToCartModal";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const { setShowAddToCartModal, showAddToCartModal, setShowLoginModal } = useModal();
  const { isAuthenticated } = useAuth();

  const fetchProduct = async () => {
    if (productId) {
      try {
        setIsLoading(true)
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

  const fetchRecommendedProducts = async () => {
    try {
      setIsRecommendedLoading(true)
      const response = await retrieveRecommendedProducts(productId || "")
      setRecommendedProducts(response.products)
    } catch (error) {
      console.error(error)
    } finally {
      setIsRecommendedLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (isAuthenticated) {
      setShowAddToCartModal(true)
    } else {
      setShowLoginModal(true)
    }
  }

  useEffect(() => {
    fetchProduct()
    fetchRecommendedProducts()
  }, [productId])

  return (
    <>
      {isLoading ? <LoadingLayer /> : product &&
        <>
          {showAddToCartModal && <AddToCartModal variants={product.variants} />}
          <UpperSection title={product.name} background={CategoryColors[product.category] as 'bg-secondary-200' | 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500'} />
          <Container>
            <div className="grid grid-cols-6 sm:grid-cols-11 gap-2 sm:gap-10 w-full mb-4 md:-mt-8 lg:-mt-20">
              <Column span2={false} moveRange={40}>
                <p className="font-semi text-xl md:text-2xl sm:text-3xl mb-4 object-cover font-semibold order-last sm:order-first">
                  {product.tagline}
                </p>
                <div className={`overflow-hidden aspect-[3/4.5] bg-gray-100 w-full rounded-lg border-4 sm:border-8 ${LighterBorderColors[CategoryColors[product.category as keyof typeof CategoryColors] as keyof typeof LighterBorderColors]} rounded-lg`}>
                  <img className="aspect-[3/4.5] w-full object-cover rounded-lg shadow-md scale-105 hover:scale-110 transition ease-in-out duration-300" draggable="false" alt="Product" src={product.images[0]} />
                </div>
                <div className="sm:h-12 sm:w-full">
                </div>
              </Column>
              <Column span2={false} moveRange={0}>
                <p className="font-poppins sm:text-mds md:text-md sm:text-lg xl:text-xl mb-4 text-justify tracking-tight pb-2 order-last sm:order-first">
                  {product.description}
                </p>
                <div className="h-12 w-full order-last sm:hidden">
                </div>
                <div className={`overflow-hidden aspect-[1/1] bg-gray-100 w-full rounded-lg border-4 sm:border-8 ${LighterBorderColors[CategoryColors[product.category as keyof typeof CategoryColors] as keyof typeof LighterBorderColors]} rounded-lg`}>
                  <img className="aspect-[1/1] w-full object-cover rounded-lg shadow-md scale-105 hover:scale-110 transition ease-in-out duration-300" draggable="false" alt="Product" src={product.images[1]} />
                </div>
              </Column>
              <Column span2={true} moveRange={20}>
                <div className={`overflow-hidden aspect-[10/12] bg-gray-100 w-full rounded-lg border-4 sm:border-8  ${LighterBorderColors[CategoryColors[product.category as keyof typeof CategoryColors] as keyof typeof LighterBorderColors]} rounded-lg`}>
                  <img className="aspect-[10/12] w-full scale-105 hover:scale-110 transition ease-in-out duration-300" draggable="false" alt="Product" src={product.images[2]} />
                </div>
                <div className="hidden sm:block">
                  <AddToCartButton color={CategoryColors[product.category] as 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500'} onClick={handleAddToCart} />
                </div>
              </Column>
            </div>
            <div className="block sm:hidden w-full">
              <AddToCartButton color={CategoryColors[product.category] as 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500'} onClick={handleAddToCart} />
            </div>
            <h4 className="w-full text-center text-xl sm:text-3xl font-semi mt-4">Cocok ditambah dengan</h4>
            <div className="w-full flex justify-center">
              <div className="flex mt-6 w-full sm:p-8 sm:gap-20 justify-between mb-4">
                {isRecommendedLoading ? <div>Loading</div> : recommendedProducts.map((product, index) => (
                  <div key={`product-${productId}-${product.productId.toString()}-${index}`} className="bg-gray-100 aspect-[1/1] w-1/4">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </Container>
          <div className={`hidden sm:block absolute left-0 right-0 -mt-[46rem] xl:-mt-[50rem] md:h-[6rem] -z-10 ${LighterBackgroundColors[CategoryColors[product.category as keyof typeof CategoryColors] as keyof typeof LighterBackgroundColors]}`} />
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
    <motion.div className={"" + (span2 ? "col-span-6 sm:col-span-5 order-first sm:order-last " : "col-span-3 ")} style={{ y }}>
      <div className="flex items-end justify-end flex h-full w-full">
        <div className="flex flex-col gap-2 w-full">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

type AddToCartButtonProps = {
  color: 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500'
  onClick: () => void
}

function AddToCartButton({ color, onClick }: AddToCartButtonProps) {
  const hoverVariant = {
    default: { width: "10%", top: "50%", left: "82%", x: "-50%", y: "-50%", transition: { duration: 0.3 } },
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
    <div className={`border-8 ${LighterBorderColors[color]} border-double p-1 flex flex-col gap-2 rounded-2xl`}>
      <motion.button className={`${color} grow text-white hover:text-black transition ease-in-out duration-300 rounded-xl h-12`} onClick={onClick}>
        <motion.div className='relative z-50 flex h-full' initial="default" whileHover="hover">
          <div className={`flex w-full justify-center items-center font-bold tracking-wide text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:drop-shadow`}>
            Tambah Ke Keranjang
            <Forward size={24} className="ml-1 mb-1" />
          </div>
          <motion.div variants={hoverVariant} animate={floatingAnimation} className={`absolute w-10 bg-secondary-500 bottom-0 z-[-1] rounded-xl`}>
          </motion.div>
        </motion.div>
      </motion.button >
    </div>
  )
}