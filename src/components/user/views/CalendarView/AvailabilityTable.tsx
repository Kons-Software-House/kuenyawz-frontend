export default function AvailabilityTable() {
  return (
    <div className="bg-secondary-500 py-8 lg:py-12 px-8 flex flex-col gap-4 text-clear text-sm lg:text-xl shadow-md rounded-xl">
      <div className="text-inherit flex items-center gap-2">
        <div className="aspect-[1/1] h-6 xl:h-8 bg-availability-400 border rounded-full"></div>
        <p>
          Dipesan
        </p>
      </div>
      <div className="text-inherit flex items-center gap-2">
        <div className="aspect-[1/1] h-6 xl:h-8 bg-availability-300 border rounded-full"></div>
        <p>
          Libur
        </p>
      </div>
      <div className="text-inherit flex items-center gap-2">
        <div className="aspect-[1/1] h-6 xl:h-8 bg-availability-200 border rounded-full"></div>
        <p>
          Persiapan
        </p>
      </div>
      <div className="h-full flex items-end text-sm underline underline-offset-2 font-clear">
        <p>
          Tiap Pesanan memerlukan waktu minimal 2 hari sebelum hari-H
        </p>
      </div>
    </div>
  )
}