import Container from "../components/core/Container"
import UpperSection from "../components/core/UpperSection"
import Calendar from "../components/views/CalendarView/Calendar";

export default function CartView() {
  return (
    <>
      <UpperSection title="Keranjang" subtitle="Daftar Kreasi Pilihan Anda" />
      <Container>
        <div className="grid grid-cols-3 lg:grid-cols-5 w-full gap-4">
          <div className="col-span-3">
            <div className="grid grid-cols-1 bg-secondary-500 w-full p-8 rounded-md shadow-xl gap-3">
              <div className="flex px-10 p-2 font-bold bg-secondary-100 rounded-md shadow-md gap-4">
                <span className="grow">Produk</span>
                <span className="w-20 text-center">Harga</span>
                <span className="w-20 text-center">Jumlah</span>
                <span className="w-20 text-center">Total</span>
              </div>
              <CartProduct />
              <CartProduct />
              <CartProduct />
              <CartProduct />
            </div>
          </div>
          <div className="grid grid-cols-3 col-span-3 lg:col-span-2 lg:flex lg:flex-col gap-4 w-full ">
            <div className="col-span-2">
              <Calendar isSmall={true} />
            </div>
            <div>
              <CartSummary />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

function CartProduct() {
  return (
    <div className="h-20">

    </div>
  )
}

function CartSummary() {
  return (
    <div className="bg-secondary-500 w-full p-8 rounded-md shadow-xl">
      <span className="text-xl font-semibold">Rincian Belanja</span>
      <hr className="bg-black my-2" />
      <span className="text-lg font-semibold">Total Belanja</span>
      <div className="grid grid-cols-2">
        <span>Subtotal</span>
        <span className="text-end">Rp 100.000</span>
      </div>
      <hr className="bg-black my-2" />
      <span className="text-lg font-semibold">Biaya Transaksi</span>
      <div className="grid grid-cols-2">
        <span>Biaya Layanan</span>
        <span className="text-end">Rp 3.000</span>
        <span>Biaya Layanan</span>
        <span className="text-end">Rp 3.000</span>
      </div>
    </div>
  )
}