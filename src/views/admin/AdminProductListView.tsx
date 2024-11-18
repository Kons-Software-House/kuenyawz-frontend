import { Link } from "react-router-dom";
import { retrieveProducts, deleteVariant, deleteProduct } from "../../services/ProducApiService";
import { useEffect, useState } from "react";
import { Product, Variant } from "../../types/Product";

import Sidebar from "../../components/admin/views/AdminDashboardView/Sidebar"

export default function AdminProductListView() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  async function fetchProducts(newPage?: number, newKeyword?: string, newCategory?: string) {
    setLoading(true);

    const currentKeyword = newKeyword !== undefined ? newKeyword : keyword;
    const currentCategory = newCategory !== undefined ? newCategory : category;
    const currentPage = newPage !== undefined ? newPage : page;

    try {
      const params = {
        keyword: currentKeyword,
        page: currentPage,
        category: currentCategory,
        available: false,
      };

      const response = await retrieveProducts(params);
      const { content, totalPages } = response;

      const updatedContent = content.map((product: Product) => ({
        ...product,
        productId: BigInt(product.productId),
        variants: product.variants.map((variant: Variant) => ({
          ...variant,
          variantId: BigInt(variant.variantId),
        })),
      }));

      setProducts(updatedContent);
      setTotalPage(totalPages);
      setPage(currentPage);
      setKeyword(currentKeyword);
      setCategory(currentCategory);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <h1 className="font-semi text-2xl text-center p-4">Admin Product List</h1>
          <div className="m-4 text-sm">
            <div className="flex justify-between m-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Cari produk"
                  className="p-2 w-56 border border-secondary-100 rounded-lg"
                  onChange={(e) => {
                    const newKeyword = e.target.value;
                    setKeyword(newKeyword);
                    fetchProducts(1, newKeyword, category);
                  }}
                />
                <select className="p-2 border border-secondary-100 rounded-lg" onChange={(e) => fetchProducts(1, keyword, e.target.value)}>
                  <option value="">Semua Kategori</option>
                  <option value="cake">Cake</option>
                  <option value="pastry">Pastry</option>
                  <option value="pasta">Pasta</option>
                  <option value="pie">Pie</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <Link className="p-2 px-4 bg-secondary-300 border-2 border-secondary-100 rounded-lg" to={"/admin/produk/tambah"}>Buat Produk Baru</Link>
            </div>
            {/* table */}
            <table className="w-full bg-secondary-250">
              <thead>
                <tr className="border-b bg-secondary-100 ">
                  <th className="p-2 text-center">Nama Produk & Varian</th>
                  <th className="p-2 text-center">Kategori</th>
                  <th className="p-2 text-center">Harga</th>
                  <th className="p-2 text-center">Ketersediaan</th>
                  <th className="p-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center">Loading...</td>
                  </tr>
                ) : (
                  products.map((product) => {
                    const sortedVariants = product.variants.sort((a, b) => a.type.localeCompare(b.type));
                    return sortedVariants.map((variant) => (
                      <VariantItem
                        key={variant.variantId}
                        product={product}
                        variant={variant}
                        fetchProducts={fetchProducts}
                      />
                    ));
                  })
                )}
              </tbody>
            </table>
            {/* navigate page */}
            <div className="flex justify-center gap-4 mt-4">
              {page > 1 && (<button className="p-2 px-4 bg-secondary-300 border-2 border-secondary-100 rounded-lg" onClick={() => fetchProducts(page - 1, keyword, category)}>Sebelumnya</button>)}
              {totalPage > 1 && <p className="p-2 px-4 bg-secondary-300 border-2 border-secondary-100 rounded-lg">{page} / {totalPage}</p>}
              {page < totalPage && (<button className="p-2 px-4 bg-secondary-300 border-2 border-secondary-100 rounded-lg" onClick={() => fetchProducts(page + 1, keyword, category)}>Selanjutnya</button>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

type VariantItemProps = {
  product: Product;
  variant: Variant;
  fetchProducts: () => void;
}

function VariantItem({ product, variant, fetchProducts }: VariantItemProps) {

  function alertDelete() {
    if (window.confirm("Apakah Anda yakin ingin menghapus varian ini?")) {
      handleDelete(product.productId, variant.variantId);
    }
  }

  async function handleDelete(productId: bigint, variantId: bigint) {
    try {
      if (product.variants.length === 1) await deleteProduct(productId.toString());
      else await deleteVariant(productId.toString(), variantId.toString());
    } catch (error: any) {
      console.log(error)
    } finally {
      fetchProducts();
    }
  }

  return (
    <tr className="odd:bg-[#ffffe8] even:bg-[#fefed0]">
      <td className="p-2 text-center">{product.name} ({variant.type}) [{variant.variantId.toString()}]</td>
      <td className="p-2 text-center">{product.category}</td>
      <td className="p-2 text-center flex justify-between">
        <p>Rp</p>
        <p>
          {variant.price.toLocaleString("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </td>
      <td className="p-2 text-center">{product.available ? "Tersedia" : "Tidak Tersedia"}</td>
      <td className="p-2 text-center">
        <div className="flex justify-center gap-4">
          <button className="rounded-lg border-secondary-100 border-2 w-20">Ubah</button>
          <button className="rounded-lg border-secondary-100 border-2 w-20" onClick={() => {
            alertDelete();
          }}>Hapus</button>
        </div>
      </td>
    </tr>
  )
}
