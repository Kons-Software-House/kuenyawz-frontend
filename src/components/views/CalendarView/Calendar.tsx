type CalendarProps = {
  isSmall?: boolean;
}

export default function Calendar({ isSmall }: CalendarProps) {
  return (
    <>
      <div className={`aspect-[18/17] grid grid-cols-7 gap-x-2 bg-secondary-500 p-4 lg:p-6 shadow-xl rounded-md w-full max-w-[46rem] ${isSmall ? 'text-sm lg:text-md' : 'text-lg lg:text-xl'}`} >
        <YearMonth year={2021} month={8} />
        <div className="grid grid-cols-7 col-span-7 gap-x-2 mb-2 lg:mb-3">
          <WeekDay day="Sun" />
          <WeekDay day="Mon" />
          <WeekDay day="Tue" />
          <WeekDay day="Wed" />
          <WeekDay day="Thu" />
          <WeekDay day="Fri" />
          <WeekDay day="Sat" />
        </div>
        <Date date="30" thisMonth={false} eventType={0} />
        <Date date="31" thisMonth={false} eventType={1} />
        <Date date="1" thisMonth={true} eventType={1} />
        <Date date="2" thisMonth={true} eventType={1} />
        <Date date="3" thisMonth={true} eventType={0} />
        <Date date="4" thisMonth={true} eventType={0} />
        <Date date="5" thisMonth={true} eventType={0} />
        <Date date="6" thisMonth={true} eventType={0} />
        <Date date="7" thisMonth={true} eventType={0} />
        <Date date="8" thisMonth={true} eventType={0} />
        <Date date="9" thisMonth={true} eventType={2} />
        <Date date="10" thisMonth={true} eventType={0} />
        <Date date="11" thisMonth={true} eventType={0} />
        <Date date="12" thisMonth={true} eventType={3} />
        <Date date="13" thisMonth={true} eventType={0} />
        <Date date="14" thisMonth={true} eventType={0} />
        <Date date="15" thisMonth={true} eventType={0} />
        <Date date="16" thisMonth={true} eventType={0} />
        <Date date="17" thisMonth={true} eventType={0} />
        <Date date="18" thisMonth={true} eventType={1} />
        <Date date="19" thisMonth={true} eventType={1} />
        <Date date="20" thisMonth={true} eventType={1} />
        <Date date="21" thisMonth={true} eventType={1} />
        <Date date="22" thisMonth={true} eventType={0} />
        <Date date="23" thisMonth={true} eventType={0} />
        <Date date="24" thisMonth={true} eventType={0} />
        <Date date="25" thisMonth={true} eventType={4} />
        <Date date="26" thisMonth={true} eventType={0} />
        <Date date="27" thisMonth={true} eventType={0} />
        <Date date="28" thisMonth={true} eventType={0} />
        <Date date="29" thisMonth={true} eventType={0} />
        <Date date="30" thisMonth={true} eventType={0} />
        <Date date="1" thisMonth={false} eventType={0} />
        <Date date="2" thisMonth={false} eventType={0} />
        <Date date="3" thisMonth={false} eventType={2} />
      </div >
    </>
  )
}

type YearMonthProps = {
  year: number;
  month: number;
}

function YearMonth(
  { year, month }: YearMonthProps
) {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  return (
    <div className="col-span-7 bg-secondary-100 flex justify-between px-4 py-1 rounded shadow-md mb-3">
      <div className="flex justify-between items-center gap-4">
        <div className="text-4xl font-clear font-bold rounded">
          {months[month - 1]}
        </div>
        <div className="text-4xl font-clear font-bold">
          {year}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          Left
        </div>
        <div>
          right
        </div>
      </div>
    </div>
  )
}

type WeekDayProps = {
  day: string;
}

function WeekDay(
  { day }: WeekDayProps
) {
  return (
    <div className="bg-secondary-100 flex flex-col items-center justify-center font-clear rounded shadow-md font-semibold">
      {day}
    </div>
  )
}

type DateProps = {
  date: string;
  thisMonth: boolean;
  eventType?: 0 | 1 | 2 | 3 | 4
}

function Date(
  { date, thisMonth, eventType }: DateProps
) {

  const availability = {
    0: '',
    1: 'bg-availability-200 ',
    2: 'bg-availability-300 ',
    3: 'bg-availability-400',
    4: 'bg-availability-500',
  }

  return (
    <div className={(thisMonth ? '' : 'text-gray-400') + " bg-gray-50 hover:brightness-[102%] flex flex-col items-center justify-center aspect-[1/1] rounded shadow-md transition ease-in-out duration-150"}>
      <p className={(eventType ? availability[eventType] : '') + " " + (eventType ? 'text-white' : '') + ' h-2/3 w-2/3 aspect-[1/1] rounded-full flex justify-center items-center font-semibold'} >
        {date}
      </p>
    </div >
  )
}
