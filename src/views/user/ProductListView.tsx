import { useEffect, useRef, useState } from "react";

import { Product } from "../../types/Product";
import { retrieveProducts } from "../../services/ProducApiService";
import Container from "../../components/user/core/Container"
import ProductCard from "../../components/user/core/ProductCard";
import UpperSection from "../../components/user/core/UpperSection"

export default function ProductListView() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = () => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => fetchProducts(1), 500);
  };

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
      const { content, page } = response;

      setProducts(content);
      setTotalPages(Math.ceil(page.totalElements / 12));
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
  }, [page])

  return (
    <>
      <UpperSection title="Produk Kami" subtitle="Kelezatan Dalam Setiap Kreasi" />
      <div className="w-full flex justify-center p-2 -mb-2 lg:mb-0">
        <div className="border-2 border-secondary-100 w-full flex lg:w-3/4">
          {/* Filters */}
          <div className="border-r-2 border-secondary-100 px-1">
            <select name="category" id="category" className="p-1 lg:p-2 text-sm lg:text-md" onChange={(e) => {
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
              if (e.target.value === "") {
                fetchProducts(1, "", category);
                return;
              }
              const newKeyword = e.target.value;
              setKeyword(newKeyword);
              handleSearchChange();
            }}
          />
        </div>
      </div>
      {isLoading ?
        <div className="flex justify-center items-center h-96 min-h-screen">
          <p className="text-2xl">Memuat produk...</p>
        </div>
        :
        <Container>

          {/* Page Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center my-2 lg:my-4 gap-2">
            <p className="text-sm lg:text-lg">Menampilkan {page} dari {totalPages} halaman</p>
            <div className="flex gap-2">
              <button className="bg-secondary-100 text-white text-sm md:text-md px-2 lg:px-4 rounded"
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1)
                    fetchProducts(page - 1, keyword, category)
                  }
                }}
              >Sebelumnya</button>
              <button className="bg-secondary-100 text-white text-sm md:text-md px-2 lg:px-4 rounded"
                onClick={() => {
                  if (page < totalPages) {
                    setPage(page + 1)
                    fetchProducts(page + 1, keyword, category)
                  }
                }}
              >Selanjutnya</button>
            </div>
          </div>

          <div className='grid grid-cols-3 lg:grid-cols-4 p-4 w-full gap-4 lg:gap-8'>
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div >

          {/* Page Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center my-2 lg:my-4 gap-2">
            <p className="text-sm lg:text-lg">Menampilkan {page} dari {totalPages} halaman</p>
            <div className="flex gap-2">
              <button className="bg-secondary-100 text-white text-sm md:text-md px-2 lg:px-4 rounded"
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1)
                  }
                }}
              >Sebelumnya</button>
              <button className="bg-secondary-100 text-white text-sm md:text-md px-2 lg:px-4 rounded"
                onClick={() => {
                  if (page < totalPages) {
                    setPage(page + 1)
                  }
                }}
              >Selanjutnya</button>
            </div>
          </div>
        </Container>
      }
    </>
  )
}