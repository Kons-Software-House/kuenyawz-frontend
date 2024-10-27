export default function AvailabilityTable() {
  return (
    <div className="bg-secondary-500 aspect-[1/2] py-12 px-8 flex flex-col gap-4 text-clear text-xl shadow-md rounded-xl h-full">
      <div className="text-inherit flex items-center gap-2">
        <div className="aspect-[1/1] h-8 bg-availability-200 border rounded-full"></div>
        <p>
          Dipesan
        </p>
      </div>
      <div className="text-inherit flex items-center gap-2">
        <div className="aspect-[1/1] h-8 bg-availability-300 border rounded-full"></div>
        <p>
          Libur
        </p>
      </div>
      <div className="text-inherit flex items-center gap-2">
        <div className="aspect-[1/1] h-8 bg-availability-400 border rounded-full"></div>
        <p>
          Erm
        </p>
      </div>
      <div className="text-inherit flex items-center gap-2">
        <div className="aspect-[1/1] h-8 bg-availability-500 border rounded-full"></div>
        <p>
          Erm
        </p>
      </div>
    </div>
  )
}