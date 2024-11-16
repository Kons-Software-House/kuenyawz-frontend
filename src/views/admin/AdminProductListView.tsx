import { Link } from "react-router-dom";
import Sidebar from "../../components/admin/views/AdminDashboardView/Sidebar"

export default function AdminProductListView() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <h1 className="font-semi text-2xl text-center p-4">Admin Product List</h1>
          <div className="m-4 text-sm">
            <div className="flex justify-between m-4">
              <div className="flex gap-4">
                <input type="text" placeholder="Cari produk" className="p-2 w-56 border border-secondary-100 rounded-lg" />
                <select className="p-2 border border-secondary-100 rounded-lg">
                  <option value="all">Semua Kategori</option>
                  <option value="cake">Cake</option>
                  <option value="pastry">Pastry</option>
                  <option value="pasta">Pasta</option>
                  <option value="pie & pudding">Pie & Pudding</option>
                  <option value="lainnya">Lainnya</option>
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
                <VariantItem name="Cake" variant={"Slice"} category="Pastry" price={10000} available={true} />
                <VariantItem name="Cake" variant={"Whole"} category="Pastry" price={100000} available={true} />
                <VariantItem name="Bread" variant={"Small"} category="Pastry" price={5000} available={true} />
                <VariantItem name="Bread" variant={"Medium"} category="Pastry" price={10000} available={true} />
                <VariantItem name="Bread" variant={"Large"} category="Pastry" price={15000} available={true} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

type VariantItemProps = {
  name: string;
  variant: string;
  category: string;
  price: number;
  available: boolean;
}

function VariantItem({ name, variant, category, price, available }: VariantItemProps) {
  return (
    <tr className="odd:bg-[#ffffe8] even:bg-[#fefed0]">
      <td className="p-2 text-center">{name} ({variant})</td>
      <td className="p-2 text-center">{category}</td>
      <td className="p-2 text-center flex justify-between">
        <p>Rp</p>
        <p>
          {price.toLocaleString("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </td>
      <td className="p-2 text-center">{available ? "Tersedia" : "Tidak Tersedia"}</td>
      <td className="p-2 text-center">
        <div className="flex justify-center gap-4">
          <button className="rounded-lg border-secondary-100 border-2 w-20">Ubah</button>
          <button className="rounded-lg border-secondary-100 border-2 w-20">Hapus</button>
        </div>
      </td>
    </tr>
  )
}
