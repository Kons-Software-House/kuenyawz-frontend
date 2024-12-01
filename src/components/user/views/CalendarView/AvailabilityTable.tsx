export default function AvailabilityTable() {
  return (
    <div className="bg-secondary-500 py-8 lg:py-12 px-8 lg:pl-8 lg:pr-16 flex flex-col gap-4 text-clear text-sm lg:text-xl shadow-md rounded-xl">
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
    </div>
  )
}