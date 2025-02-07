import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

import { retrieveClosedDates } from "../../../../services/CalendarApiService";
import { formatDateString } from '../../../../types/Formatter';

type CalendarProps = {
  isSmall?: boolean;
  selectedDates?: Date[];
  selectable?: boolean;
  onChange?: (dates: Date[]) => void;
  setSelectedDates?: (dates: Date[]) => void;
};

export default function Calendar({ isSmall, selectedDates, selectable = false, setSelectedDates }: CalendarProps) {
  const TODAY = new Date();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [closedDates, setClosedDates] = useState<any[]>([]);

  const retrieveDates = async () => {
    try {
      const formattedMonth = `${String(selectedMonth).padStart(2, '0')}`;
      const response = await retrieveClosedDates(
        `${selectedYear}-${formattedMonth}-01`,
        `${selectedYear}-${formattedMonth}-${String(getLastDateOfMonth(selectedYear, selectedMonth)).padStart(2, '0')}`
      );
      setClosedDates(response.content);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    retrieveDates();
  }, [selectedMonth, selectedYear]);

  const getLastDateOfMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const handleDateClick = (day: number) => {
    if (!selectable) return;

    const clickedDate = new Date(selectedYear, selectedMonth - 1, day);

    // Check if any of the three dates are closed or reserved
    const proposedDates = [
      new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate() - 2),
      new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate() - 1),
      clickedDate
    ];

    const isAnyDateUnavailable = proposedDates.some(date => {
      const dateString = formatDateString(date);
      const closedDate = closedDates.find(cd => cd.date === dateString);
      return closedDate && (closedDate.type === 'CLOSED' || closedDate.type === 'RESERVED');
    });

    if (isAnyDateUnavailable) {
      // Optional: Add a visual or toast warning
      alert('Tanggal yang dipilih tidak tersedia');
      return;
    }

    // If clicked date is already in selection, remove it
    if (!selectedDates || !setSelectedDates) return;
    if (selectedDates[2]?.toISOString() == clickedDate.toISOString()) {
      setSelectedDates([]);
      return;
    }

    setSelectedDates(proposedDates);
  };

  const getEventType = (date: Date) => {
    const dateString = formatDateString(new Date(date));
    const closedDate = closedDates.find(cd => cd.date === dateString);

    if (!closedDate) return 0;

    switch (closedDate.type) {
      case 'CLOSED': return 2;
      case 'PREP': return 1;
      case 'RESERVED': return 3;
      default: return 0;
    }
  };

  const renderDays = () => {
    const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    const lastDate = getLastDateOfMonth(selectedYear, selectedMonth);
    const prevMonthLastDate = getLastDateOfMonth(selectedYear, selectedMonth - 1);

    const days = [];

    // Previous month's days
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <DateComponent
          key={`prev-${i}`}
          date={`${prevMonthLastDate - firstDay + i + 1}`}
          thisMonth={false}
          eventType={0}
        />
      );
    }

    // Current month's days
    for (let day = 1; day <= lastDate; day++) {
      const currentDate = new Date(selectedYear, selectedMonth - 1, day);
      const isSelected = selectedDates ? selectedDates.some(date => date.toDateString() === currentDate.toDateString()) : false;

      days.push(
        <DateComponent
          key={day}
          date={`${day}`}
          thisMonth={true}
          eventType={isSelected ? 4 : getEventType(currentDate)}
          onClick={() => handleDateClick(day)}
        />
      );
    }

    // Next month's days
    const remainingCells = 42 - (firstDay + lastDate);
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <DateComponent
          key={`next-${day}`}
          date={`${day}`}
          thisMonth={false}
          eventType={0}
        />
      );
    }

    return days;
  };

  const changeMonth = (increment: number) => {
    let newMonth = selectedMonth + increment;
    let newYear = selectedYear;

    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }

    if (newMonth < TODAY.getMonth() && newYear == TODAY.getFullYear()) return;

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  return (
    <div className={`grid grid-cols-7 gap-1 lg:gap-2 bg-secondary-500 p-4 lg:p-6 shadow-xl rounded-md w-full max-w-[46rem] ${isSmall ? 'text-sm lg:text-md' : 'text-lg lg:text-xl'}`}>
      <YearMonth
        year={selectedYear}
        month={selectedMonth}
        onPrevMonth={() => changeMonth(-1)}
        onNextMonth={() => changeMonth(1)}
      />
      <div className="grid grid-cols-7 col-span-7 gap-x-2 mb-1">
        <WeekDay day="Sun" />
        <WeekDay day="Mon" />
        <WeekDay day="Tue" />
        <WeekDay day="Wed" />
        <WeekDay day="Thu" />
        <WeekDay day="Fri" />
        <WeekDay day="Sat" />
      </div>
      {renderDays()}
    </div>
  );
}

type YearMonthProps = {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function YearMonth({ year, month, onPrevMonth, onNextMonth }: YearMonthProps) {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return (
    <div className="col-span-7 bg-secondary-100 flex justify-between px-4 py-2 rounded shadow-md mb-1">
      <div className="flex justify-between items-center gap-4">
        <div className="text-2xl font-clear font-bold rounded">
          {months[month - 1]}
        </div>
        <div className="text-2xl font-clear font-bold">
          {year}
        </div>
      </div>
      <div className="flex items-center gap-6 select-none">
        <div onClick={onPrevMonth}>
          <ChevronLeft />
        </div>
        <div onClick={onNextMonth}>
          <ChevronRight />
        </div>
      </div>
    </div>
  )
}

type WeekDayProps = {
  day: string;
}

function WeekDay({ day }: WeekDayProps) {
  return (
    <div className="bg-secondary-100 flex flex-col items-center justify-center font-clear rounded shadow-md lg:font-semibold py-1 text-sm lg:text-lg">
      {day}
    </div>
  )
}

type DateProps = {
  date: string;
  thisMonth: boolean;
  eventType?: 0 | 1 | 2 | 3 | 4;
  onClick?: () => void;
}

function DateComponent({ date, thisMonth, eventType = 0, onClick }: DateProps) {
  const availability = {
    0: '',
    1: 'bg-availability-200 ',
    2: 'bg-availability-300 ',
    3: 'bg-availability-400',
    4: 'bg-availability-500',
  }

  return (
    <div
      onClick={onClick}
      className={(thisMonth ? '' : 'text-gray-400') + " bg-gray-50 hover:brightness-[102%] flex flex-col items-center justify-center text-sm lg:text-xl aspect-[1/1] rounded shadow-md transition ease-in-out duration-150"}>
      <p className={(eventType ? availability[eventType] : '') + " " + (eventType ? 'text-white text-shadow' : '') + ' h-2/3 aspect-[1/1] rounded-full flex justify-center items-center font-semibold'} >
        {date}
      </p>
    </div>
  )
}