import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { useTransitionColor } from "../../contexts/TransitionColorContext";
import { LighterBorderColors } from "../../components/user/core/Colors";
import UpperSection from "../../components/user/core/UpperSection"
import Container from "../../components/user/core/Container"

export default function ProductListView() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  async function fetchProducts(newPage?: number, newKeyword?: string, newCategory?: string) {
    setIsLoading(true);

    const currentKeyword = newKeyword !== undefined ? newKeyword : keyword;
    const currentCategory = newCategory !== undefined ? newCategory : category;
    const currentPage = newPage !== undefined ? newPage : page;

    try {
      const params = {
        keyword: currentKeyword,
        page: currentPage,
        category: currentCategory,
        pageSize: 12,
        available: true
      };

      const response = await retrieveProducts(params);
      const { content, totalPages } = response;

      setProducts(content);
      setTotalPages(totalPages);
      setPage(currentPage);
      setKeyword(currentKeyword);
      setCategory(currentCategory);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <>
      <UpperSection title="Produk Kami" subtitle="Kelezatan Dalam Setiap Kreasi" />
      <Container>
        <div className="border-2 border-secondary-100 w-full flex">
          {/* Filters */}
          <div className="border-r-2 border-secondary-100 px-1">
            <select name="category" id="category" className="p-2" onChange={(e) => {
              const newCategory = e.target.value;
              setCategory(newCategory);
              fetchProducts(1, keyword, newCategory);
            }} >
              <option value="">Semua Kategori</option>
              <option value="CAKE">Cake</option>
              <option value="PASTRY">Pastry</option>
              <option value="PASTA">Pasta</option>
              <option value="PIE">Pie</option>
              <option value="OTHER">Lainnya</option>
            </select>
          </div>
          <input type="text" placeholder="Cari produk" className="flex-1 px-4"
            onChange={(e) => {
              const newKeyword = e.target.value;
              setKeyword(newKeyword);
              fetchProducts(1, newKeyword, category);
            }} />
          <button className="bg-secondary-100 text-white px-8" onClick={() => { fetchProducts(1, keyword, category) }}>Cari</button>
        </div>

        {/* Page Controls */}
        <div className="flex justify-between items-center my-4 gap-2">
          <p className="text-lg">Menampilkan {page} dari {totalPages} halaman</p>
          <div className="flex gap-2">
            <button className="bg-secondary-100 text-white px-4"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1)
                  fetchProducts(page - 1, keyword, category)
                }
              }}
            >Sebelumnya</button>
            <button className="bg-secondary-100 text-white px-4"
              onClick={() => {
                if (page < totalPages) {
                  setPage(page + 1)
                  fetchProducts(page + 1, keyword, category)
                }
              }}
            >Selanjutnya</button>
          </div>
        </div>

        {isLoading && <p>Memuat...</p>}
        <div className='grid grid-cols-3 lg:grid-cols-4 p-8 w-full gap-8 lg:gap-14'>
          {products.map((product) => (
            <Card key={product.productId} product={product} />
          ))}

        </div >

        {/* Page Controls */}
        <div className="flex justify-between items-center my-4 gap-2">
          <p className="text-lg">Menampilkan {page} dari {totalPages} halaman</p>
          <div className="flex gap-2">
            <button className="bg-secondary-100 text-white px-4"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1)
                  fetchProducts(page - 1, keyword, category)
                }
              }}
            >Sebelumnya</button>
            <button className="bg-secondary-100 text-white px-4"
              onClick={() => {
                if (page < totalPages) {
                  setPage(page + 1)
                  fetchProducts(page + 1, keyword, category)
                }
              }}
            >Selanjutnya</button>
          </div>
        </div>
      </Container>
    </>
  )
}

type CardProps = {
  background: 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500';
  picture?: string
  title?: string
}

function Card({ background, picture, title }: CardProps) {
  const { setTransitionColor } = useTransitionColor();
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